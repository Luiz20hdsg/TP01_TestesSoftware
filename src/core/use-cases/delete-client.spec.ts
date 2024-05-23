import { InMemoryClientRepository } from '@test/repositories/in-memory-client-repository';
import { DeleteClient } from './delete-client';
import { makeClient } from '@test/factories/client-factory';
import { ClientNotFoundException } from '@infra/exceptions/client-not-found';

describe('Test for DeleteClient use case', () => {
  let clientRepository;
  let deleteClient;
  let client;
  beforeAll(() => {
    clientRepository = new InMemoryClientRepository();
    deleteClient = new DeleteClient(clientRepository);

    client = makeClient();
    clientRepository.save(client);
  });

  it('should delete the client', async () => {
    const clientId = client.getId();
    await deleteClient.execute(clientId);

    await expect(clientRepository.findById(clientId)).rejects.toThrow(
      ClientNotFoundException,
    );
  });
});
