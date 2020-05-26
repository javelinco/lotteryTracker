import { getConnection, Entity, PrimaryColumn, Column } from 'typeorm';
import { OwnerWinning } from '../interfaces/owner-winning';
import * as moment from 'moment';
import { dateTimeFormat } from '../helpers/date-format';

@Entity({ name: 'ownerwinning' })
export class OwnerWinningEntity {
  @PrimaryColumn('uuid', { name: 'ticketid' })
  public ticketId!: string;
  @PrimaryColumn('timestamp', { name: 'drawingdate' })
  public drawingDate!: Date;
  @Column('money', { name: 'amount' })
  public amount!: number;
  @Column('timestamp', { name: 'createdate' })
  public createDate!: Date;
  @Column('timestamp', { name: 'updatedate' })
  public updateDate!: Date;
}

export class OwnerWinningRepository {
  public async delete(ticketId: string, drawingDate: Date): Promise<boolean> {
    const deleteResult = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(OwnerWinningEntity)
      .where('ticketId = :ticketId', { ticketId: ticketId })
      .andWhere('drawingDate = :drawingDate', { drawingDate: drawingDate })
      .execute();
    return deleteResult.affected !== undefined && deleteResult.affected !== null && deleteResult.affected > 0;
  }

  public async load(ticketId: string, drawingDate: Date): Promise<OwnerWinning | null> {
    const ownerWinningRepository = getConnection().getRepository(OwnerWinningEntity);
    const loadedEntity = await ownerWinningRepository.findOne({
      where: `ticketId = '${ticketId}' AND drawingDate = '${moment(drawingDate).format(dateTimeFormat)}'`
    });
    return this.ConvertFromEntity(loadedEntity);
  }

  public async getAllForTicket(ticketId: string): Promise<Array<OwnerWinning>> {
    const ownerWinningRepository = getConnection().getRepository(OwnerWinningEntity);
    const loadedEntities = await ownerWinningRepository.find({
      where: `ticketId = '${ticketId}'`
    });
    const convertedEntities = (loadedEntities.map(x => this.ConvertFromEntity(x)).filter(x => x !== null) as unknown) as Array<
      OwnerWinning
    >;
    return convertedEntities;
  }

  public async save(ownerWinning: OwnerWinning): Promise<OwnerWinning | null> {
    const ownerWinningRepository = getConnection().getRepository(OwnerWinningEntity);
    const savedEntity = await ownerWinningRepository.save(ownerWinning);
    return this.ConvertFromEntity(savedEntity);
  }

  private ConvertFromEntity(entity: OwnerWinningEntity | undefined): OwnerWinning | null {
    if (entity !== undefined) {
      const ownerWinning: OwnerWinning = {
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
}
