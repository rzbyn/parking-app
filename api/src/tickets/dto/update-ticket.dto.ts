import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum } from 'class-validator';
import TicketStatus from '../enums/tickets-status.enum';

export class UpdateTicketDto {
  @ApiProperty({
    description: 'Ticket status',
    enum: [TicketStatus.DEPART],
  })
  @IsDefined()
  @IsEnum([TicketStatus.DEPART])
  status: TicketStatus.DEPART;
}
