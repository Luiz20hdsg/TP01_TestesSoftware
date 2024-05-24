import { ClientRepository } from '@core/repositories/client-repository';
import { PrismaService } from '../services/prisma-service';
import { Client } from '@core/entities/client';
export declare class PrismaClientRepository implements ClientRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findAll(): Promise<Client[]>;
    findById(id: string): Promise<Client> | null;
    save(client: Client): Promise<void>;
    update(id: string, clientUpdates: Client): Promise<void>;
    delete(id: string): Promise<void>;
}
