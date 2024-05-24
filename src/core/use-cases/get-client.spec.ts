import { InMemoryClientRepository } from '@test/repositories/in-memory-client-repository';
import { GetClient } from './get-client';
import { ClientNotFoundException } from '@infra/exceptions/client-not-found';
import { makeClient } from '@test/factories/client-factory';
import { makeClient02 } from '@test/factories/client-factory';


describe('Test for GetClient use case', () => {
  let client1, client2, client3;
  let clientRepository;
  let getClient;
  beforeAll(async () => {
    clientRepository = new InMemoryClientRepository();
    getClient = new GetClient(clientRepository);

    client1 = makeClient();
    client2 = makeClient({ name: 'Taylor' });
    client3 = makeClient02();

    await Promise.all([
      clientRepository.save(client1),
      clientRepository.save(client2),
    ]);
  });

  it('should return the correct client', async () => {
    const client = await getClient.execute(client2.getId());

    expect(client).toEqual(client2);
  });

  it('should throw ClientNotFoundException for not found id', async () => {
    await expect(getClient.execute('54495ad94c934721ede76d90')).rejects.toThrow(
      ClientNotFoundException,
    );
  });

  it('should throw ClientNotFoundException for invalid id format', async () => {
    await expect(getClient.execute('some_invalid_id')).rejects.toThrow(
      ClientNotFoundException,
    );
  });

  it('should throw ClientNotFoundException when id is an empty string', async () => {
    const emptyId = '';
    
    await expect(getClient.execute(emptyId)).rejects.toThrow(ClientNotFoundException);
  });
  
  it('should throw ClientNotFoundException for invalid id format', async () => {
    const invalidId = 'some_invalid_id';
    
    await expect(getClient.execute(invalidId)).rejects.toThrow(ClientNotFoundException);
  });

  /*it('should return the correct client by name', async () => {
    const client = await getClient.execute(null, 'Alice'); // Buscar pelo nome 'Alice'

    expect(client).toEqual(client3); // Verificar se o cliente retornado é o mesmo criado com makeClient02
  });*/
  
});
