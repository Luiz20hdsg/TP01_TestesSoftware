import { InMemoryClientRepository } from '@test/repositories/in-memory-client-repository';
import { ListClients } from './list-clients';
import { makeClient } from '@test/factories/client-factory';

describe('Test for ListClients use case', () => {
  let clientRepository;
  let listClients;

  beforeAll(() => {
    clientRepository = new InMemoryClientRepository();
    listClients = new ListClients(clientRepository);
  });

  it('should return all clients', async () => {
    const client1 = makeClient();
    const client2 = makeClient();

    Promise.all([
      clientRepository.save(client1),
      clientRepository.save(client2),
    ]);

    const clients = await listClients.execute();

    expect(clients).toEqual(
      expect.arrayContaining([
        expect.objectContaining(client1),
        expect.objectContaining(client2),
      ]),
    );
  });
});
