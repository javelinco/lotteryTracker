import { PowerballTicket } from '../interfaces/powerball-ticket';
import { Entity, PrimaryColumn, Column, getConnection } from 'typeorm';

@Entity({ name: 'powerballticket' })
export class PowerballTicketEntity {
  @PrimaryColumn('uuid', { name: 'ticketid' })
  public ticketId!: string;
  @Column({ name: 'purchasedate' })
  public purchaseDate!: Date;
  @Column('money', { name: 'cost' })
  public cost!: number;
  @Column({ name: 'powerplay' })
  public powerPlay!: boolean;
  @Column({ name: 'ownerid', nullable: true })
  public ownerId!: string;
  @Column('timestamp', { name: 'createdate' })
  public createDate!: Date;
  @Column('timestamp', { name: 'updatedate' })
  public updateDate!: Date;
}

export class PowerballTicketRepository {
  public async delete(ticketId: string): Promise<boolean> {
    const deleteResult = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(PowerballTicketEntity)
      .where('ticketId = :ticketId', { ticketId: ticketId })
      .execute();
    return deleteResult.affected !== undefined && deleteResult.affected !== null && deleteResult.affected > 0;
  }

  public async load(ticketId: string): Promise<PowerballTicket | null> {
    const powerballTicketRepository = getConnection().getRepository(PowerballTicketEntity);
    const loadedEntity = await powerballTicketRepository.findOne({
      where: `ticketId = '${ticketId}'`
    });
    return this.ConvertFromEntity(loadedEntity);
  }

  public async save(powerballTicket: PowerballTicket): Promise<PowerballTicket | null> {
    const powerballTicketRepository = getConnection().getRepository(PowerballTicketEntity);
    const savedEntity = await powerballTicketRepository.save(powerballTicket);
    return this.ConvertFromEntity(savedEntity);
  }

  private ConvertFromEntity(entity: PowerballTicketEntity | undefined): PowerballTicket | null {
    if (entity !== undefined) {
      const powerballTicket: PowerballTicket = {
        ticketId: entity.ticketId,
        purchaseDate: entity.purchaseDate,
        cost: +`${entity.cost.toString().replace('$', '')}`,
        powerPlay: entity.powerPlay,
        ownerId: entity.ownerId,
        createDate: entity.createDate,
        updateDate: entity.updateDate
      };
      return powerballTicket;
    }
    return null;
  }
}
