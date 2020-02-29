import { powerballNumber } from './powerballNumber';

export interface drawingNumber extends powerballNumber {
  ticketId: string;
  powerPlay: boolean;
}
