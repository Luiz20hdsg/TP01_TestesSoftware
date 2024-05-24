import { ClientRepository } from '../repositories/client-repository';
import { HealthProblem } from '../entities/health-problem';
interface CreateClientRequest {
    name: string;
    birthDate: string;
    gender: string;
    healthProblems: HealthProblem[];
}
export declare class CreateClient {
    private readonly clientRepository;
    constructor(clientRepository: ClientRepository);
    execute(request: CreateClientRequest): Promise<void>;
}
export {};
