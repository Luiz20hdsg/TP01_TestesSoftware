import { ValidatorConstraintInterface } from 'class-validator';
export declare class HealthProblemValidator implements ValidatorConstraintInterface {
    validate(obj: object): boolean;
    defaultMessage(): string;
}
