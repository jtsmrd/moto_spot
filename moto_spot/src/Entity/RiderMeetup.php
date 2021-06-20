<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\RiderMeetupRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=RiderMeetupRepository::class)
 */
class RiderMeetup
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $userUUID;

    /**
     * @ORM\Column(type="datetimetz")
     */
    private $createDate;

    /**
     * @ORM\Column(type="datetimetz")
     */
    private $meetupDate;

    /**
     * @ORM\Column(type="datetimetz", nullable=true)
     */
    private $expireDate;

    /**
     * @ORM\Column(type="float")
     */
    private $lat;

    /**
     * @ORM\Column(type="float")
     */
    private $lng;

    /**
     * @ORM\Column(type="integer")
     */
    private $meetupTimestamp;

    /**
     * @ORM\Column(type="integer")
     */
    private $expireTimestamp;

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

    public function setCreateDate(\DateTimeInterface $createDate): self
    {
        $this->createDate = $createDate;

        return $this;
    }

    public function getMeetupDate(): ?\DateTimeInterface
    {
        return $this->meetupDate;
    }

    public function setMeetupDate(\DateTimeInterface $meetupDate): self
    {
        $this->meetupDate = $meetupDate;

        return $this;
    }

    public function getExpireDate(): ?\DateTimeInterface
    {
        return $this->expireDate;
    }

    public function setExpireDate(?\DateTimeInterface $expireDate): self
    {
        $this->expireDate = $expireDate;

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

    public function getLng(): ?float
    {
        return $this->lng;
    }

    public function setLng(float $lng): self
    {
        $this->lng = $lng;

        return $this;
    }

    public function getMeetupTimestamp(): ?int
    {
        return $this->meetupTimestamp;
    }

    public function setMeetupTimestamp(int $meetupTimestamp): self
    {
        $this->meetupTimestamp = $meetupTimestamp;

        return $this;
    }

    public function getExpireTimestamp(): ?int
    {
        return $this->expireTimestamp;
    }

    public function setExpireTimestamp(int $expireTimestamp): self
    {
        $this->expireTimestamp = $expireTimestamp;

        return $this;
    }
}
