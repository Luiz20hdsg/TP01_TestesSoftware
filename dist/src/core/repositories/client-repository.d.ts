import { Client } from '../entities/client';
export declare abstract class ClientRepository {
    abstract findAll(): Promise<Client[]>;
    abstract findById(id: string): Promise<Client> | null;
    abstract save(client: Client): Promise<void>;
    abstract update(id: string, clientUpdates: Client): Promise<void>;
    abstract delete(id: string): Promise<void>;
}
