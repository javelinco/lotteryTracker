import { GetPowerballDrawingsSince } from './getPowerballDrawing';
import Logger from './helpers/logger';
import * as moment from 'moment';

describe('Powerball Drawing', () => {
  it('Should get latest drawing', async () => {
    const drawings = await GetPowerballDrawingsSince(
      moment()
        .add(-7, 'd')
        .toDate()
    );
    const drawing = drawings.length > 0 ? drawings[drawings.length - 1] : null;
    Logger.instance.info({ drawing: drawing });
  });
});
