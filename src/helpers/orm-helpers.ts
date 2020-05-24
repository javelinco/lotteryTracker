import { Logger as TypeOrmLogger, ConnectionOptions } from 'typeorm';
import Logger from './logger';
import { PowerballTicketEntity } from '../repositories/powerball-ticket';
import * as dotenv from 'dotenv';
import { PowerballDrawingEntity } from '../repositories/powerball-drawing';
import { OwnerWinningEntity } from '../repositories/owner-winning';
import { PowerballTicketDrawingEntity } from '../repositories/powerball-ticket-drawing';
import { PowerballTicketNumberEntity } from '../repositories/powerball-ticket-number';

class CustomOrmLogger implements TypeOrmLogger {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public logQuery(query: string, parameters?: Array<any> | undefined, _queryRunner?: import('typeorm').QueryRunner | undefined) {
    Logger.instance.verbose({ query: query, parameters: parameters });
  }
  public logQueryError(
    error: string,
    query: string,
    parameters?: Array<any> | undefined,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _queryRunner?: import('typeorm').QueryRunner | undefined
  ) {
    Logger.instance.error({ error: error, query: query, parameters: parameters });
  }
  public logQuerySlow(
    time: number,
    query: string,
    parameters?: Array<any> | undefined,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _queryRunner?: import('typeorm').QueryRunner | undefined
  ) {
    Logger.instance.warn({ time: time, query: query, parameters: parameters });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public logSchemaBuild(message: string, _queryRunner?: import('typeorm').QueryRunner | undefined) {
    Logger.instance.verbose({ message: message });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public logMigration(message: string, _queryRunner?: import('typeorm').QueryRunner | undefined) {
    Logger.instance.verbose({ message: message });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public log(level: 'log' | 'info' | 'warn', message: any, _queryRunner?: import('typeorm').QueryRunner | undefined) {
    Logger.instance.log(level, message);
  }
}

export class TypeOrmHelpers {
  public static getTypeOrmConnectionOptions(): ConnectionOptions {
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
