import axios from 'axios';
import * as moment from 'moment';
import { dateFormat } from './helpers/date-format';
import Logger from './helpers/logger';
import { PowerballDrawing } from './interfaces/powerball-drawing';

export interface PowerballDrawingEntry {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  field_winning_numbers: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  field_multiplier: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  field_draw_date: Date;
}

const powerballUrl = 'https://powerball.com/api/v1/numbers/powerball?_format=json';

export type getPowerballDrawingFromApiFunc = (url: string) => Promise<Array<PowerballDrawingEntry>>;

async function getPowerballDrawingFromApi(url: string): Promise<Array<PowerballDrawingEntry>> {
  axios.defaults.adapter = require('axios/lib/adapters/http');
  try {
    return (await axios.get(url)).data;
  } catch (error) {
    Logger.instance.error(error);
    throw error;
  }
}

export async function getPowerballDrawingsSince(
  beginDate: Date,
  getPowerballDrawingFromApiFunc: getPowerballDrawingFromApiFunc = getPowerballDrawingFromApi
): Promise<Array<PowerballDrawing>> {
  const url = `${powerballUrl}&min=${moment(beginDate).format(dateFormat)}%2000:00:00&max=${moment().format(dateFormat)}%2023:59:59`;
  return convert(await getPowerballDrawingFromApiFunc(url));
}

function convert(powerballDrawingEntries: Array<PowerballDrawingEntry>): Array<PowerballDrawing> {
  const powerballDrawings: Array<PowerballDrawing> = [];
  for (const powerballDrawingEntry of powerballDrawingEntries) {
    const powerballNumbers = powerballDrawingEntry.field_winning_numbers.split(',');
    const powerballDrawing: PowerballDrawing = {
      drawingDate: moment(powerballDrawingEntry.field_draw_date).toDate(),
      number01: +powerballNumbers[0],
      number02: +powerballNumbers[1],
      number03: +powerballNumbers[2],
      number04: +powerballNumbers[3],
      number05: +powerballNumbers[4],
      powerNumber: +powerballDrawingEntry.field_multiplier,
      createDate: moment().toDate(),
      updateDate: moment().toDate()
    };
    powerballDrawings.push(powerballDrawing);
  }
  return powerballDrawings;
}
