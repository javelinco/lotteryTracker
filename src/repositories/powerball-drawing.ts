import Logger from '../helpers/logger';
import { powerballDrawing } from '../interfaces/powerballDrawing';
import { DbConnection } from '../db-connection';
import { ResultRow } from 'ts-postgres';

export class PowerballDrawingRepository {
  private Translate(resultRow: ResultRow): powerballDrawing {
    const powerballDrawing: powerballDrawing = {
      drawingDate: new Date(`${resultRow.get('drawingdate')}`),
      number01: Number(resultRow.get('number01')),
      number02: Number(resultRow.get('number02')),
      number03: Number(resultRow.get('number03')),
      number04: Number(resultRow.get('number04')),
      number05: Number(resultRow.get('number05')),
      powerNumber: Number(resultRow.get('powernumber')),
      createDate: new Date(`${resultRow.get('createdate')}`),
      updateDate: new Date(`${resultRow.get('updatedate')}`)
    };
    return powerballDrawing;
  }

  public async Delete(drawingDate: Date): Promise<boolean> {
    try {
      const client = await DbConnection.getConnection();
      await client.query('DELETE FROM powerballdrawing WHERE drawingdate = $1', [drawingDate]);
    } catch (error) {
      Logger.instance.error({ message: `Unable to delete Powerball drawing for ${drawingDate}`, error: error });
      throw error;
    }
    return true;
  }

  public async GetLast(): Promise<powerballDrawing | null> {
    try {
      const client = await DbConnection.getConnection();
      const stream = client.query('SELECT * FROM powerballdrawing ORDER BY drawingdate DESC LIMIT 1;');
      for await (const resultRow of stream) {
        return this.Translate(resultRow);
      }
    } catch (error) {
      Logger.instance.error({ message: 'Unable to retrieve latest Powerball drawing', error: error });
      throw error;
    }
    return null;
  }

  public async Load(drawingDate: Date): Promise<powerballDrawing | null> {
    try {
      const client = await DbConnection.getConnection();
      const stream = client.query('SELECT * FROM powerballdrawing WHERE drawingdate = $1;', [drawingDate]);
      for await (const resultRow of stream) {
        return this.Translate(resultRow);
      }
    } catch (error) {
      Logger.instance.error({ message: `Unable to retrieve Powerball drawing for ${drawingDate}`, error: error });
      throw error;
    }
    return null;
  }

  public async Save(powerballDrawing: powerballDrawing): Promise<powerballDrawing | null> {
    const powerballDrawingQuery =
      'INSERT INTO PowerballDrawing ' +
      '(DrawingDate, Number01, Number02, Number03, Number04, Number05, PowerNumber, CreateDate, UpdateDate) ' +
      'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ' +
      'ON CONFLICT (drawingDate) DO UPDATE ' +
      'SET Number01 = $2, ' +
      ' Number02 = $3, ' +
      ' Number03 = $4, ' +
      ' Number04 = $5, ' +
      ' Number05 = $6, ' +
      ' PowerNumber = $7, ' +
      ' UpdateDate = $9';
    try {
      const client = await DbConnection.getConnection();
      await client.query(powerballDrawingQuery, [
        powerballDrawing.drawingDate,
        powerballDrawing.number01,
        powerballDrawing.number02,
        powerballDrawing.number03,
        powerballDrawing.number04,
        powerballDrawing.number05,
        powerballDrawing.powerNumber,
        powerballDrawing.createDate,
        powerballDrawing.updateDate
      ]);
    } catch (error) {
      Logger.instance.error({ message: `Unable to save Powerball drawing for ${powerballDrawing.drawingDate}`, error: error });
      throw error;
    }
    return this.Load(powerballDrawing.drawingDate);
  }
}
