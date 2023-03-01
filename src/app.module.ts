import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { AppService } from './app.service';
import { PeopleModule } from './application/people/people.module';
import { PlanetModule } from './application/planet/planet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WinstonModule.forRoot(AppService.loggerConfig()),
    HttpModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        ...AppService.typeORMConfig(),
      }),
      inject: [ConfigService],
    }),
    PeopleModule,
    PlanetModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
