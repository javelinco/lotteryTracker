import * as dotenv from 'dotenv';
import { PowerballTicketRepository } from './powerball-ticket';
import { powerballTicket } from '../interfaces/powerballTicket';
import { v4 as uuidv4 } from 'uuid';
import { createConnection, getConnection } from 'typeorm';
import { TypeOrmHelpers } from '../helpers/orm-helpers';
import { CreateTicket } from '../helpers/test-powerball-ticket';

describe('Integration - PowerballTicket CRUD Operations', () => {
  const powerballTicketRepository = new PowerballTicketRepository();

  let powerballTicket: powerballTicket = CreateTicket(uuidv4(), uuidv4());

  beforeAll(async () => {
    dotenv.config();

    await createConnection(TypeOrmHelpers.GetTypeOrmConnectionOptions());
  });

  afterAll(async () => {
    getConnection().close();
  });

  it('Should Save, Load and Delete', async () => {
    const saved = await powerballTicketRepository.Save(powerballTicket);
    const loaded = await powerballTicketRepository.Load(powerballTicket.ticketId);
    const deleted = await powerballTicketRepository.Delete(powerballTicket.ticketId);

    expect(saved).toEqual(powerballTicket);
    expect(loaded).toEqual(powerballTicket);
    expect(deleted).toBeTruthy();
  });
});
