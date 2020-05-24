import { Logger as TypeOrmLogger, ConnectionOptions } from 'typeorm';
import Logger from './logger';
import { PowerballTicketEntity } from '../repositories/powerball-ticket';
import * as dotenv from 'dotenv';
import { PowerballDrawingEntity } from '../repositories/powerball-drawing';
import { OwnerWinningEntity } from '../repositories/owner-winning';
import { PowerballTicketDrawingEntity } from '../repositories/powerball-ticket-drawing';
import { PowerballTicketNumberEntity } from '../repositories/powerball-ticket-number';

class CustomOrmLogger implements TypeOrmLogger {
  logQuery(query: string, parameters?: any[] | undefined, _queryRunner?: import('typeorm').QueryRunner | undefined) {
    Logger.instance.verbose({ query: query, parameters: parameters });
  }
  logQueryError(error: string, query: string, parameters?: any[] | undefined, _queryRunner?: import('typeorm').QueryRunner | undefined) {
    Logger.instance.error({ error: error, query: query, parameters: parameters });
  }
  logQuerySlow(time: number, query: string, parameters?: any[] | undefined, _queryRunner?: import('typeorm').QueryRunner | undefined) {
    Logger.instance.warn({ time: time, query: query, parameters: parameters });
  }
  logSchemaBuild(message: string, _queryRunner?: import('typeorm').QueryRunner | undefined) {
    Logger.instance.verbose({ message: message });
  }
  logMigration(message: string, _queryRunner?: import('typeorm').QueryRunner | undefined) {
    Logger.instance.verbose({ message: message });
  }
  log(level: 'log' | 'info' | 'warn', message: any, _queryRunner?: import('typeorm').QueryRunner | undefined) {
    Logger.instance.log(level, message);
  }
}

export class TypeOrmHelpers {
  static GetTypeOrmConnectionOptions(): ConnectionOptions {
    dotenv.config();

    return {
      type: 'postgres',
      database: process.env.POSTGRES_INSTANCE_ID,
      host: process.env.POSTGRES_ENDPOINT,
      port: 5432,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      synchronize: false,
      logger: new CustomOrmLogger(),
      entities: [
        PowerballTicketEntity,
        PowerballDrawingEntity,
        OwnerWinningEntity,
        PowerballTicketDrawingEntity,
        PowerballTicketNumberEntity
      ]
    };
  }
}
