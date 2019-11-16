/// <reference types="hapi__joi" />
import Joi = require("@hapi/joi");
import { powerballNumber } from "../interfaces/powerballNumber";
export declare class powerballNumberValidor {
    validate(powerballNumber: powerballNumber): Promise<Joi.ValidationResult>;
}
