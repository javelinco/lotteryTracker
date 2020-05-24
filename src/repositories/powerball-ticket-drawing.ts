import { getConnection, Entity, PrimaryColumn, Column } from 'typeorm';
import { PowerballTicketDrawing } from '../interfaces/powerball-ticket-drawing';
import * as moment from 'moment';
import { dateTimeFormat } from '../helpers/date-format';

@Entity({ name: 'powerballticketdrawing' })
export class PowerballTicketDrawingEntity {
  @PrimaryColumn('uuid', { name: 'ticketid' })
  public ticketId!: string;
  @PrimaryColumn('timestamp', { name: 'drawingdate' })
  public drawingDate!: Date;
  @Column('timestamp', { name: 'createdate' })
  public createDate!: Date;
  @Column('timestamp', { name: 'updatedate' })
  public updateDate!: Date;
}

export class PowerballTicketDrawingRepository {
  public async delete(ticketId: string, drawingDate: Date): Promise<boolean> {
    const deleteResult = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(PowerballTicketDrawingEntity)
      .where('ticketId = :ticketId', { ticketId: ticketId })
      .andWhere('drawingDate = :drawingDate', { drawingDate: drawingDate })
      .execute();
    return deleteResult.affected !== undefined && deleteResult.affected !== null && deleteResult.affected > 0;
  }

  public async load(ticketId: string, drawingDate: Date): Promise<PowerballTicketDrawing | null> {
    const powerballTicketDrawingRepository = getConnection().getRepository(PowerballTicketDrawingEntity);
    const powerballTicketDrawing = await powerballTicketDrawingRepository.findOne({
      where: `ticketId = '${ticketId}' AND drawingDate = '${moment(drawingDate).format(dateTimeFormat)}'`
    });
    return powerballTicketDrawing !== undefined ? powerballTicketDrawing : null;
  }

  public async save(powerballTicketDrawing: PowerballTicketDrawing): Promise<PowerballTicketDrawing | null> {
    const powerballTicketDrawingRepository = getConnection().getRepository(PowerballTicketDrawingEntity);
    const savedEntity = await powerballTicketDrawingRepository.save(powerballTicketDrawing);

    return savedEntity !== undefined ? savedEntity : null;
  }
}
