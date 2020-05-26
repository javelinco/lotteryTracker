import { PowerballTicket } from '../interfaces/powerball-ticket';
export declare class PowerballTicketEntity {
    ticketId: string;
    purchaseDate: Date;
    cost: number;
    powerPlay: boolean;
    ownerId: string;
    createDate: Date;
    updateDate: Date;
}
export declare class PowerballTicketRepository {
    delete(ticketId: string): Promise<boolean>;
    load(ticketId: string): Promise<PowerballTicket | null>;
    save(powerballTicket: PowerballTicket): Promise<PowerballTicket | null>;
    private ConvertFromEntity;
}
