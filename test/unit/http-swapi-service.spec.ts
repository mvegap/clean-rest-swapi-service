import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { People } from 'src/domain/people';
import { HttpSwapiService } from 'src/infrastructure/http/http-swapi-service';

describe('HttpSwapiService', () => {
  let service: HttpSwapiService;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  beforeEach(() => {
    service = moduleRef.get<HttpSwapiService>(HttpSwapiService);
  });

  describe('getPeople', () => {
    it('should return an array of People', async () => {
      const result = await service.getPeople();
      expect(result).toBeInstanceOf(Array);
      result.forEach((r: any) => expect(r).toBeInstanceOf(People));
    });
  });

  describe('getPeopleById', () => {
    it('should return a People', async () => {
      const result = await service.getPeopleById(1);
      expect(result).toBeInstanceOf(People);
    });
  });
});
