import { PowerballTicketNumberRepository } from './powerball-ticket-number';
import * as dotenv from 'dotenv';
import { createConnection, getConnection } from 'typeorm';
import { PowerballTicketNumber } from '../interfaces/powerball-ticket-number';
import { v4 as uuidv4 } from 'uuid';
import { createTicket } from '../helpers/test-powerball-ticket';
import { PowerballTicketRepository } from './powerball-ticket';
import { TypeOrmHelpers } from '../helpers/orm-helpers';

describe('Integration - PowerballTicketNumber CRUD Operations', () => {
  const powerballTicketNumberRepository = new PowerballTicketNumberRepository();
  const powerballTicketRepository = new PowerballTicketRepository();

  const ownerId = uuidv4();
  const testTicket = createTicket(uuidv4(), ownerId);

  const testPowerballTicketNumber: PowerballTicketNumber = {
    ticketNumberId: uuidv4(),
    ticketId: testTicket.ticketId,
    number01: 1,
    number02: 2,
    number03: 3,
    number04: 4,
    number05: 5,
    powerNumber: 6,
    createDate: new Date('1/1/2000'),
    updateDate: new Date('1/1/2000')
  };

  beforeAll(async () => {
    dotenv.config();

    await createConnection(TypeOrmHelpers.getTypeOrmConnectionOptions());

    await powerballTicketRepository.save(testTicket);
  });

  afterAll(async () => {
    await powerballTicketRepository.delete(testTicket.ticketId);
    await getConnection().close();
  });

  it('Should Save, Load and Delete', async () => {
    const saved = await powerballTicketNumberRepository.save(testPowerballTicketNumber);
    const loaded = await powerballTicketNumberRepository.load(testPowerballTicketNumber.ticketId);
    const deleted = await powerballTicketNumberRepository.delete(testPowerballTicketNumber.ticketId);

    expect(saved).toEqual(testPowerballTicketNumber);
    expect(loaded).toEqual([testPowerballTicketNumber]);
    expect(deleted).toBeTruthy();
  });
});
