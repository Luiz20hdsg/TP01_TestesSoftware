import { DeleteClient } from './../delete-client';
import { GetClient } from './../get-client';
import { PrismaService } from '@infra/database/prisma/services/prisma-service';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { CreateClient } from '../create-client';
import { PrismaClientRepository } from '@infra/database/prisma/repositories/prisma-client-repository';
import { ClientNotFoundException } from '@infra/exceptions/client-not-found';

describe('DeleteClient Integration', () => {
    let prismaService: PrismaService;
    let clientRepository: PrismaClientRepository;
    let createClient: CreateClient;
    let deleteClient: DeleteClient;
    let getClient: GetClient;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        prismaService = moduleRef.get(PrismaService);
        await prismaService.cleanDatabase();
        clientRepository = new PrismaClientRepository(prismaService);
        createClient = new CreateClient(clientRepository);
        deleteClient = new DeleteClient(clientRepository);
        getClient = new GetClient(clientRepository);
    });

    afterEach(async () => {
        await prismaService.cleanDatabase();
    });

    it('should delete a client and throw error when searching for its id', async () => {
        const newClient = {
            name: 'John',
            birthDate: '1990-01-01',
            gender: 'M',
            healthProblems: [],
        };

        const clientId = await createClient.execute(newClient);

        await deleteClient.execute(clientId);

        await expect(getClient.execute(clientId)).rejects.toThrowError(
            ClientNotFoundException
        );
    });
});
