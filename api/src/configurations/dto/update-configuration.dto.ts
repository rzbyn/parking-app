import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, Min } from 'class-validator';

export class UpdateConfigurationDto {
  @ApiProperty({
    description: 'Parking lot capacity configuration',
    type: Number,
  })
  @IsDefined()
  @IsInt()
  @Min(1)
  capacity: number;

  @ApiProperty({
    description: 'Parking rate for the 1st hour',
    type: Number,
  })
  @IsDefined()
  @IsInt()
  @Min(1)
  initialRate: number;

  @ApiProperty({
    description: 'Parking hourly rate after the 1st hour',
    type: Number,
  })
  @IsDefined()
  @IsInt()
  @Min(1)
  incrementRate: number;
}
