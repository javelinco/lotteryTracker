import { PowerballTicketNumber } from '../interfaces/powerball-ticket-number';
export declare class PowerballTicketNumberEntity {
    ticketNumberId: string;
    ticketId: string;
    number01: number;
    number02: number;
    number03: number;
    number04: number;
    number05: number;
    powerNumber: number;
    createDate: Date;
    updateDate: Date;
}
export declare class PowerballTicketNumberRepository {
    delete(ticketId: string): Promise<boolean>;
    load(ticketId: string): Promise<Array<PowerballTicketNumber>>;
    save(powerballTicketNumber: PowerballTicketNumber): Promise<PowerballTicketNumber | null>;
}
