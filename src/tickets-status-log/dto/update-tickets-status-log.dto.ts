import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketsStatusLogDto } from './create-tickets-status-log.dto';

export class UpdateTicketsStatusLogDto extends PartialType(CreateTicketsStatusLogDto) {}
