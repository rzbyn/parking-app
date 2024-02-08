import {
  AllowNull,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import TicketStatus from '../enums/tickets-status.enum';

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
}
