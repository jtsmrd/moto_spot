<?php

namespace App\DataFixtures;

use App\Entity\RiderCheckin;
use App\Entity\RiderMeetup;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    /**
     * @var \Faker\Factory
     */
    private $faker;

    public function __construct()
    {
        $this->faker = \Faker\Factory::create();
    }

    public function load(ObjectManager $manager)
    {
        $this->loadRiderCheckins($manager, 100);
        $this->loadRiderMeetups($manager, 10);
    }

    public function loadRiderCheckins(ObjectManager $manager, int $numRiderCheckins)
    {
        for ($i = 0; $i < $numRiderCheckins; $i++) {
            $riderCheckin = new RiderCheckin();
            $riderCheckin->setUserUUID($this->faker->uuid);

            $lat = $this->faker->randomFloat(12, 40.38362639665043, 40.497339166747636);
            $lon = $this->faker->randomFloat(12, -80.20980444333259, -79.77145102402869);

            $expireDate = new \DateTime('now', new \DateTimeZone('UTC'));
            $expireDate = $expireDate->add(new \DateInterval('PT5H'));
            $riderCheckin->setExpireDate($expireDate);

            $riderCheckin->setLat($lat);
            $riderCheckin->setLng($lon);

            $manager->persist($riderCheckin);
        }

        $manager->flush();
    }

    public function loadRiderMeetups(ObjectManager  $manager, int $numRiderMeetups)
    {
        for ($i = 0; $i < $numRiderMeetups; $i++) {
            $riderMeetup = new RiderMeetup();
            $riderMeetup->setUserUUID($this->faker->uuid);

            $meetupDate = (new \DateTime('now', new \DateTimeZone('UTC')));
            $riderMeetup->setMeetupDate($meetupDate);

            $rideStartDate = (new \DateTime('now', new \DateTimeZone('UTC')));
            $rideStartDate = $rideStartDate->add(new \DateInterval('PT30M'));
            $riderMeetup->setRideStartDate($rideStartDate);

            $expireDate = clone $meetupDate;
            $expireDate->modify('tomorrow');
            $expireDate->setTimestamp($expireDate->getTimestamp() - 1);
            $riderMeetup->setExpireDate($expireDate);

            $lat = $this->faker->randomFloat(12, 40.38362639665043, 40.497339166747636);
            $lon = $this->faker->randomFloat(12, -80.20980444333259, -79.77145102402869);
            $riderMeetup->setLat($lat);
            $riderMeetup->setLng($lon);

            $riderMeetup->setTitle($this->faker->sentence);
            $riderMeetup->setDescription($this->faker->sentence);

            $manager->persist($riderMeetup);
        }

        $manager->flush();
    }
}
