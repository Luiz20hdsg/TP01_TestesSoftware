import { ClientRepository } from '../repositories/client-repository';
import { HealthProblem } from '../entities/health-problem';
interface UpdateClientRequest {
    name?: string;
    birthDate?: string;
    gender?: string;
    healthProblems?: HealthProblem[];
}
export declare class UpdateClient {
    private readonly clientRepository;
    constructor(clientRepository: ClientRepository);
    execute(id: string, request: UpdateClientRequest): Promise<void>;
}
export {};
