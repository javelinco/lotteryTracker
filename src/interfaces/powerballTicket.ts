export interface powerballTicket {
  ticketId: string;
  purchaseDate: Date;
  cost: number;
  powerPlay: boolean;
  ownerId?: string;
  createDate: Date;
  updateDate: Date;
}
