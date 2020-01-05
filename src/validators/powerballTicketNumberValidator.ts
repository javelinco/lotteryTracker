import Joi = require("@hapi/joi");
import { uuidValidator, powerballNumberRange, powerballPowerNumberRange } from "./sharedSchema";
import { powerballTicketNumber } from "../interfaces/powerballTicketNumber";

export class powerballTicketNumberValidator {
    static schema = Joi.object({
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
    })

    public static async validate(powerballTicketNumber: powerballTicketNumber): Promise<Joi.ValidationResult> {
        return this.schema.validate(powerballTicketNumber);
    }
}