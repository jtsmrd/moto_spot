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
        $this->loadRiderCheckins($manager, 100);
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
            $createDate = (new \DateTime('now', new \DateTimeZone('UTC')))->getTimestamp();
            $riderCheckin->setCreateDate($createDate);

            $expireDate = new \DateTime('now', new \DateTimeZone('UTC'));
            $expireDate = $expireDate->add(new \DateInterval('PT5H'))->getTimestamp();
            $riderCheckin->setExpireDate($expireDate);

            $manager->persist($riderCheckin);
        }

        $manager->flush();
    }
}
