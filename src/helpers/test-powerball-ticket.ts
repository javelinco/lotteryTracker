import { powerballTicket } from '../interfaces/powerballticket';
import { v4 as uuidv4 } from 'uuid';

export function CreateTicket(ticketId: string, ownerId: string = uuidv4()): powerballTicket {
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
