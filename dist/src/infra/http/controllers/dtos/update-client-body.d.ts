import { HealthProblem } from '@core/entities/health-problem';
export declare class UpdateClientBody {
    name?: string;
    birthDate?: string;
    gender?: string;
    healthProblems?: HealthProblem[];
}
