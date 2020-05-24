import * as dotenv from 'dotenv';
import { createConnection, getConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { createTicket } from '../helpers/test-powerball-ticket';
import { PowerballTicketRepository } from './powerball-ticket';
import { TypeOrmHelpers } from '../helpers/orm-helpers';
import { PowerballTicketDrawing } from '../interfaces/powerball-ticket-drawing';
import { PowerballTicketDrawingRepository } from './powerball-ticket-drawing';

describe('Integration - PowerballTicketDrawing CRUD Operations', () => {
  const powerballTicketDrawingRepository = new PowerballTicketDrawingRepository();
  const powerballTicketRepository = new PowerballTicketRepository();

  const ticketIds: Array<string> = [];

  const ownerId = uuidv4();

  async function createPowerballTicketDrawing(drawingDate: Date): Promise<PowerballTicketDrawing> {
    const testTicket = createTicket(uuidv4(), ownerId);
    await powerballTicketRepository.save(testTicket);
    ticketIds.push(testTicket.ticketId);

    return {
      ticketId: testTicket.ticketId,
      drawingDate: drawingDate,
      createDate: new Date('1/1/2000'),
      updateDate: new Date('1/1/2000')
    };
  }

  beforeAll(async () => {
    dotenv.config();

    await createConnection(TypeOrmHelpers.getTypeOrmConnectionOptions());
  });

  afterAll(async () => {
    for (const ticketId of ticketIds) {
      await powerballTicketRepository.delete(ticketId);
    }
    await getConnection().close();
  });

  it('Should Save, Load and Delete', async () => {
    const testPowerballTicketDrawing = await createPowerballTicketDrawing(new Date('1/1/2000'));

    const saved = await powerballTicketDrawingRepository.save(testPowerballTicketDrawing);
    const loaded = await powerballTicketDrawingRepository.load(testPowerballTicketDrawing.ticketId, testPowerballTicketDrawing.drawingDate);
    const deleted = await powerballTicketDrawingRepository.delete(
      testPowerballTicketDrawing.ticketId,
      testPowerballTicketDrawing.drawingDate
    );

    expect(saved).toEqual(testPowerballTicketDrawing);
    expect(loaded).toEqual(testPowerballTicketDrawing);
    expect(deleted).toBeTruthy();
  });

  it('Should Get All Given Drawing Date', async () => {
    const drawingDate = new Date('1/1/2000');

    const expectedDrawings = [
      await createPowerballTicketDrawing(drawingDate),
      await createPowerballTicketDrawing(drawingDate),
      await createPowerballTicketDrawing(drawingDate)
    ];

    await powerballTicketDrawingRepository.save(expectedDrawings[0]);
    await powerballTicketDrawingRepository.save(expectedDrawings[1]);
    await powerballTicketDrawingRepository.save(expectedDrawings[2]);

    const drawings = await powerballTicketDrawingRepository.getByDrawingDate(drawingDate);

    expect(drawings).toEqual(expectedDrawings);

    for (const ticketId of ticketIds) {
      await powerballTicketDrawingRepository.delete(ticketId, drawingDate);
    }
  });
});
