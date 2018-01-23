// @flow
import ValidationError from "./../validationError";

/**
 * @name gt
 * @description "Greater than" validator. This validator checks if the given values is greater than the `min` value.
 * @param {any} value This is the value that will be validated.
 * @param {any} min This is the value to validate against. It is passed as a validator parameter: `gt:valueToCompareAgainst`
 * @throws {ValidationError}
 * @example
 * import { validation } from 'webiny-validation';
 * validation.validate(10, 'gt:100').then(() => {
 *  // Valid
 * }).catch(e => {
 *  // Invalid
 * });
 */
export default (value: number, min: number) => {
    if (!value) return;

    if (parseFloat(value) > parseFloat(min)) {
        return true;
    }
    throw new ValidationError("Value needs to be greater than " + min + ".");
};
