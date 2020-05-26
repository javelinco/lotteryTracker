/// <reference types="hapi__joi" />
import Joi = require('@hapi/joi');
import { OwnerWinning } from '../interfaces/owner-winning';
export declare class OwnerWinningValidator {
    validate(ownerWinning: OwnerWinning): Promise<Joi.ValidationResult>;
}
