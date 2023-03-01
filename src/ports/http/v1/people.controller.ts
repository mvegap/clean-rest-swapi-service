import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('peoples')
@ApiTags('Peoples')
export class PeopleController {}
