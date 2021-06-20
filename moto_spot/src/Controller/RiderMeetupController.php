<?php


namespace App\Controller;

use App\Entity\RiderMeetup;
use App\Exception\InvalidDataException;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PropertyAccess\PropertyAccess;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\ConstraintViolation;
use Symfony\Component\Validator\Validation;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Uid\Uuid;


class RiderMeetupController extends AbstractController
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
     * @Route("/api/create_rider_meetup", name="create_rider_meetup", methods={"post"})
     * @param Request $request
     * @return Response
     */
    public function createRiderMeetup(Request $request): Response
    {
        $requestData = json_decode($request->getContent(), true);
        if (!is_array($requestData)) {
            return new JsonResponse([], Response::HTTP_BAD_REQUEST);
        }

        try {
            $this->riderMeetupIsValid($requestData);
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
        }

        $accessor = PropertyAccess::createPropertyAccessor();

        $riderMeetup = new RiderMeetup();
        $riderMeetup->setUserUUID($userUUID ?? $newUserUUID);
        $riderMeetup->setLat($accessor->getValue($requestData, '[lat]'));
        $riderMeetup->setLng($accessor->getValue($requestData, '[lng]'));
        $riderMeetup->setCreateDate(new \DateTime('now', new \DateTimeZone('UTC')));

        $meetupDateTimestamp = $accessor->getValue($requestData, '[meetup_date]');
        $meetupDate = new \DateTime();
        $meetupDate->setTimestamp($meetupDateTimestamp);
        $riderMeetup->setMeetupDate($meetupDate);
        $riderMeetup->setMeetupTimestamp($meetupDate->getTimestamp());

        $expireDateTimestamp = $accessor->getValue($requestData, '[expire_date]');
        $expireDate = new \DateTime();
        if (!$expireDateTimestamp) {
            // Default expire date to end of meetup day if one isn't provided
            $expireDate = clone $meetupDate;
            $expireDate->modify('tomorrow');
            $expireDate->setTimestamp($expireDate->getTimestamp() - 1);
        } else {
            $expireDate = $expireDate->setTimestamp($expireDateTimestamp);
        }
        $riderMeetup->setExpireDate($expireDate);
        $riderMeetup->setExpireTimestamp($expireDate->getTimestamp());

        $this->entityManager->persist($riderMeetup);
        $this->entityManager->flush();

        $response = new JsonResponse([
            'id' => $riderMeetup->getId(),
            'userUUID' => $riderMeetup->getUserUUID(),
            'lat' => $riderMeetup->getLat(),
            'lng' => $riderMeetup->getLng(),
            'meetupTimestamp' => $riderMeetup->getMeetupTimestamp(),
            'expireTimestamp' => $riderMeetup->getExpireTimestamp()
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
     * @Route("/api/get_rider_meetups", name="get_rider_meetups", methods={"get"})
     * @param Request $request
     * @return Response
     */
    public function getRiderMeetups(Request $request): Response
    {
        $lat = floatval($request->query->get('lat'));
        $lng = floatval($request->query->get('lng'));
        $distance = floatval($request->query->get('distance'));

        $repository = $this->getDoctrine()->getRepository(RiderMeetup::class);
        $meetups = $repository->getRiderMeetupsAroundLocation($lat, $lng, $distance);

        return new JsonResponse($meetups, Response::HTTP_OK);
    }

    /**
     * @Route("/api/expire_rider_meetup", name="expire_rider_meetup", methods={"put"})
     * @param Request $request
     * @return Response
     */
    public function expireRiderMeetup(Request $request): Response
    {
        $userUUID = $request->cookies->get('user_uuid');
        if (!$userUUID) {
            return new JsonResponse(null, Response::HTTP_FORBIDDEN);
        }

        $riderMeetupId = intval($request->query->get('id'));
        $repository = $this->getDoctrine()->getRepository(RiderMeetup::class);

        /** @var RiderMeetup $checkinToExpire */
        $checkinToExpire = $repository->findOneBy([
            'userUUID' => $userUUID,
            'id' => $riderMeetupId
        ]);
        if (!$checkinToExpire) {
            return new JsonResponse(null, Response::HTTP_NOT_FOUND);
        }

        $expireDate = (new \DateTime('now', new \DateTimeZone('UTC')));
        $checkinToExpire->setExpireDate($expireDate);
        $checkinToExpire->setExpireTimestamp($expireDate->getTimestamp());

        $this->entityManager->persist($checkinToExpire);
        $this->entityManager->flush();

        return new JsonResponse(null, Response::HTTP_OK);
    }

    private function riderMeetupIsValid(array $requestData): void
    {
        $constraints = new Assert\Collection([
            'lat' => new Assert\Required([
                new Assert\NotBlank()
            ]),
            'lng' => new Assert\Required([
                new Assert\NotBlank()
            ]),
            'meetup_date' => new Assert\Required([
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
}