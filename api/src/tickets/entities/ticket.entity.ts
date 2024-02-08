import {
  AllowNull,
  BeforeCreate,
  BeforeUpdate,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Configuration } from 'src/configurations/entities/configuration.entity';
import TicketStatus from '../enums/tickets-status.enum';
import { BadRequestException } from '@nestjs/common';

@Table({
  tableName: 'tickets',
  paranoid: true,
  timestamps: true,
})
export class Ticket extends Model<Ticket> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  registrationNumber: string;

  @AllowNull(false)
  @Default(new Date())
  @Column(DataType.DATE)
  arrival: Date;

  @AllowNull(true)
  @Column(DataType.DATE)
  departure: Date;

  @Default(TicketStatus.PARK)
  @Column({
    type: DataType.ENUM(...Object.values(TicketStatus)),
  })
  status: TicketStatus;

  @AllowNull(true)
  @Default(0)
  @Column(DataType.INTEGER)
  bill: number;

  @BeforeCreate
  private static async validateCapcity(): Promise<void> {
    const { capacity } = await Configuration.findOne({});
    const ticketSum = await Ticket.count();

    if (ticketSum >= capacity)
      throw new BadRequestException('Parking lot is full');

    return;
  }

  @BeforeUpdate
  private static async calculateBill(instance: Ticket): Promise<void> {
    if (instance.changed('status') && instance.status === TicketStatus.DEPART) {
      const departureTime = new Date();
      const duration =
        (departureTime.getTime() - instance.arrival.getTime()) /
        (1000 * 60 * 60);
      console.log(
        departureTime.getTime(),
        instance.arrival.getTime(),
        (departureTime.getTime() - instance.arrival.getTime()) /
          (1000 * 60 * 60),
      );
      const { initialRate, incrementRate } = await Configuration.findOne({});
      instance.departure = departureTime;
      instance.bill =
        Math.max(0, Math.ceil(duration) - 1) * incrementRate + initialRate;
      return;
    }

    return;
  }
}
