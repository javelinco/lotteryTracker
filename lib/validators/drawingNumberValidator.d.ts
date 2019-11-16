/// <reference types="hapi__joi" />
import Joi = require("@hapi/joi");
import { drawingNumber } from "../interfaces/drawingNumber";
export declare class drawingNumberValidor {
    validate(drawingNumber: drawingNumber): Promise<Joi.ValidationResult>;
}
