import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { plainToInstance } from 'class-transformer';
import { from, lastValueFrom, map, Observable } from 'rxjs';
import { expand, takeWhile, toArray } from 'rxjs/operators';
import { AppService, SwapiConfig } from 'src/app.service';
import { People } from 'src/domain/people';
import { Planet } from 'src/domain/planet';

@Injectable()
export class HttpSwapiService {
  private readonly config: SwapiConfig;

  constructor(
    private readonly httpService: HttpService,
    private readonly logger: Logger,
  ) {
    this.config = AppService.swapiConfig();
  }

  async getPeople(limit?: number): Promise<People[]> {
    try {
      const baseUrl = `${this.config.url}/people/`;
      const initialUrl = `${baseUrl}?page=1`;
      const isWithinLimit = (peoples: People[]) =>
        !limit || peoples.length < limit;

      const fetchPeople = (url: string): Observable<People[]> =>
        this.httpService.get(url).pipe(
          map((res: AxiosResponse<any>) => res.data.results),
          takeWhile(isWithinLimit),
        );

      const peoples = await lastValueFrom(
        from([initialUrl]).pipe(
          expand((url) =>
            fetchPeople(url).pipe(
              map((results) => ({ results, nextUrl: url + 1 })),
            ),
          ),
          takeWhile(
            ({ nextUrl, results }) => !!nextUrl && isWithinLimit(results),
          ),
          map(({ results }) => results),
          toArray(),
        ),
      );

      return plainToInstance(People, peoples.flat(), {
        enableImplicitConversion: true,
      });
    } catch (error) {
      this.logger.error(`Exception getPeople(): ${error.message}`);
      throw error;
    }
  }

  async getPeopleById(id: number): Promise<People> {
    try {
      const url = `${this.config.url}/people/${id}`;

      const response = await lastValueFrom(
        this.httpService
          .get(url)
          .pipe(map((response: AxiosResponse<any>) => response.data)),
      );

      return plainToInstance(People, response, {
        enableImplicitConversion: true,
      });
    } catch (error) {
      this.logger.error(
        `Exception getPeopleById(): ${error.message}`,
        'HttpSwapiService',
      );
      throw error;
    }
  }

  async getPlanets(limit?: number): Promise<Planet[]> {
    try {
      const baseUrl = `${this.config.url}/planets/`;
      const initialUrl = `${baseUrl}?page=1`;
      const isWithinLimit = (planets: Planet[]) =>
        !limit || planets.length < limit;

      const fetchPlanets = (url: string): Observable<Planet[]> =>
        this.httpService.get(url).pipe(
          map((res) => res.data.results),
          takeWhile(isWithinLimit),
        );

      const planets = await from([initialUrl])
        .pipe(
          expand((url) =>
            fetchPlanets(url).pipe(
              map((results) => ({ results, nextUrl: url + 1 })),
            ),
          ),
          takeWhile(
            ({ nextUrl, results }) => !!nextUrl && isWithinLimit(results),
          ),
          map(({ results }) => results),
          toArray(),
        )
        .toPromise();

      return plainToInstance(Planet, planets.flat(), {
        enableImplicitConversion: true,
      });
    } catch (error) {
      this.logger.error(
        `Exception getPlanets(): ${error.message}`,
        'HttpSwapiService',
      );
      throw error;
    }
  }

  async getPlanetById(id: number): Promise<Planet> {
    try {
      const url = `${this.config.url}/planets/${id}`;

      const response = await lastValueFrom(
        this.httpService
          .get(url)
          .pipe(map((response: AxiosResponse<any>) => response.data)),
      );

      return plainToInstance(Planet, response, {
        enableImplicitConversion: true,
      });
    } catch (error) {
      this.logger.error(
        `Exception getPlanetById(): ${error.message}`,
        'HttpSwapiService',
      );
      throw error;
    }
  }
}
