import * as dotenv from 'dotenv';
import { createConnection, getConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { createTicket } from '../helpers/test-powerball-ticket';
import { PowerballTicketRepository } from './powerball-ticket';
import { TypeOrmHelpers } from '../helpers/orm-helpers';
import { PowerballTicketDrawing } from '../interfaces/powerball-ticket-drawing';
import { PowerballTicketDrawingRepository } from './powerball-ticket-drawing';

describe('Integration - PowerballTicketDrawing CRUD Operations', () => {
  const powerballDrawingRepository = new PowerballTicketDrawingRepository();
  const powerballTicketRepository = new PowerballTicketRepository();

  const ownerId = uuidv4();
  const testTicket = createTicket(uuidv4(), ownerId);

  const testPowerballTicketDrawing: PowerballTicketDrawing = {
    ticketId: testTicket.ticketId,
    drawingDate: new Date('1/1/2020'),
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
    const saved = await powerballDrawingRepository.save(testPowerballTicketDrawing);
    const loaded = await powerballDrawingRepository.load(testPowerballTicketDrawing.ticketId, testPowerballTicketDrawing.drawingDate);
    const deleted = await powerballDrawingRepository.delete(testPowerballTicketDrawing.ticketId, testPowerballTicketDrawing.drawingDate);

    expect(saved).toEqual(testPowerballTicketDrawing);
    expect(loaded).toEqual(testPowerballTicketDrawing);
    expect(deleted).toBeTruthy();
  });
});
