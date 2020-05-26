/// <reference types="hapi__joi" />
import Joi = require('@hapi/joi');
import { PowerballDrawing } from '../interfaces/powerball-drawing';
export declare class PowerballDrawingValidator {
    validate(powerballDrawing: PowerballDrawing): Promise<Joi.ValidationResult>;
}
