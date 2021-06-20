<?php

namespace App\Controller;

use App\Entity\RiderCheckin;
use App\Exception\InvalidDataException;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\ConstraintViolation;
use Symfony\Component\Validator\Validation;
use Symfony\Component\PropertyAccess\PropertyAccess;

class DefaultController extends AbstractController
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @Route("/{reactRouting}", name="index", defaults={"reactRouting": null})
     */
    public function index()
    {
        return $this->render('default/index.html.twig');
    }

    /**
     * @Route("/api/get_rider_checkins", name="get_rider_checkins", methods={"get"})
     * @param Request $request
     * @return Response
     */
    public function getRiderCheckins(Request $request): Response
    {
        $lat = floatval($request->query->get('lat'));
        $lng = floatval($request->query->get('lng'));
        $distance = floatval($request->query->get('distance'));

        $repository = $this->getDoctrine()->getRepository(RiderCheckin::class);
        $checkins = $repository->getRiderCheckinsAroundLocation($lat, $lng, $distance);

        return new JsonResponse($checkins, Response::HTTP_OK);
    }

    /**
     * @Route("/api/expire_rider_checkin", name="expire_rider_checkin", methods={"put"})
     * @param Request $request
     * @return Response
     */
    public function expireRiderCheckin(Request $request): Response
    {
        $userUUID = $request->cookies->get('user_uuid');
        if (!$userUUID) {
            return new JsonResponse(null, Response::HTTP_FORBIDDEN);
        }

        $riderCheckinId = intval($request->query->get('id'));
        $repository = $this->getDoctrine()->getRepository(RiderCheckin::class);

        $checkinToExpire = $repository->findOneBy([
            'userUUID' => $userUUID,
            'id' => $riderCheckinId
        ]);
        if (!$checkinToExpire) {
            return new JsonResponse(null, Response::HTTP_NOT_FOUND);
        }

        $expireDate = (new \DateTime('now', new \DateTimeZone('UTC')));
        $checkinToExpire->setExpireDate($expireDate->getTimestamp());
        $checkinToExpire->setExpireDateDisplay($expireDate);

        $this->entityManager->persist($checkinToExpire);
        $this->entityManager->flush();

        return new JsonResponse(null, Response::HTTP_OK);
    }

    /**
     * @Route("/api/create_rider_checkin", name="create_rider_checkin", methods={"post"})
     * @param Request $request
     * @return Response
     */
    public function createRiderCheckin(Request $request): Response
    {
        $requestData = json_decode($request->getContent(), true);
        if (!is_array($requestData)) {
            return new JsonResponse([], Response::HTTP_BAD_REQUEST);
        }

        try {
            $this->riderCheckinIsValid($requestData);
        } catch (InvalidDataException $e) {
            return new JsonResponse([
                'message' => $e->getMessage(),
                'errors' => $e->getErrors()
            ], Response::HTTP_BAD_REQUEST);
        }

        $userUUID = $request->cookies->get('user_uuid');
        $newUserUUID = null;
        if (!$userUUID) {
            $newUserUUID = Uuid::v4();
        } else {
            // If existing rider checkin exists, mark as expired
            $repository = $this->getDoctrine()->getRepository(RiderCheckin::class);
            $existingCheckin = $repository->findOneBy([
                'userUUID' => $userUUID
            ], ['id' => 'DESC']);
            if ($existingCheckin) {
                $expireDate = (new \DateTime('now', new \DateTimeZone('UTC')));
                $existingCheckin->setExpireDate($expireDate->getTimestamp());
                $existingCheckin->setExpireDateDisplay($expireDate);
                $this->entityManager->persist($existingCheckin);
            }
        }

        $accessor = PropertyAccess::createPropertyAccessor();

        $riderCheckin = new RiderCheckin();
        $riderCheckin->setLat($accessor->getValue($requestData, '[lat]'));
        $riderCheckin->setLng($accessor->getValue($requestData, '[lng]'));
        $riderCheckin->setUserUUID($userUUID ?? $newUserUUID);
        $createDate = new \DateTime('now', new \DateTimeZone('UTC'));
        $riderCheckin->setCreateDate($createDate->getTimestamp());
        $riderCheckin->setCreateDateDisplay($createDate);

        $expireDate = $accessor->getValue($requestData, '[expire_date]');
        if (!$expireDate) {
            // Default expire date to + 1 hour if one isn't provided
            $expireDate = new \DateTime('now', new \DateTimeZone('UTC'));
            $expireDate = $expireDate->add(new \DateInterval('PT1H'))->getTimestamp();
        }
        $riderCheckin->setExpireDate($expireDate);

        $expireDateDisplay = new \DateTime();
        $expireDateDisplay->setTimestamp($expireDate);
        $riderCheckin->setExpireDateDisplay($expireDateDisplay);

        $this->entityManager->persist($riderCheckin);
        $this->entityManager->flush();

        $response = new JsonResponse([
            'id' => $riderCheckin->getId(),
            'userUUID' => $riderCheckin->getUserUUID(),
            'lat' => $riderCheckin->getLat(),
            'lng' => $riderCheckin->getLng(),
            'expireDate' => $riderCheckin->getExpireDate()
        ], Response::HTTP_CREATED);
        if (!$userUUID) {
            $response->headers->setCookie(new Cookie(
                'user_uuid',
                $newUserUUID,
                0,
                '/',
                null,
                null,
                false
            ));
        }

        return $response;
    }

    /**
     * @Route("/api/extend_rider_checkin", name="extend_rider_checkin", methods={"put"})
     * @param Request $request
     * @return Response
     */
    public function extendRiderCheckin(Request $request): Response
    {
        $requestData = json_decode($request->getContent(), true);
        if (!is_array($requestData)) {
            return new JsonResponse([], Response::HTTP_BAD_REQUEST);
        }

        try {
            $this->extendRiderCheckinIsValid($requestData);
        } catch (InvalidDataException $e) {
            return new JsonResponse([
                'message' => $e->getMessage(),
                'errors' => $e->getErrors()
            ], Response::HTTP_BAD_REQUEST);
        }

        // Make sure we can identify the user updating the rider checkin
        $userUUID = $request->cookies->get('user_uuid');
        if (!$userUUID) {
            return new JsonResponse(null, Response::HTTP_FORBIDDEN);
        }

        $accessor = PropertyAccess::createPropertyAccessor();

        $riderCheckinId = intval($accessor->getValue($requestData, '[id]'));
        $extendInterval = intval($accessor->getValue($requestData, '[extend_interval]'));

        $repository = $this->getDoctrine()->getRepository(RiderCheckin::class);

        $checkinToExtend = $repository->findOneBy([
            'userUUID' => $userUUID,
            'id' => $riderCheckinId
        ]);
        if (!$checkinToExtend) {
            return new JsonResponse(null, Response::HTTP_NOT_FOUND);
        }

        /** @var string|null $expireDuration */
        $expireDuration = null;

        switch($extendInterval) {
            case 15:
                $expireDuration = 'PT15M';
                break;
            case 30:
                $expireDuration = 'PT30M';
                break;
            case 60:
                $expireDuration = 'PT1H';
                break;
            default:
                break;
        }

        if (!$expireDuration) {
            return new JsonResponse([], Response::HTTP_BAD_REQUEST);
        }

        // Extend the existing expire date with the given extend interval
        $existingExpireDate = new \DateTime();
        $existingExpireDate->setTimestamp($checkinToExtend->getExpireDate());
        $newExpireDate = $existingExpireDate->add(new \DateInterval($expireDuration));

        $checkinToExtend->setExpireDate($newExpireDate->getTimestamp());
        $checkinToExtend->setExpireDateDisplay($newExpireDate);

        $this->entityManager->persist($checkinToExtend);
        $this->entityManager->flush();

        return new JsonResponse([
            'id' => $checkinToExtend->getId(),
            'userUUID' => $checkinToExtend->getUserUUID(),
            'lat' => $checkinToExtend->getLat(),
            'lng' => $checkinToExtend->getLng(),
            'expireDate' => $checkinToExtend->getExpireDate()
        ], Response::HTTP_OK);
    }

    private function riderCheckinIsValid(array $requestData): void
    {
        $constraints = new Assert\Collection([
            'lat' => new Assert\Required([
                new Assert\NotBlank()
            ]),
            'lng' => new Assert\Required([
                new Assert\NotBlank()
            ]),
            'expire_date' => new Assert\Optional()
        ]);

        $validator = Validation::createValidator();
        $errors = $validator->validate($requestData, $constraints);

        if (count($errors) > 0) {
            $messages = [];

            /** @var ConstraintViolation $violation */
            foreach ($errors as $violation) {
                $messages[$violation->getPropertyPath()][] = $violation->getMessage();
            }
            throw new InvalidDataException('Validation Errors', $messages);
        }
    }

    private function extendRiderCheckinIsValid(array $requestData): void
    {
        $constraints = new Assert\Collection([
            'id' => new Assert\Required([
                new Assert\NotBlank()
            ]),
            'extend_interval' => new Assert\Required([
                new Assert\NotBlank()
            ])
        ]);

        $validator = Validation::createValidator();
        $errors = $validator->validate($requestData, $constraints);

        if (count($errors) > 0) {
            $messages = [];

            /** @var ConstraintViolation $violation */
            foreach ($errors as $violation) {
                $messages[$violation->getPropertyPath()][] = $violation->getMessage();
            }
            throw new InvalidDataException('Validation Errors', $messages);
        }
    }

    /**
     * @Route("/api/users", name="users")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getUsers(): Response
    {
        $users = [
            [
                'id' => 1,
                'name' => 'Olususi Oluyemi',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
                'imageURL' => 'https://randomuser.me/api/portraits/women/50.jpg'
            ],
            [
                'id' => 2,
                'name' => 'Camila Terry',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
                'imageURL' => 'https://randomuser.me/api/portraits/men/42.jpg'
            ],
            [
                'id' => 3,
                'name' => 'Joel Williamson',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
                'imageURL' => 'https://randomuser.me/api/portraits/women/67.jpg'
            ],
            [
                'id' => 4,
                'name' => 'Deann Payne',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
                'imageURL' => 'https://randomuser.me/api/portraits/women/50.jpg'
            ],
            [
                'id' => 5,
                'name' => 'Donald Perkins',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
                'imageURL' => 'https://randomuser.me/api/portraits/men/89.jpg'
            ]
        ];

        $response = new Response();

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $response->setContent(json_encode($users));

        return $response;
    }
}
