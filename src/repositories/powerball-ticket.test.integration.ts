import * as dotenv from 'dotenv';
import { PowerballTicketRepository } from './powerball-ticket';
import { PowerballTicket } from '../interfaces/powerball-ticket';
import { v4 as uuidv4 } from 'uuid';
import { createConnection, getConnection } from 'typeorm';
import { TypeOrmHelpers } from '../helpers/orm-helpers';
import { createTicket } from '../helpers/test-powerball-ticket';

describe('Integration - PowerballTicket CRUD Operations', () => {
  const powerballTicketRepository = new PowerballTicketRepository();

  const powerballTicket: PowerballTicket = createTicket(uuidv4(), uuidv4());

  beforeAll(async () => {
    dotenv.config();

    await createConnection(TypeOrmHelpers.getTypeOrmConnectionOptions());
  });

  afterAll(async () => {
    await getConnection().close();
  });

  it('Should Save, Load and Delete', async () => {
    const saved = await powerballTicketRepository.save(powerballTicket);
    const loaded = await powerballTicketRepository.load(powerballTicket.ticketId);
    const deleted = await powerballTicketRepository.delete(powerballTicket.ticketId);

    expect(saved).toEqual(powerballTicket);
    expect(loaded).toEqual(powerballTicket);
    expect(deleted).toBeTruthy();
  });
});
