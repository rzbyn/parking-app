import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Ticket } from '../entities/ticket.entity';

export class CreateTicketDto {
  @ApiProperty({
    description: 'Vehicle registration number',
    type: String,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  registrationNumber: Ticket['registrationNumber'];
}
