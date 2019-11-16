import { powerballNumber } from './interfaces/powerballNumber';
import { ownerWinning } from './interfaces/ownerWinning';
import { powerballDrawing } from './interfaces/powerballDrawing';
import { drawingNumber } from './interfaces/drawingNumber';
export declare type recordDrawingFunc = (drawing: powerballDrawing) => Promise<void>;
export declare type getDrawingNumbersFunc = (drawingDate: Date) => Promise<Array<drawingNumber>>;
export declare type recordWinningsFunc = (winning: ownerWinning) => Promise<void>;
export declare function AddPowerBallDrawing(drawingDate: Date, number: powerballNumber, multiplier: number, grandPrizeAmount: number, getDrawingNumbersFunc?: getDrawingNumbersFunc, recordDrawingFunc?: recordDrawingFunc, recordWinningsFunc?: recordWinningsFunc): Promise<Array<ownerWinning>>;
