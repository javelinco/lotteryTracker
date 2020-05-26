export interface PowerballTicket {
    ticketId: string;
    purchaseDate: Date;
    cost: number;
    powerPlay: boolean;
    ownerId?: string;
    createDate: Date;
    updateDate: Date;
}
