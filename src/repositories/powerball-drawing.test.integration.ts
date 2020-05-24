import * as dotenv from 'dotenv';
import { DbConnection } from '../db-connection';
import { PowerballDrawingRepository } from './powerball-drawing';
import { powerballDrawing } from '../interfaces/powerballDrawing';

describe('Integration - PowerballDrawing CRUD Operations', () => {
  const powerballDrawingRepository = new PowerballDrawingRepository();

  let powerballDrawing: powerballDrawing;

  beforeAll(() => {
    dotenv.config();

    let currentDateTime: Date = new Date();
    currentDateTime.setMilliseconds(0);

    let drawingDate: Date = new Date(`${currentDateTime.getFullYear() + 10}-01-02T00:00:00.000Z`);

    powerballDrawing = {
      drawingDate: drawingDate,
      number01: 1,
      number02: 2,
      number03: 3,
      number04: 4,
      number05: 5,
      powerNumber: 6,
      createDate: currentDateTime,
      updateDate: currentDateTime
    };
  });

  afterAll(async () => {
    DbConnection.closeConnection();
  });

  it('Saves, loads and deletes a course student', async () => {
    const saved = await powerballDrawingRepository.Save(powerballDrawing);
    const loaded = await powerballDrawingRepository.Load(powerballDrawing.drawingDate);
    const deleted = await powerballDrawingRepository.Delete(powerballDrawing.drawingDate);

    expect(saved).toEqual(powerballDrawing);
    expect(loaded).toEqual(powerballDrawing);
    expect(deleted).toBeTruthy();
  });
});
