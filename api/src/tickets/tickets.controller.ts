import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { IdParamDto } from 'src/common/dto/id-param.dto';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { FindTicketDto } from './dto/find-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketsService } from './tickets.service';

@ApiTags('tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @ApiOperation({
    summary: 'Create new resource',
    description: 'Create new resource',
  })
  @ApiCreatedResponse({ description: 'The request has succeeded' })
  @ApiBadRequestResponse({ description: 'Bad request ' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post()
  async create(
    @Res() res: Response,
    @Body() { registrationNumber }: CreateTicketDto,
  ): Promise<Response> {
    return res.send(await this.ticketsService.create(registrationNumber));
  }

  @ApiOperation({
    summary: 'Get all resources',
    description: 'Get all resources with matching query',
  })
  @ApiOkResponse({ description: 'The request has succeeded' })
  @ApiBadRequestResponse({ description: 'Bad request ' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get()
  async findAll(
    @Res() res: Response,
    @Query() query: FindTicketDto,
  ): Promise<Response> {
    return res.send(await this.ticketsService.findAll(query.status));
  }

  @ApiOperation({
    summary: 'Update resource',
    description: 'Update resource by resource id',
  })
  @ApiOkResponse({ description: 'The request has succeeded' })
  @ApiBadRequestResponse({ description: 'Bad request ' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Put(':id')
  async udpate(
    @Res() res: Response,
    @Param() { id }: IdParamDto,
    @Body() body: UpdateTicketDto,
  ): Promise<Response> {
    return res.send(await this.ticketsService.update(id, body));
  }
}
