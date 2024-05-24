import { InMemoryClientRepository } from '@test/repositories/in-memory-client-repository';
import { GetClient } from './get-client';
import { ClientNotFoundException } from '@infra/exceptions/client-not-found';
import { makeClient } from '@test/factories/client-factory';

describe('Test for GetClient use case', () => {
  let client1, client2;
  let clientRepository;
  let getClient;
  beforeAll(async () => {
    clientRepository = new InMemoryClientRepository();
    getClient = new GetClient(clientRepository);

    client1 = makeClient();
    client2 = makeClient({ name: 'Taylor' });

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

  it('should return null for non-existent ID in non-empty repository', async () => {
    // Definindo um ID que não existe no repositório
    const nonExistentClientId = '5ff57abfb45a47e403bd6477';

    // Executando a função e esperando que retorne null
    const result = await getClient.execute(nonExistentClientId);

    expect(result).toBeNull();
  });

  it('should return null for non-existent ID in empty repository', async () => {
    // Criando um novo repositório vazio
    const emptyRepository = new InMemoryClientRepository();
    const emptyGetClient = new GetClient(emptyRepository);

    // Definindo um ID que não existe no repositório vazio
    const nonExistentClientId = '5ff57abfb45a47e403bd6477';

    // Executando a função e esperando que retorne null
    const result = await emptyGetClient.execute(nonExistentClientId);

    expect(result).toBeNull();
  });

  it('should return null for null ID', async () => {
    // Definindo o ID como null
    const nullClientId = null;

    // Executando a função e esperando que retorne null
    const result = await getClient.execute(nullClientId);

    expect(result).toBeNull();
  });
});
