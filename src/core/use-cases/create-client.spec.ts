import { InMemoryClientRepository } from '@test/repositories/in-memory-client-repository';
import { CreateClient } from './create-client';
import { makeClient } from '@test/factories/client-factory';

describe('Test for CreateClient use case', () => {
  let clientRepository;
  let createClient;
  beforeAll(async () => {
    clientRepository = new InMemoryClientRepository();
    createClient = new CreateClient(clientRepository);
  });

  it('should save a new Client on the database', async () => {
    const newClient = makeClient();

    await createClient.execute(newClient);

    const clientFound = await clientRepository.findAll();

    expect(clientFound).toBeTruthy();
  });
});
