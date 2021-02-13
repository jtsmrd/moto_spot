<?php

namespace App\DataFixtures;

use App\Entity\RiderCheckin;
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
        $this->loadRiderCheckins($manager, 5000);
    }

    public function loadRiderCheckins(ObjectManager $manager, int $numRiderCheckins)
    {
        for ($i = 0; $i < $numRiderCheckins; $i++) {
            $riderCheckin = new RiderCheckin();
            $riderCheckin->setUserUUID($this->faker->uuid);
            $riderCheckin->setLat($this->faker->latitude);
            $riderCheckin->setLon($this->faker->longitude);
            $riderCheckin->setCreateDate(new \DateTime());

            $manager->persist($riderCheckin);
        }

        $manager->flush();
    }
}
