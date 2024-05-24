import { GetClient } from '@core/use-cases/get-client';
import { ListClients } from '@core/use-cases/list-clients';
import { CreateClientBody } from './dtos/create-client-body';
import { CreateClient } from '@core/use-cases/create-client';
import { UpdateClientBody } from './dtos/update-client-body';
import { UpdateClient } from '@core/use-cases/update-client';
import { GetTopHealthRiskClients } from '@core/use-cases/get-top-health-risk-clients';
import { DeleteClient } from '@core/use-cases/delete-client';
export declare class ClientController {
    private readonly listClients;
    private readonly getClient;
    private readonly createClient;
    private readonly updateClient;
    private readonly getTopHealthRiskClients;
    private readonly deleteClient;
    constructor(listClients: ListClients, getClient: GetClient, createClient: CreateClient, updateClient: UpdateClient, getTopHealthRiskClients: GetTopHealthRiskClients, deleteClient: DeleteClient);
    getAllClients(): Promise<import("../../../core/entities/client").Client[]>;
    getTopRiskClients(): Promise<import("../../../core/entities/client").Client[]>;
    getClientById(id: string): Promise<import("../../../core/entities/client").Client>;
    create(body: CreateClientBody): Promise<void>;
    update(id: string, body: UpdateClientBody): Promise<void>;
    remove(id: string): Promise<void>;
}
