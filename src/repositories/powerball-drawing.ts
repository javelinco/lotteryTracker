import { PowerballDrawing } from '../interfaces/powerball-drawing';
import { Entity, PrimaryColumn, Column, getConnection } from 'typeorm';
import * as moment from 'moment';
import { dateTimeFormat } from '../helpers/date-format';

@Entity({ name: 'powerballdrawing' })
export class PowerballDrawingEntity {
  @PrimaryColumn('timestamp', { name: 'drawingdate' })
  public drawingDate!: Date;
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
  @Column({ name: 'multiplier' })
  public multiplier!: number;
  @Column('timestamp', { name: 'createdate' })
  public createDate!: Date;
  @Column('timestamp', { name: 'updatedate' })
  public updateDate!: Date;
}

export class PowerballDrawingRepository {
  public async delete(drawingDate: Date): Promise<boolean> {
    const deleteResult = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(PowerballDrawingEntity)
      .where('drawingDate = :drawingDate', { drawingDate: drawingDate })
      .execute();
    return deleteResult.affected !== undefined && deleteResult.affected !== null && deleteResult.affected > 0;
  }

  public async getLatest(): Promise<PowerballDrawing | null> {
    const powerballDrawingRepository = getConnection().getRepository(PowerballDrawingEntity);
    const powerballDrawing = await powerballDrawingRepository
      .createQueryBuilder()
      .orderBy('drawingdate', 'DESC')
      .getOne();
    return powerballDrawing !== undefined ? powerballDrawing : null;
  }

  public async load(drawingDate: Date): Promise<PowerballDrawing | null> {
    const powerballDrawingRepository = getConnection().getRepository(PowerballDrawingEntity);
    const powerballDrawing = await powerballDrawingRepository.findOne({
      where: `drawingDate = '${moment(drawingDate).format(dateTimeFormat)}'`
    });
    return powerballDrawing !== undefined ? powerballDrawing : null;
  }

  public async save(powerballDrawing: PowerballDrawing): Promise<PowerballDrawing | null> {
    const powerballDrawingRepository = getConnection().getRepository(PowerballDrawingEntity);
    const savedEntity = await powerballDrawingRepository.save(powerballDrawing);

    return savedEntity !== undefined ? savedEntity : null;
  }
}
