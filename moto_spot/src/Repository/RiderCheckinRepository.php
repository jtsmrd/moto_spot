<?php

namespace App\Repository;

use App\Entity\RiderCheckin;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method RiderCheckin|null find($id, $lockMode = null, $lockVersion = null)
 * @method RiderCheckin|null findOneBy(array $criteria, array $orderBy = null)
 * @method RiderCheckin[]    findAll()
 * @method RiderCheckin[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RiderCheckinRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, RiderCheckin::class);
    }

    public function getRiderCheckinsAroundLocation(float $lat, float $lon, float $distance)
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = '
            SELECT *, (
            3959 * acos(
                cos(radians(:lon))
                * cos(radians(lat))
                * cos(radians(lon) - radians(:lat))
                + sin(radians(:lon))
                * sin(radians(lat))
            )
        ) as distance FROM rider_checkin
            HAVING distance < :distance
            ORDER BY distance
            ';
        $stmt = $conn->prepare($sql);
        $stmt->execute([
            'lon' => $lon,
            'lat' => $lat,
            'distance' => $distance
        ]);

        // returns an array of arrays (i.e. a raw data set)
        return $stmt->fetchAllAssociative();
    }

    // /**
    //  * @return RiderCheckin[] Returns an array of RiderCheckin objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('r.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?RiderCheckin
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
