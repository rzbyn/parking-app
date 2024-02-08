import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket)
    private readonly ticket: typeof Ticket,
  ) {}

  /**
   * Create new ticket with given vehicile registration number
   *
   * @param {string} registrationNumber Vehicle registartion number
   * @returns {Promise<Ticket>} Return newly created ticket
   */
  async create(
    registrationNumber: Ticket['registrationNumber'],
  ): Promise<Ticket> {
    return this.ticket.create({ registrationNumber });
  }

  /**
   * Find all tickets matches the query
   *
   * @param {string} status Status query
   * @returns {Promise<Ticket[]>} Return tickets matching the query
   */
  async findAll(status: string): Promise<Ticket[]> {
    return this.ticket.findAll({
      where: status ? { status: status } : {},
    });
  }

  /**
   * Find ticket by `id` and update ticket
   *
   * @param id Ticket ID
   * @param data Ticket update data
   * @returns {Promise<Ticket>} Return updated ticket
   */
  async update(
    id: Ticket['id'],
    data: Pick<Ticket, 'departure' | 'status'>,
  ): Promise<Ticket> {
    const ticket = await this.ticket.findByPk(id);
    if (!ticket) throw new NotFoundException('Ticket not found');

    await ticket.update(data);

    return ticket;
  }
}
