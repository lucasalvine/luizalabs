import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateClientEmailIndex1626251069462 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      db.clients.createIndex({ "email": 1 }, { unique: true })
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      db.clients.dropIndex({ "email": 1 })
    `);
  }
}