import { OwnerWinning } from './owner-winning';
import { PowerballTicketPurchase } from './powerball-ticket-purchase';

export interface PowerballTicketReport extends PowerballTicketPurchase {
  winnings: Array<OwnerWinning>;
}
