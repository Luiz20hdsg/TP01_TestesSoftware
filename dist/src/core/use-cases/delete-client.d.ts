import { ClientRepository } from '@core/repositories/client-repository';
export declare class DeleteClient {
    private readonly clientRepository;
    constructor(clientRepository: ClientRepository);
    execute(id: string): Promise<void>;
}
