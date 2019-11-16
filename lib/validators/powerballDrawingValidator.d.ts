/// <reference types="hapi__joi" />
import Joi = require("@hapi/joi");
import { powerballDrawing } from "../interfaces/powerballDrawing";
export declare class powerballDrawingValidor {
    validate(powerballDrawing: powerballDrawing): Promise<Joi.ValidationResult>;
}
