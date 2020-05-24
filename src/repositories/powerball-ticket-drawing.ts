import { getConnection, Entity, PrimaryColumn, Column } from 'typeorm';
import { powerballTicketDrawing } from '../interfaces/powerballticketdrawing';
import * as moment from 'moment';
import { dateTimeFormat } from '../helpers/dateFormat';

@Entity({ name: 'powerballticketdrawing' })
export class PowerballTicketDrawingEntity {
  @PrimaryColumn('uuid', { name: 'ticketid' })
  ticketId!: string;
  @PrimaryColumn('timestamp', { name: 'drawingdate' })
  drawingDate!: Date;
  @Column('timestamp', { name: 'createdate' })
  createDate!: Date;
  @Column('timestamp', { name: 'updatedate' })
  updateDate!: Date;
}

export class PowerballTicketDrawingRepository {
  public async Delete(ticketId: string, drawingDate: Date): Promise<boolean> {
    const deleteResult = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(PowerballTicketDrawingEntity)
      .where('ticketId = :ticketId', { ticketId: ticketId })
      .andWhere('drawingDate = :drawingDate', { drawingDate: drawingDate })
      .execute();
    return deleteResult.affected !== undefined && deleteResult.affected !== null && deleteResult.affected > 0;
  }

  public async Load(ticketId: string, drawingDate: Date): Promise<powerballTicketDrawing | null> {
    const powerballTicketDrawingRepository = getConnection().getRepository(PowerballTicketDrawingEntity);
    const powerballTicketDrawing = await powerballTicketDrawingRepository.findOne({
      where: `ticketId = '${ticketId}' AND drawingDate = '${moment(drawingDate).format(dateTimeFormat)}'`
    });
    return powerballTicketDrawing !== undefined ? powerballTicketDrawing : null;
  }

  public async Save(powerballTicketDrawing: powerballTicketDrawing): Promise<powerballTicketDrawing | null> {
    const powerballTicketDrawingRepository = getConnection().getRepository(PowerballTicketDrawingEntity);
    const savedEntity = await powerballTicketDrawingRepository.save(powerballTicketDrawing);

    return savedEntity !== undefined ? savedEntity : null;
  }
}
