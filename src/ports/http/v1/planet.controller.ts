import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('planets')
@ApiTags('Planets')
export class PlanetController {}
