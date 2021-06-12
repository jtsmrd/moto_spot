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
     * @ORM\Column(type="integer")
     */
    private $createDate;

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

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $expireDate;

    /**
     * @ORM\Column(type="datetimetz")
     */
    private $createDateDisplay;

    /**
     * @ORM\Column(type="datetimetz", nullable=true)
     */
    private $expireDateDisplay;

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

    public function getCreateDate(): ?int
    {
        return $this->createDate;
    }

    public function setCreateDate(int $createDate): self
    {
        $this->createDate = $createDate;

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

    public function getExpireDate(): ?int
    {
        return $this->expireDate;
    }

    public function setExpireDate(?int $expireDate): self
    {
        $this->expireDate = $expireDate;

        return $this;
    }

    public function getCreateDateDisplay(): ?\DateTimeInterface
    {
        return $this->createDateDisplay;
    }

    public function setCreateDateDisplay(\DateTimeInterface $createDateDisplay): self
    {
        $this->createDateDisplay = $createDateDisplay;

        return $this;
    }

    public function getExpireDateDisplay(): ?\DateTimeInterface
    {
        return $this->expireDateDisplay;
    }

    public function setExpireDateDisplay(?\DateTimeInterface $expireDateDisplay): self
    {
        $this->expireDateDisplay = $expireDateDisplay;

        return $this;
    }
}
