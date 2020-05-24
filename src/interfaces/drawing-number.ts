import { PowerballNumber } from './powerball-number';

export interface DrawingNumber extends PowerballNumber {
  ticketId: string;
  powerPlay: boolean;
}
