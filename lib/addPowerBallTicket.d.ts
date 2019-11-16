import { powerballNumber } from "./interfaces/powerballNumber";
import { powerballTicketPurchase } from "./interfaces/powerballTicketPurchase";
export declare type databaseSaveFunc = (purchase: powerballTicketPurchase) => Promise<void>;
export declare function AddPowerballTicket(purchaseDate: Date, powerPlay: boolean, numbers: Array<powerballNumber>, drawings: number, databaseSave?: databaseSaveFunc): Promise<powerballTicketPurchase>;
