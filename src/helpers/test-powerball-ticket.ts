import { PowerballTicket } from '../interfaces/powerball-ticket';
import { v4 as uuidv4 } from 'uuid';

export function createTicket(ticketId: string, ownerId: string = uuidv4()): PowerballTicket {
  return {
    ticketId: ticketId,
    purchaseDate: new Date('1/1/2000'),
    cost: 100.0,
    powerPlay: true,
    ownerId: ownerId,
    createDate: new Date('1/1/2000'),
    updateDate: new Date('1/1/2000')
  };
}
