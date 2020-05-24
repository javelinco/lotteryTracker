import { powerballDrawing } from '../interfaces/powerballDrawing';
import { Entity, PrimaryColumn, Column, getConnection } from 'typeorm';
import * as moment from 'moment';
import { dateTimeFormat } from '../helpers/dateFormat';

@Entity({ name: 'powerballdrawing' })
export class PowerballDrawingEntity {
  @PrimaryColumn('timestamp', { name: 'drawingdate' })
  drawingDate!: Date;
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

export class PowerballDrawingRepository {
  public async Delete(drawingDate: Date): Promise<boolean> {
    const deleteResult = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(PowerballDrawingEntity)
      .where('drawingDate = :drawingDate', { drawingDate: drawingDate })
      .execute();
    return deleteResult.affected !== undefined && deleteResult.affected !== null && deleteResult.affected > 0;
  }

  public async GetLatest(): Promise<powerballDrawing | null> {
    const powerballDrawingRepository = getConnection().getRepository(PowerballDrawingEntity);
    const powerballDrawing = await powerballDrawingRepository
      .createQueryBuilder()
      .orderBy('drawingdate', 'DESC')
      .getOne();
    return powerballDrawing !== undefined ? powerballDrawing : null;
  }

  public async Load(drawingDate: Date): Promise<powerballDrawing | null> {
    const powerballDrawingRepository = getConnection().getRepository(PowerballDrawingEntity);
    const powerballDrawing = await powerballDrawingRepository.findOne({
      where: `drawingDate = '${moment(drawingDate).format(dateTimeFormat)}'`
    });
    return powerballDrawing !== undefined ? powerballDrawing : null;
  }

  public async Save(powerballDrawing: powerballDrawing): Promise<powerballDrawing | null> {
    const powerballDrawingRepository = getConnection().getRepository(PowerballDrawingEntity);
    const savedEntity = await powerballDrawingRepository.save(powerballDrawing);

    return savedEntity !== undefined ? savedEntity : null;
  }
}
