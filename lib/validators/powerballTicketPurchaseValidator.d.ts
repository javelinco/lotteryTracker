/// <reference types="hapi__joi" />
import Joi = require("@hapi/joi");
import { powerballTicketPurchase } from "../interfaces/powerballTicketPurchase";
export declare class powerballTicketPurchaseValidor {
    validate(powerballTicketPurchase: powerballTicketPurchase): Promise<Joi.ValidationResult>;
}
