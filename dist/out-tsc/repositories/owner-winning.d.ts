import { OwnerWinning } from '../interfaces/owner-winning';
export declare class OwnerWinningEntity {
    ticketId: string;
    drawingDate: Date;
    amount: number;
    createDate: Date;
    updateDate: Date;
}
export declare class OwnerWinningRepository {
    delete(ticketId: string, drawingDate: Date): Promise<boolean>;
    load(ticketId: string, drawingDate: Date): Promise<OwnerWinning | null>;
    getAllForTicket(ticketId: string): Promise<Array<OwnerWinning>>;
    save(ownerWinning: OwnerWinning): Promise<OwnerWinning | null>;
    private ConvertFromEntity;
}
