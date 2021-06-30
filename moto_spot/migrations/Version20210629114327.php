<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210629114327 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE rider_checkin DROP create_date_display, DROP expire_date_display, CHANGE create_date create_date DATETIME NOT NULL, CHANGE expire_date expire_date DATETIME NOT NULL');
        $this->addSql('ALTER TABLE rider_meetup DROP meetup_timestamp, DROP expire_timestamp, CHANGE expire_date expire_date DATETIME NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE rider_checkin ADD create_date_display DATETIME NOT NULL, ADD expire_date_display DATETIME DEFAULT NULL, CHANGE create_date create_date INT NOT NULL, CHANGE expire_date expire_date INT DEFAULT NULL');
        $this->addSql('ALTER TABLE rider_meetup ADD meetup_timestamp INT NOT NULL, ADD expire_timestamp INT NOT NULL, CHANGE expire_date expire_date DATETIME DEFAULT NULL');
    }
}
