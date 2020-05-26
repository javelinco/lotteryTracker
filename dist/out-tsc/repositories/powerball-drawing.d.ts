import { PowerballDrawing } from '../interfaces/powerball-drawing';
export declare class PowerballDrawingEntity {
    drawingDate: Date;
    number01: number;
    number02: number;
    number03: number;
    number04: number;
    number05: number;
    powerNumber: number;
    multiplier: number;
    createDate: Date;
    updateDate: Date;
}
export declare class PowerballDrawingRepository {
    delete(drawingDate: Date): Promise<boolean>;
    getLatest(): Promise<PowerballDrawing | null>;
    load(drawingDate: Date): Promise<PowerballDrawing | null>;
    save(powerballDrawing: PowerballDrawing): Promise<PowerballDrawing | null>;
}
