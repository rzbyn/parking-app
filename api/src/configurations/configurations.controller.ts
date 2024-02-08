import { Body, Controller, Get, Put, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ConfigurationsService } from './configurations.service';
import { UpdateConfigurationDto } from './dto/update-configuration.dto';

@ApiTags('configuration')
@Controller('configurations')
export class ConfigurationsController {
  constructor(private readonly configurationsService: ConfigurationsService) {}

  @Get()
  async findAll(@Res() res: Response): Promise<Response> {
    return res.send(await this.configurationsService.find());
  }

  @Put()
  async update(
    @Res() res: Response,
    @Body() updateConfigurationDto: UpdateConfigurationDto,
  ): Promise<Response> {
    return res.send(
      await this.configurationsService.update(updateConfigurationDto),
    );
  }
}
