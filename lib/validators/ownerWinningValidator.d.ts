/// <reference types="hapi__joi" />
import Joi = require("@hapi/joi");
import { ownerWinning } from "../interfaces/ownerWinning";
export declare class ownerWinningValidor {
    validate(ownerWinning: ownerWinning): Promise<Joi.ValidationResult>;
}
