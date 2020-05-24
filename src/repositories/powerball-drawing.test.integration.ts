import * as dotenv from 'dotenv';
import { PowerballDrawingRepository } from './powerball-drawing';
import { PowerballDrawing } from '../interfaces/powerball-drawing';
import { createConnection, getConnection } from 'typeorm';
import { TypeOrmHelpers } from '../helpers/orm-helpers';

describe('Integration - PowerballDrawing CRUD Operations', () => {
  const powerballDrawingRepository = new PowerballDrawingRepository();

  const powerballDrawing: PowerballDrawing = {
    drawingDate: new Date('1/1/2130'),
    number01: 1,
    number02: 2,
    number03: 3,
    number04: 4,
    number05: 5,
    powerNumber: 6,
    createDate: new Date('1/1/2130'),
    updateDate: new Date('1/1/2130')
  };

  beforeAll(async () => {
    dotenv.config();

    await createConnection(TypeOrmHelpers.getTypeOrmConnectionOptions());
  });

  afterAll(async () => {
    await getConnection().close();
  });

  it('Should Save, Load and Delete', async () => {
    const saved = await powerballDrawingRepository.save(powerballDrawing);
    const loaded = await powerballDrawingRepository.load(powerballDrawing.drawingDate);
    const deleted = await powerballDrawingRepository.delete(powerballDrawing.drawingDate);

    expect(saved).toEqual(powerballDrawing);
    expect(loaded).toEqual(powerballDrawing);
    expect(deleted).toBeTruthy();
  });

  it('Should load latest', async () => {
    const saved = await powerballDrawingRepository.save(powerballDrawing);
    const latest = await powerballDrawingRepository.getLatest();
    const deleted = await powerballDrawingRepository.delete(powerballDrawing.drawingDate);

    expect(saved).toEqual(powerballDrawing);
    expect(latest).toEqual(powerballDrawing);
    expect(deleted).toBeTruthy();
  });
});
