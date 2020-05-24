import { getConnection, Entity, PrimaryColumn, Column } from 'typeorm';
import { PowerballTicketNumber } from '../interfaces/powerball-ticket-number';

@Entity({ name: 'powerballticketnumber' })
export class PowerballTicketNumberEntity {
  @PrimaryColumn('uuid', { name: 'ticketnumberid' })
  public ticketNumberId!: string;
  @Column({ name: 'ticketid' })
  public ticketId!: string;
  @Column({ name: 'number01' })
  public number01!: number;
  @Column({ name: 'number02' })
  public number02!: number;
  @Column({ name: 'number03' })
  public number03!: number;
  @Column({ name: 'number04' })
  public number04!: number;
  @Column({ name: 'number05' })
  public number05!: number;
  @Column({ name: 'powernumber' })
  public powerNumber!: number;
  @Column('timestamp', { name: 'createdate' })
  public createDate!: Date;
  @Column('timestamp', { name: 'updatedate' })
  public updateDate!: Date;
}

export class PowerballTicketNumberRepository {
  public async delete(ticketId: string): Promise<boolean> {
    const deleteResult = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(PowerballTicketNumberEntity)
      .where('ticketId = :ticketId', { ticketId: ticketId })
      .execute();
    return deleteResult.affected !== undefined && deleteResult.affected !== null && deleteResult.affected > 0;
  }

  public async load(ticketId: string): Promise<Array<PowerballTicketNumber>> {
    const powerballTicketRepository = getConnection().getRepository(PowerballTicketNumberEntity);
    const powerballTicketNumbers = await powerballTicketRepository.find({
      where: `ticketId = '${ticketId}'`
    });
    return powerballTicketNumbers !== undefined ? powerballTicketNumbers : [];
  }

  public async save(powerballTicketNumber: PowerballTicketNumber): Promise<PowerballTicketNumber | null> {
    const powerballTicketNumberRepository = getConnection().getRepository(PowerballTicketNumberEntity);
    const savedEntity = await powerballTicketNumberRepository.save(powerballTicketNumber);

    return savedEntity !== undefined ? savedEntity : null;
  }
}
