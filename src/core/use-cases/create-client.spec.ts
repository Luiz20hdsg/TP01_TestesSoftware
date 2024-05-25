import { InMemoryClientRepository } from '@test/repositories/in-memory-client-repository';
import { CreateClient } from './create-client';
import { makeClient } from '@test/factories/client-factory';
import { makeClient02 } from '@test/factories/client-factory';


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

  it('should handle errors when saving a new Client on the database', async () => {
    const newClient = makeClient();

    // Mockando um erro ao salvar no repositório
    clientRepository.save = jest.fn().mockRejectedValueOnce(new Error('Database error'));

    await expect(createClient.execute(newClient)).rejects.toThrowError('Database error');
  });

  it('should create a client with with info of clientes', async () => {
    const defaultClientData = {
      name: 'PAUL',
      birthDate: '1964-03-03',
      gender: 'M',
      healthProblems: [],
    };

    await createClient.execute(defaultClientData);

    const clientFound = await clientRepository.findAll();

    expect(clientFound.length).toEqual(1);
  });

  it('should handle errors when saving a new Client with info on the database', async () => {
    const newClientData = {
      name: 'Bob',
      birthDate: '1990-02-20',
      gender: 'M',
      healthProblems: [],
    };

    // Mockando um erro ao salvar no repositório
    clientRepository.save = jest.fn().mockRejectedValueOnce(new Error('Database error'));

    await expect(createClient.execute(newClientData)).rejects.toThrowError('Database error');
  });
  
  it('should save a new Client on the database', async () => {
    const newClientData = {
      name: 'Alice',
      birthDate: '1995-05-15',
      gender: 'F',
      healthProblems: [],
    };

    const newClient = makeClient02();

    await createClient.execute(newClient);

    const clientFound = await clientRepository.findAll();

    expect(clientFound.length).toEqual(1);

    expect(newClient.getName()).toEqual(newClientData.name);
    expect(newClient.getBirthDate()).toEqual(new Date(newClientData.birthDate));
    expect(newClient.getGender()).toEqual(newClientData.gender);
    expect(newClient.getHealthProblems()).toEqual(newClientData.healthProblems);
  });

});
