import { GetTopHealthRiskClients } from '@core/use-cases/get-top-health-risk-clients';
import { PrismaService } from '@infra/database/prisma/services/prisma-service';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { CreateClient } from '../create-client';
import { PrismaClientRepository } from '@infra/database/prisma/repositories/prisma-client-repository';
import { makeClientRequest } from '@test/factories/client-factory';

describe('GetTopHealthRiskClients Integration', () => {
    let prismaService: PrismaService;
    let clientRepository: PrismaClientRepository;
    let createClient: CreateClient;
    let getTopHealthRiskClients: GetTopHealthRiskClients;
    let client1, client2, client3;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        prismaService = moduleRef.get(PrismaService);
        await prismaService.cleanDatabase();
        clientRepository = new PrismaClientRepository(prismaService);
        createClient = new CreateClient(clientRepository);
        getTopHealthRiskClients = new GetTopHealthRiskClients(clientRepository);

        client1 = makeClientRequest({
            name: 'Ana',
            healthProblems: [{ name: 'asthma', degree: 3 }],
        });
        client2 = makeClientRequest({
            name: 'Bruno',
            healthProblems: [{ name: 'asthma', degree: 4 }],
        });
        client3 = makeClientRequest({
            name: 'Carlos',
            healthProblems: [
                { name: 'asthma', degree: 3 },
                { name: 'diabetes', degree: 2 },
            ],
        });

        await Promise.all([
            createClient.execute(client1),
            createClient.execute(client2),
            createClient.execute(client3),
        ]);
    });

    afterAll(async () => {
        await prismaService.cleanDatabase();
    });

    it('should create three clients and retrieve the top two ordered by health risk', async () => {
        getTopHealthRiskClients.setNumberOfClients(2);

        const topClients = await getTopHealthRiskClients.execute();

        expect(topClients).toHaveLength(2);
        expect(topClients.map((client) => client.getName())).toEqual([
            client3.name,
            client2.name,
        ]);
    });
});
