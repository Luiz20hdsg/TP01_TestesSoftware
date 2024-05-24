import { ClientRepository } from '../repositories/client-repository';
import { Client } from '../entities/client';
export declare class GetTopHealthRiskClients {
    private readonly clientRepository;
    private numberOfClients;
    constructor(clientRepository: ClientRepository);
    execute(): Promise<Client[]>;
    setNumberOfClients(numberOfClients: number): void;
}
