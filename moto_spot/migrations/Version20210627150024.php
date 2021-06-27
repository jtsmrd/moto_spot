<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210627150024 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE rider_checkin CHANGE create_date_display create_date_display DATETIME NOT NULL, CHANGE expire_date_display expire_date_display DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE rider_meetup ADD title VARCHAR(255) DEFAULT NULL, ADD description VARCHAR(1000) DEFAULT NULL, CHANGE create_date create_date DATETIME NOT NULL, CHANGE meetup_date meetup_date DATETIME NOT NULL, CHANGE expire_date expire_date DATETIME DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE rider_checkin CHANGE create_date_display create_date_display DATETIME NOT NULL, CHANGE expire_date_display expire_date_display DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE rider_meetup DROP title, DROP description, CHANGE create_date create_date DATETIME NOT NULL, CHANGE meetup_date meetup_date DATETIME NOT NULL, CHANGE expire_date expire_date DATETIME DEFAULT NULL');
    }
}
