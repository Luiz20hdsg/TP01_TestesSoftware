import { PrismaService } from '@infra/database/prisma/services/prisma-service';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { CreateClient } from '../create-client';
import { PrismaClientRepository } from '@infra/database/prisma/repositories/prisma-client-repository';
import { makeClientRequest } from '@test/factories/client-factory';
import { UpdateClient } from '../update-client';
import { GetClient } from '../get-client';

describe('Update Integration', () => {
    let prismaService: PrismaService;
    let clientRepository: PrismaClientRepository;
    let createClient: CreateClient;
    let getClient: GetClient;
    let updateClient: UpdateClient;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        prismaService = moduleRef.get(PrismaService);
        await prismaService.cleanDatabase();
        clientRepository = new PrismaClientRepository(prismaService);
        createClient = new CreateClient(clientRepository);
        getClient = new GetClient(clientRepository);
        updateClient = new UpdateClient(clientRepository);
    });

    afterEach(async () => {
        await prismaService.cleanDatabase();
    });

    it('should create a client and update its health problems', async () => {
        const clientId = await createClient.execute(makeClientRequest());

        await updateClient.execute(clientId, {
            healthProblems: [{ name: 'cirrhosis', degree: 8 }],
        });

        const updatedClient = await getClient.execute(clientId);

        expect(updatedClient.getHealthProblems()).toEqual([
            { name: 'cirrhosis', degree: 8 },
        ]);
    });
});
