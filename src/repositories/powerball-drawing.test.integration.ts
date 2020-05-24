import * as dotenv from 'dotenv';
import { PowerballDrawingRepository } from './powerball-drawing';
import { powerballDrawing } from '../interfaces/powerballDrawing';
import { createConnection, getConnection } from 'typeorm';
import { TypeOrmHelpers } from '../helpers/orm-helpers';

describe('Integration - PowerballDrawing CRUD Operations', () => {
  const powerballDrawingRepository = new PowerballDrawingRepository();

  const powerballDrawing: powerballDrawing = {
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

    await createConnection(TypeOrmHelpers.GetTypeOrmConnectionOptions());
  });

  afterAll(async () => {
    getConnection().close();
  });

  it('Should Save, Load and Delete', async () => {
    const saved = await powerballDrawingRepository.Save(powerballDrawing);
    const loaded = await powerballDrawingRepository.Load(powerballDrawing.drawingDate);
    const deleted = await powerballDrawingRepository.Delete(powerballDrawing.drawingDate);

    expect(saved).toEqual(powerballDrawing);
    expect(loaded).toEqual(powerballDrawing);
    expect(deleted).toBeTruthy();
  });

  it('Should load latest', async () => {
    const saved = await powerballDrawingRepository.Save(powerballDrawing);
    const latest = await powerballDrawingRepository.GetLatest();
    const deleted = await powerballDrawingRepository.Delete(powerballDrawing.drawingDate);

    expect(saved).toEqual(powerballDrawing);
    expect(latest).toEqual(powerballDrawing);
    expect(deleted).toBeTruthy();
  });
});
