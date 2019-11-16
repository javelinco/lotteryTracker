import Joi = require("@hapi/joi");
import { powerballNumber } from "../interfaces/powerballNumber";
import { powerballNumberRange, powerballPowerNumberRange } from "./sharedSchema";

export class powerballNumberValidor {
    public async validate(powerballNumber: powerballNumber): Promise<Joi.ValidationResult> {
        const schema = Joi.object({
            number01: powerballNumberRange.required(),
            number02: powerballNumberRange.required(),
            number03: powerballNumberRange.required(),
            number04: powerballNumberRange.required(),
            number05: powerballNumberRange.required(),
            powerNumber: powerballPowerNumberRange.required()
        });

        return schema.validate(powerballNumber);
    }
}