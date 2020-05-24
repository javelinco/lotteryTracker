import * as dotenv from 'dotenv';
import { createConnection, getConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateTicket } from '../helpers/test-powerball-ticket';
import { PowerballTicketRepository } from './powerball-ticket';
import { TypeOrmHelpers } from '../helpers/orm-helpers';
import { powerballTicketDrawing } from '../interfaces/powerballTicketDrawing';
import { PowerballTicketDrawingRepository } from './powerball-ticket-drawing';

describe('Integration - PowerballTicketDrawing CRUD Operations', () => {
  const powerballDrawingRepository = new PowerballTicketDrawingRepository();
  const powerballTicketRepository = new PowerballTicketRepository();

  const ownerId = uuidv4();
  const testTicket = CreateTicket(uuidv4(), ownerId);

  const testPowerballTicketDrawing: powerballTicketDrawing = {
    ticketId: testTicket.ticketId,
    drawingDate: new Date('1/1/2020'),
    createDate: new Date('1/1/2000'),
    updateDate: new Date('1/1/2000')
  };

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
    const saved = await powerballDrawingRepository.Save(testPowerballTicketDrawing);
    const loaded = await powerballDrawingRepository.Load(testPowerballTicketDrawing.ticketId, testPowerballTicketDrawing.drawingDate);
    const deleted = await powerballDrawingRepository.Delete(testPowerballTicketDrawing.ticketId, testPowerballTicketDrawing.drawingDate);

    expect(saved).toEqual(testPowerballTicketDrawing);
    expect(loaded).toEqual(testPowerballTicketDrawing);
    expect(deleted).toBeTruthy();
  });
});
