import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsDefined, IsEnum } from 'class-validator';
import { Ticket } from '../entities/ticket.entity';
import TicketStatus from '../enums/tickets-status.enum';

export class UpdateTicketDto {
  @ApiProperty({
    description: 'Ticket depart time',
    type: String,
    format: 'date-time',
  })
  @IsDefined()
  @Transform(({ value }) => {
    return new Date(value);
  })
  @IsDate()
  departure: Ticket['departure'];

  @ApiProperty({
    description: 'Ticket status',
    enum: TicketStatus,
  })
  @IsDefined()
  @IsEnum(TicketStatus)
  status: TicketStatus.DEPART;
}
