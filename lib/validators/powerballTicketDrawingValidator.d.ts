/// <reference types="hapi__joi" />
import Joi = require("@hapi/joi");
import { powerballTicketDrawing } from "../interfaces/powerballTicketDrawing";
export declare class powerballTicketPurchaseValidor {
    validate(powerballTicketDrawing: powerballTicketDrawing): Promise<Joi.ValidationResult>;
}
