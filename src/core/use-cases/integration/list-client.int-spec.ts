import { ListClients } from '@core/use-cases/list-clients';
import { PrismaService } from '@infra/database/prisma/services/prisma-service';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { CreateClient } from '../create-client';
import { PrismaClientRepository } from '@infra/database/prisma/repositories/prisma-client-repository';
import { makeClientRequest } from '@test/factories/client-factory';

describe('ListClient Integration', () => {
    let prismaService: PrismaService;
    let clientRepository: PrismaClientRepository;
    let createClient: CreateClient;
    let listClients: ListClients;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        prismaService = moduleRef.get(PrismaService);
        await prismaService.cleanDatabase();
        clientRepository = new PrismaClientRepository(prismaService);
        createClient = new CreateClient(clientRepository);
        listClients = new ListClients(clientRepository);
    });

    afterEach(async () => {
        await prismaService.cleanDatabase();
    });

    it('should create three clients and retrieve them all', async () => {
        const client1 = makeClientRequest();
        const client2 = makeClientRequest();
        const client3 = makeClientRequest();

        await Promise.all([
            createClient.execute(client1),
            createClient.execute(client2),
            createClient.execute(client3),
        ]);

        const clients = await listClients.execute();

        expect(clients).toHaveLength(3);
    });
});
