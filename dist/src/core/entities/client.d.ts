import { Replace } from 'src/helpers/replace';
import { HealthProblem } from './health-problem';
export interface ClientProperties {
    id?: string;
    name: string;
    birthDate: Date;
    gender: string;
    healthProblems: HealthProblem[];
    score?: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare class Client {
    private properties;
    constructor(properties: Replace<ClientProperties, {
        createdAt?: Date;
        updatedAt?: Date;
    }>);
    private updateScore;
    private sumOfHealthProblemsDegrees;
    updatePropertiesFrom(source: Client): void;
    getScore(): number;
    getId(): string;
    setId(id: string): void;
    getName(): string;
    setName(name: string): void;
    getBirthDate(): Date;
    setBirthDate(birthDate: Date): void;
    getGender(): string;
    setGender(gender: string): void;
    getHealthProblems(): HealthProblem[];
    setHealthProblems(healthProblems: HealthProblem[]): void;
    getCreatedAt(): Date;
    setCreatedAt(createdAt: Date): void;
    getUpdatedAt(): Date;
    setUpdatedAt(updatedAt: Date): void;
}
