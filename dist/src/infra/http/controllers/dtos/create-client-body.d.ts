import { HealthProblem } from '@core/entities/health-problem';
export declare class CreateClientBody {
    name: string;
    birthDate: string;
    gender: string;
    healthProblems: HealthProblem[];
}
