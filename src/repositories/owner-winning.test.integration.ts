import { OwnerWinningRepository } from './owner-winning';
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';
import { createConnection, getConnection } from 'typeorm';
import { OwnerWinning } from '../interfaces/owner-winning';
import { PowerballTicketRepository } from './powerball-ticket';
import { createTicket } from '../helpers/test-powerball-ticket';
import { TypeOrmHelpers } from '../helpers/orm-helpers';

describe('Integration - OwnerWinning CRUD Operations', () => {
  const winningAmount = 100;
  const ownerId = uuidv4();
  const testTicket = createTicket(uuidv4(), ownerId);
  const testOwnerWinning = createOwnerWinning(testTicket.ticketId, new Date('1/1/2000'));
  const powerballTicketRepository = new PowerballTicketRepository();
  const ownerWinningRepository = new OwnerWinningRepository();

  function createOwnerWinning(ticketId: string, drawingDate: Date): OwnerWinning {
    return {
      ticketId: ticketId,
      drawingDate: drawingDate,
      amount: winningAmount,
      createDate: new Date('1/1/2000'),
      updateDate: new Date('1/1/2000')
    };
  }

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
    const saved = await ownerWinningRepository.save(testOwnerWinning);
    const loaded = await ownerWinningRepository.load(testOwnerWinning.ticketId, testOwnerWinning.drawingDate);
    const deleted = await ownerWinningRepository.delete(testOwnerWinning.ticketId, testOwnerWinning.drawingDate);

    expect(saved).toEqual(testOwnerWinning);
    expect(loaded).toEqual(testOwnerWinning);
    expect(deleted).toBeTruthy();
  });
});
