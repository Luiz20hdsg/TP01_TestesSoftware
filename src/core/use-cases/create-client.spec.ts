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

  //new
  it('should handle errors when saving a new Client on the database', async () => {
    const newClient = makeClient();

    // Mockando um erro ao salvar no repositório
    clientRepository.save = jest.fn().mockRejectedValueOnce(new Error('Database error'));

    await expect(createClient.execute(newClient)).rejects.toThrowError('Database error');
  });

  // it('should create a client with default values', async () => {
  //   const newClient = makeClient();

  //   await createClient.execute(newClient);
  
  //   const clientFound = await clientRepository.findAll();
  
  //   expect(clientFound[0].getName()).toEqual('John Nhoj');
  //   expect(clientFound[0].getBirthDate()).toEqual(new Date('1990-01-01'));
  //   expect(clientFound[0].getGender()).toEqual('M');
  //   expect(clientFound[0].getHealthProblems()).toEqual([]);
  // });

});
