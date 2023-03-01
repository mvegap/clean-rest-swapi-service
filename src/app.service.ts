import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as winston from 'winston';

export class SwapiConfig {
  readonly url: string;
}

export class AppService {
  static app_title(): string {
    const { APP_NAME } = process.env;
    return APP_NAME || 'NestJS';
  }

  static environment(): string {
    const { ENVIRONMENT } = process.env;
    return (ENVIRONMENT ? ENVIRONMENT : 'LOCAL').toUpperCase();
  }

  static port(): number {
    const { PORT } = process.env;
    return PORT && Number(PORT) ? Number(PORT) : 8080;
  }

  static logLevel(): string {
    const { LOG_LEVEL } = process.env;
    return (LOG_LEVEL ? LOG_LEVEL : 'info').toLowerCase();
  }

  static loggerConfig(): winston.LoggerOptions {
    const format =
      AppService.environment() !== 'LOCAL'
        ? winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            winston.format.json(),
          )
        : winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            winston.format.colorize(),
            winston.format.ms(),
            winston.format.simple(),
          );

    return {
      level: AppService.logLevel(),
      defaultMeta: {
        applicationName: AppService.app_title(),
        environment: AppService.environment(),
      },
      transports: [
        new winston.transports.Console({
          format,
        }),
      ],
    };
  }

  static typeORMConfig(): TypeOrmModuleOptions {
    const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

    return {
      type: 'postgres',
      host: DB_HOST || '127.0.0.1',
      port: DB_PORT ? Number(DB_PORT) : 5432,
      username: DB_USER || 'root',
      password: DB_PASSWORD || '',
      database: DB_NAME || 'nestjs',
      entities: [__dirname + '/domain/*.entity{.ts,.js}'],
      logging: AppService.environment() === 'LOCAL' ? true : false,
      synchronize: AppService.environment() === 'LOCAL' ? true : false,
    };
  }

  static swapiConfig(): SwapiConfig {
    const { SWAPI_BASE_PATH } = process.env;
    return {
      url: SWAPI_BASE_PATH || 'https://swapi.dev/api',
    };
  }
}
