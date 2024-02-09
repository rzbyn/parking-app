import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Configuration } from './entities/configuration.entity';

@Injectable()
export class ConfigurationsService {
  constructor(
    @InjectModel(Configuration)
    private readonly configuration: typeof Configuration,
  ) {}

  /**
   * Return the configuration
   * 
   * If there is no configuraton, create one with default
   *
   * @returns {Promise<Configuration>} Return the configuration
   */
  async find(): Promise<Configuration> {
    const configuration = await this.configuration.findOne();
    if (!configuration)
      return this.configuration.create({
        capacity: 10,
        initialRate: 5000,
        incrementRate: 3000,
      });

    return configuration;
  }

  /**
   * Update configuration
   * 
   * If there is no configuration, crearte one with given parameter
   *
   * @param data Configuration update data
   * @returns {Promise<Configuration>} Return updated ticket
   */
  async update({
    capacity,
    initialRate,
    incrementRate,
  }: Pick<
    Configuration,
    'capacity' | 'initialRate' | 'incrementRate'
  >): Promise<Configuration> {
    const configuration = await this.configuration.findOne();
    if (!configuration)
      return this.configuration.create({
        capacity,
        initialRate,
        incrementRate,
      });

    return configuration.update({ capacity, initialRate, incrementRate });
  }
}
