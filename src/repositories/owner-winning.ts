import { getConnection, Entity, PrimaryColumn, Column } from 'typeorm';
import { ownerWinning } from '../interfaces/ownerwinning';
import * as moment from 'moment';
import { dateTimeFormat } from '../helpers/dateFormat';

@Entity({ name: 'ownerwinning' })
export class OwnerWinningEntity {
  @PrimaryColumn('uuid', { name: 'ticketid' })
  ticketId!: string;
  @PrimaryColumn('timestamp', { name: 'drawingdate' })
  drawingDate!: Date;
  @Column('money', { name: 'amount' })
  amount!: number;
  @Column('timestamp', { name: 'createdate' })
  createDate!: Date;
  @Column('timestamp', { name: 'updatedate' })
  updateDate!: Date;
}

export class OwnerWinningRepository {
  ConvertFromEntity(entity: OwnerWinningEntity | undefined): ownerWinning | null {
    if (entity !== undefined) {
      const ownerWinning: ownerWinning = {
        ticketId: entity.ticketId,
        drawingDate: entity.drawingDate,
        amount: +`${entity.amount.toString().replace('$', '')}`,
        createDate: entity.createDate,
        updateDate: entity.updateDate
      };
      return ownerWinning;
    }
    return null;
  }

  public async Delete(ticketId: string, drawingDate: Date): Promise<boolean> {
    const deleteResult = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(OwnerWinningEntity)
      .where('ticketId = :ticketId', { ticketId: ticketId })
      .andWhere('drawingDate = :drawingDate', { drawingDate: drawingDate })
      .execute();
    return deleteResult.affected !== undefined && deleteResult.affected !== null && deleteResult.affected > 0;
  }

  public async Load(ticketId: string, drawingDate: Date): Promise<ownerWinning | null> {
    const ownerWinningRepository = getConnection().getRepository(OwnerWinningEntity);
    const loadedEntity = await ownerWinningRepository.findOne({
      where: `ticketId = '${ticketId}' AND drawingDate = '${moment(drawingDate).format(dateTimeFormat)}'`
    });
    return this.ConvertFromEntity(loadedEntity);
  }

  public async Save(ownerWinning: ownerWinning): Promise<ownerWinning | null> {
    const ownerWinningRepository = getConnection().getRepository(OwnerWinningEntity);
    const savedEntity = await ownerWinningRepository.save(ownerWinning);
    return this.ConvertFromEntity(savedEntity);
  }
}
