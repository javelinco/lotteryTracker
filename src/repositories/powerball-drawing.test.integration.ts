import * as dotenv from 'dotenv';
import { DbConnection } from '../db-connection';
import { PowerballDrawingRepository } from './powerball-drawing';
import { powerballDrawing } from '../interfaces/powerballDrawing';
import * as moment from 'moment';

describe('Integration - PowerballDrawing CRUD Operations', () => {
  const powerballDrawingRepository = new PowerballDrawingRepository();

  const powerballDrawing: powerballDrawing = {
    drawingDate: moment()
      .add(10, 'y')
      .toDate(),
    number01: 1,
    number02: 2,
    number03: 3,
    number04: 4,
    number05: 5,
    powerNumber: 6,
    createDate: moment().toDate(),
    updateDate: moment().toDate()
  };

  beforeAll(() => {
    dotenv.config();
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
