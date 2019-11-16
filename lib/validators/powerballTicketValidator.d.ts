/// <reference types="hapi__joi" />
import Joi = require("@hapi/joi");
import { powerballTicket } from "../interfaces/powerballTicket";
export declare class powerballDrawingValidor {
    validate(powerballTicket: powerballTicket): Promise<Joi.ValidationResult>;
}
