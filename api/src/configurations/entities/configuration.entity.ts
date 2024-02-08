import {
  AllowNull,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'configurations',
  paranoid: true,
  timestamps: true,
})
export class Configuration extends Model<Configuration> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  capacity: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  initialRate: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  incrementRate: number;
}
