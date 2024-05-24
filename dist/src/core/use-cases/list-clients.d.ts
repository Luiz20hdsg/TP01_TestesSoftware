import { ClientRepository } from '../repositories/client-repository';
import { Client } from '../entities/client';
export declare class ListClients {
    private readonly clientRepository;
    constructor(clientRepository: ClientRepository);
    execute(): Promise<Client[]>;
}
