import { getConnection, Entity, PrimaryColumn, Column } from 'typeorm';
import { powerballTicketNumber } from '../interfaces/powerballticketnumber';

@Entity({ name: 'powerballticketnumber' })
export class PowerballTicketNumberEntity {
  @PrimaryColumn('uuid', { name: 'ticketnumberid' })
  ticketNumberId!: string;
  @Column({ name: 'ticketid' })
  ticketId!: string;
  @Column({ name: 'number01' })
  number01!: number;
  @Column({ name: 'number02' })
  number02!: number;
  @Column({ name: 'number03' })
  number03!: number;
  @Column({ name: 'number04' })
  number04!: number;
  @Column({ name: 'number05' })
  number05!: number;
  @Column({ name: 'powernumber' })
  powerNumber!: number;
  @Column('timestamp', { name: 'createdate' })
  createDate!: Date;
  @Column('timestamp', { name: 'updatedate' })
  updateDate!: Date;
}

export class PowerballTicketNumberRepository {
  public async Delete(ticketId: string): Promise<boolean> {
    const deleteResult = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(PowerballTicketNumberEntity)
      .where('ticketId = :ticketId', { ticketId: ticketId })
      .execute();
    return deleteResult.affected !== undefined && deleteResult.affected !== null && deleteResult.affected > 0;
  }

  public async Load(ticketId: string): Promise<powerballTicketNumber[] | null> {
    const powerballTicketRepository = getConnection().getRepository(PowerballTicketNumberEntity);
    const powerballTicketNumbers = await powerballTicketRepository.find({
      where: `ticketId = '${ticketId}'`
    });
    return powerballTicketNumbers !== undefined ? powerballTicketNumbers : null;
  }

  public async Save(powerballTicketNumber: powerballTicketNumber): Promise<powerballTicketNumber | null> {
    const powerballTicketNumberRepository = getConnection().getRepository(PowerballTicketNumberEntity);
    const savedEntity = await powerballTicketNumberRepository.save(powerballTicketNumber);

    return savedEntity !== undefined ? savedEntity : null;
  }
}
