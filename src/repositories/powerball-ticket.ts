import { powerballTicket } from '../interfaces/powerballTicket';
import { Entity, PrimaryColumn, Column, getConnection } from 'typeorm';

@Entity({ name: 'powerballticket' })
export class PowerballTicketEntity {
  @PrimaryColumn('uuid', { name: 'ticketid' })
  ticketId!: string;
  @Column({ name: 'purchasedate' })
  purchaseDate!: Date;
  @Column('money', { name: 'cost' })
  cost!: number;
  @Column({ name: 'powerplay' })
  powerPlay!: boolean;
  @Column({ name: 'ownerid', nullable: true })
  ownerId!: string;
  @Column('timestamp', { name: 'createdate' })
  createDate!: Date;
  @Column('timestamp', { name: 'updatedate' })
  updateDate!: Date;
}

export class PowerballTicketRepository {
  private ConvertFromEntity(entity: PowerballTicketEntity | undefined): powerballTicket | null {
    if (entity !== undefined) {
      const powerballTicket: powerballTicket = {
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

  public async Delete(ticketId: string): Promise<boolean> {
    const deleteResult = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(PowerballTicketEntity)
      .where('ticketId = :ticketId', { ticketId: ticketId })
      .execute();
    return deleteResult.affected !== undefined && deleteResult.affected !== null && deleteResult.affected > 0;
  }

  public async Load(ticketId: string): Promise<powerballTicket | null> {
    const powerballTicketRepository = getConnection().getRepository(PowerballTicketEntity);
    const loadedEntity = await powerballTicketRepository.findOne({
      where: `ticketId = '${ticketId}'`
    });
    return this.ConvertFromEntity(loadedEntity);
  }

  public async Save(powerballTicket: powerballTicket): Promise<powerballTicket | null> {
    const powerballTicketRepository = getConnection().getRepository(PowerballTicketEntity);
    const savedEntity = await powerballTicketRepository.save(powerballTicket);
    return this.ConvertFromEntity(savedEntity);
  }
}
