<?php

namespace App\Repository;

use App\Entity\RiderCheckin;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query\ResultSetMappingBuilder;
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
        $rsm = new ResultSetMappingBuilder($this->getEntityManager());
        $rsm->addRootEntityFromClassMetadata('App\Entity\RiderCheckin', 'rc');

        $sql = '
            SELECT id, lon, lat 
            FROM rider_checkin rc
            WHERE (
            3959 * acos(
                cos(radians(?))
                * cos(radians(lat))
                * cos(radians(lon) - radians(?))
                + sin(radians(?))
                * sin(radians(lat))
            )
            ) < ?
            ';

        $query = $this->getEntityManager()->createNativeQuery($sql, $rsm);
        $query->setParameter(1, $lon);
        $query->setParameter(2, $lat);
        $query->setParameter(3, $lon);
        $query->setParameter(4, $distance);

        return $query->getArrayResult();

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
