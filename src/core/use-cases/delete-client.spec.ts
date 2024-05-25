import { InMemoryClientRepository } from '@test/repositories/in-memory-client-repository';
import { DeleteClient } from './delete-client';
import { makeClient } from '@test/factories/client-factory';
import { ClientNotFoundException } from '@infra/exceptions/client-not-found';

describe('Test for DeleteClient use case', () => {
  let clientRepository: InMemoryClientRepository;
  let deleteClient: DeleteClient;
  let clients;
  let client;


  beforeEach(() => {
    clientRepository = new InMemoryClientRepository();
    deleteClient = new DeleteClient(clientRepository);
    client = makeClient();
    clients = [
      makeClient(),
      makeClient(),
      makeClient()
    ];
    clients.forEach(client => clientRepository.save(client));
    clientRepository.save(client);
  });

  it('should delete the client', async () => {
    const clientId = client.getId();
    await deleteClient.execute(clientId);

    await expect(clientRepository.findById(clientId)).rejects.toThrow(ClientNotFoundException);
  });

  it('should throw an error if the client does not exist', async () => {
    const nonExistentClientId = 'non_existent_client_id';

    await expect(deleteClient.execute(nonExistentClientId)).rejects.toThrow(ClientNotFoundException);
  });

  it('should throw an error if trying to delete a non-existent client', async () => {
    const nonExistentClientId = 'non_existent_client_id';

    await expect(deleteClient.execute(nonExistentClientId)).rejects.toThrow(ClientNotFoundException);
  });

  it('should not affect the repository if trying to delete a non-existent client', async () => {
    const nonExistentClientId = 'non_existent_client_id';

    await expect(deleteClient.execute(nonExistentClientId)).rejects.toThrow(ClientNotFoundException);

    for (const client of clients) {
      expect(await clientRepository.findById(client.getId())).toEqual(client);
    }
  });

  it('should throw an error when deleting a client with an invalid ID format', async () => {
    const invalidClientId = 'invalid_client_id';
  
    await expect(deleteClient.execute(invalidClientId)).rejects.toThrow(ClientNotFoundException);
  });

  it('should throw an error when trying to delete a client with a null ID', async () => {
    await expect(deleteClient.execute(null)).rejects.toThrow(ClientNotFoundException);
  });
  
});
