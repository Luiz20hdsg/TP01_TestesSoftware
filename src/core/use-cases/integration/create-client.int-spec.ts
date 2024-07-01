import { GetClient } from './../get-client';
import { PrismaService } from '@infra/database/prisma/services/prisma-service';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { CreateClient } from '../create-client';
import { PrismaClientRepository } from '@infra/database/prisma/repositories/prisma-client-repository';
import { makeClientRequest } from '@test/factories/client-factory';

describe('CreateClient Integration', () => {
    let prismaService: PrismaService;
    let clientRepository: PrismaClientRepository;
    let createClient: CreateClient;
    let getClient: GetClient;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        prismaService = moduleRef.get(PrismaService);
        await prismaService.cleanDatabase();
        clientRepository = new PrismaClientRepository(prismaService);
        createClient = new CreateClient(clientRepository);
        getClient = new GetClient(clientRepository);
    });

    afterEach(async () => {
        await prismaService.cleanDatabase();
    });

    it('should create a client and retrieve it', async () => {
        const newClient = makeClientRequest({
            name: 'John',
            birthDate: '1990-01-01',
            gender: 'M',
            healthProblems: [
                {
                    name: 'Cancer',
                    degree: 8,
                },
            ],
        });

        const clientId = await createClient.execute(newClient);

        const createdClient = await getClient.execute(clientId);

        expect(createdClient.getName()).toEqual(newClient.name);
        expect(createdClient.getBirthDate()).toEqual(
            new Date(newClient.birthDate)
        );
        expect(createdClient.getGender()).toEqual(newClient.gender);
        expect(createdClient.getHealthProblems()).toEqual(
            newClient.healthProblems
        );
    });
});
