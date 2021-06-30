<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\RiderCheckinRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *     itemOperations={"get"},
 *     collectionOperations={},
 *     normalizationContext={
 *          "groups"={"read"}
 *     }
 * )
 * @ORM\Entity(repositoryClass=RiderCheckinRepository::class)
 * @UniqueEntity("userUUID")
 */
class RiderCheckin
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read"})
     * @Assert\NotBlank()
     * @Assert\Uuid()
     */
    private $userUUID;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createDate;

    /**
     * @ORM\Column(type="datetime")
     */
    private $expireDate;

    /**
     * @ORM\Column(type="float")
     * @Groups({"read"})
     * @Assert\NotBlank()
     */
    private $lng;

    /**
     * @ORM\Column(type="float")
     * @Groups({"read"})
     * @Assert\NotBlank()
     */
    private $lat;

    public function __construct()
    {
        $this->createDate = new \DateTime('now', new \DateTimeZone('UTC'));
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUserUUID(): ?string
    {
        return $this->userUUID;
    }

    public function setUserUUID(string $userUUID): self
    {
        $this->userUUID = $userUUID;

        return $this;
    }

    public function getCreateDate(): ?\DateTimeInterface
    {
        return $this->createDate;
    }

    public function getExpireDate(): ?\DateTimeInterface
    {
        return $this->expireDate;
    }

    public function setExpireDate(\DateTimeInterface $expireDate): self
    {
        $this->expireDate = $expireDate;

        return $this;
    }

    public function getLng(): ?float
    {
        return $this->lng;
    }

    public function setLng(float $lng): self
    {
        $this->lng = $lng;

        return $this;
    }

    public function getLat(): ?float
    {
        return $this->lat;
    }

    public function setLat(float $lat): self
    {
        $this->lat = $lat;

        return $this;
    }
}
