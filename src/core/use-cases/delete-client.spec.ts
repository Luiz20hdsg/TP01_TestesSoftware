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

    // Verifica se o cliente foi removido com sucesso do repositório
    await expect(clientRepository.findById(clientId)).rejects.toThrow(ClientNotFoundException);
  });

  it('should throw an error if the client does not exist', async () => {
    const nonExistentClientId = 'non_existent_client_id';

    // Verifica se uma exceção é lançada ao tentar excluir um cliente que não existe
    await expect(deleteClient.execute(nonExistentClientId)).rejects.toThrow(ClientNotFoundException);
  });

  it('should delete a single client', async () => {
    const clientToDelete = clients[0];
    await deleteClient.execute(clientToDelete.getId());

    // Verifica se o cliente foi removido com sucesso do repositório
    await expect(clientRepository.findById(clientToDelete.getId())).rejects.toThrow(ClientNotFoundException);

    // Verifica se os outros clientes ainda existem no repositório
    for (let i = 1; i < clients.length; i++) {
      const remainingClient = clients[i];
      expect(await clientRepository.findById(remainingClient.getId())).toEqual(remainingClient);
    }
  });

  it('should delete multiple clients', async () => {
    for (const client of clients) {
      await deleteClient.execute(client.getId());
    }

    // Verifica se todos os clientes foram removidos com sucesso do repositório
    for (const client of clients) {
      await expect(clientRepository.findById(client.getId())).rejects.toThrow(ClientNotFoundException);
    }
  });

  it('should throw an error if trying to delete a non-existent client', async () => {
    const nonExistentClientId = 'non_existent_client_id';

    // Verifica se uma exceção é lançada ao tentar excluir um cliente que não existe
    await expect(deleteClient.execute(nonExistentClientId)).rejects.toThrow(ClientNotFoundException);
  });

  it('should not affect the repository if trying to delete a non-existent client', async () => {
    const nonExistentClientId = 'non_existent_client_id';

    // Tenta excluir um cliente que não existe
    await expect(deleteClient.execute(nonExistentClientId)).rejects.toThrow(ClientNotFoundException);

    // Verifica se o repositório permanece inalterado
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
