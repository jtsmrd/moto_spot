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
