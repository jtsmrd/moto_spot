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

            $riderCheckin->setLat($lat);
            $riderCheckin->setLng($lon);
            $createDate = (new \DateTime('now', new \DateTimeZone('UTC')));
            $riderCheckin->setCreateDate($createDate->getTimestamp());
            $riderCheckin->setCreateDateDisplay($createDate);

            $expireDate = new \DateTime('now', new \DateTimeZone('UTC'));
            $expireDate = $expireDate->add(new \DateInterval('PT5H'));
            $riderCheckin->setExpireDate($expireDate->getTimestamp());
            $riderCheckin->setExpireDateDisplay($expireDate);

            $manager->persist($riderCheckin);
        }

        $manager->flush();
    }

    public function loadRiderMeetups(ObjectManager  $manager, int $numRiderMeetups)
    {
        for ($i = 0; $i < $numRiderMeetups; $i++) {
            $riderMeetup = new RiderMeetup();
            $riderMeetup->setUserUUID($this->faker->uuid);

            $lat = $this->faker->randomFloat(12, 40.38362639665043, 40.497339166747636);
            $lon = $this->faker->randomFloat(12, -80.20980444333259, -79.77145102402869);
            $riderMeetup->setLat($lat);
            $riderMeetup->setLng($lon);

            $riderMeetup->setTitle($this->faker->sentence);
            $riderMeetup->setDescription($this->faker->sentence);

            $createDate = (new \DateTime('now', new \DateTimeZone('UTC')));
            $riderMeetup->setCreateDate($createDate);

            $meetupDate = (new \DateTime('now', new \DateTimeZone('UTC')));
            $riderMeetup->setMeetupDate($meetupDate);
            $riderMeetup->setMeetupTimestamp($meetupDate->getTimestamp());

            $expireDate = new \DateTime('now', new \DateTimeZone('UTC'));
            $expireDate = $expireDate->add(new \DateInterval('PT5H'));
            $riderMeetup->setExpireDate($expireDate);
            $riderMeetup->setExpireTimestamp($expireDate->getTimestamp());

            $manager->persist($riderMeetup);
        }

        $manager->flush();
    }
}
