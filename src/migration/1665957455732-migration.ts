import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1665957455732 implements MigrationInterface {
    name = 'migration1665957455732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`account\` (\`id\` varchar(36) NOT NULL, \`createdOn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedOn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedOn\` datetime(6) NULL, \`account_name\` varchar(255) NULL, \`account_number\` varchar(255) NULL, \`bank_name\` enum ('gtb', 'firstbank', 'providus') NOT NULL DEFAULT 'gtb', \`balance\` int NULL, \`userId\` varchar(36) NULL, UNIQUE INDEX \`REL_60328bf27019ff5498c4b97742\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`account\` ADD CONSTRAINT \`FK_60328bf27019ff5498c4b977421\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` DROP FOREIGN KEY \`FK_60328bf27019ff5498c4b977421\``);
        await queryRunner.query(`DROP INDEX \`REL_60328bf27019ff5498c4b97742\` ON \`account\``);
        await queryRunner.query(`DROP TABLE \`account\``);
    }

}
