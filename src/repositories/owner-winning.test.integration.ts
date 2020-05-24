import { OwnerWinningRepository } from './owner-winning';
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';
import { createConnection, getConnection } from 'typeorm';
import { ownerWinning } from '../interfaces/ownerwinning';
import { PowerballTicketRepository } from './powerball-ticket';
import { CreateTicket } from '../helpers/test-powerball-ticket';
import { TypeOrmHelpers } from '../helpers/orm-helpers';

describe('Integration - OwnerWinning CRUD Operations', () => {
  const winningAmount = 100;
  const ownerId = uuidv4();
  const testTicket = CreateTicket(uuidv4(), ownerId);
  const testOwnerWinning = CreateOwnerWinning(testTicket.ticketId, new Date('1/1/2000'));
  const powerballTicketRepository = new PowerballTicketRepository();
  const ownerWinningRepository = new OwnerWinningRepository();

  function CreateOwnerWinning(ticketId: string, drawingDate: Date): ownerWinning {
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

    await createConnection(TypeOrmHelpers.GetTypeOrmConnectionOptions());

    await powerballTicketRepository.Save(testTicket);
  });

  afterAll(async () => {
    await powerballTicketRepository.Delete(testTicket.ticketId);
    getConnection().close();
  });

  it('Should Save, Load and Delete', async () => {
    const saved = await ownerWinningRepository.Save(testOwnerWinning);
    const loaded = await ownerWinningRepository.Load(testOwnerWinning.ticketId, testOwnerWinning.drawingDate);
    const deleted = await ownerWinningRepository.Delete(testOwnerWinning.ticketId, testOwnerWinning.drawingDate);

    expect(saved).toEqual(testOwnerWinning);
    expect(loaded).toEqual(testOwnerWinning);
    expect(deleted).toBeTruthy();
  });
});
