/// <reference types="hapi__joi" />
import Joi = require("@hapi/joi");
import { powerballTicketNumber } from "../interfaces/powerballTicketNumber";
export declare class powerballTicketPurchaseValidor {
    validate(powerballTicketNumber: powerballTicketNumber): Promise<Joi.ValidationResult>;
}
