import { ClientRepository } from '../repositories/client-repository';
import { Client } from '../entities/client';
export declare class GetClient {
    private readonly clientRepository;
    constructor(clientRepository: ClientRepository);
    execute(id: string): Promise<Client> | null;
}
