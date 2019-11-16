import Joi = require("@hapi/joi");
import { uuidValidator, powerballNumberRange, powerballPowerNumberRange } from "./sharedSchema";
import { powerballTicketPurchase } from "../interfaces/powerballTicketPurchase";

export class powerballTicketPurchaseValidor {
    public async validate(powerballTicketPurchase: powerballTicketPurchase): Promise<Joi.ValidationResult> {
        const schema = Joi.object({
            ticketId: uuidValidator.required(),
            numbers: Joi.array().items(Joi.object({
                ticketNumberId: uuidValidator.required(),
                ticketId: uuidValidator.required(),
                number01: powerballNumberRange.required(),
                number02: powerballNumberRange.required(),
                number03: powerballNumberRange.required(),
                number04: powerballNumberRange.required(),
                number05: powerballNumberRange.required(),
                powerNumber: powerballPowerNumberRange.required(),
                createDate: Joi.date().required(),
                updateDate: Joi.date().required()
            })).required(),
            drawings: Joi.array().items(Joi.object({
                ticketId: uuidValidator.required(),
                drawingDate: Joi.date().required(),
                createDate: Joi.date().required(),
                updateDate: Joi.date().required()
            }))
        });

        return schema.validate(powerballTicketPurchase);
    }
}