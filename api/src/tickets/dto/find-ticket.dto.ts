import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import TicketStatus from '../enums/tickets-status.enum';

export class FindTicketDto {
  @ApiPropertyOptional({
    description: 'Ticket status',
    enum: ['all', ...Object.values(TicketStatus)],
    default: TicketStatus.PARK,
  })
  @IsOptional()
  @IsEnum(TicketStatus)
  @Transform(({ value }) =>
    value === 'all' ? undefined : value || TicketStatus.PARK,
  )
  status: TicketStatus = TicketStatus.PARK;
}
