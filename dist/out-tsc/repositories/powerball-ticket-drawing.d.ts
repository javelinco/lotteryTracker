import { PowerballTicketDrawing } from '../interfaces/powerball-ticket-drawing';
export declare class PowerballTicketDrawingEntity {
    ticketId: string;
    drawingDate: Date;
    createDate: Date;
    updateDate: Date;
}
export declare class PowerballTicketDrawingRepository {
    delete(ticketId: string, drawingDate: Date): Promise<boolean>;
    load(ticketId: string, drawingDate: Date): Promise<PowerballTicketDrawing | null>;
    getAllForTicket(ticketId: string): Promise<Array<PowerballTicketDrawing>>;
    getByDrawingDate(drawingDate: Date): Promise<Array<PowerballTicketDrawing>>;
    save(powerballTicketDrawing: PowerballTicketDrawing): Promise<PowerballTicketDrawing | null>;
}
