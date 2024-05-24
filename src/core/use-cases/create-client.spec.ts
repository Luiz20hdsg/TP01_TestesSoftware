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

  it('should create a client with with info of clientes', async () => {
    const defaultClientData = {
      name: 'PAUL',
      birthDate: '1964-03-03',
      gender: 'M',
      healthProblems: [],
    };

    await createClient.execute(defaultClientData);

    const clientFound = await clientRepository.findAll();

    // Verificando se o cliente foi salvo corretamente no repositório
    expect(clientFound.length).toEqual(1);

    // Verificando se os dados do cliente correspondem exatamente aos fornecidos
    //expect(clientFound[0].getName()).toEqual(defaultClientData.name);
    //expect(clientFound[0].getBirthDate()).toEqual(new Date(defaultClientData.birthDate));
    //expect(clientFound[0].getGender()).toEqual(defaultClientData.gender);
    //expect(clientFound[0].getHealthProblems()).toEqual(defaultClientData.healthProblems);
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

    //await createClient.execute(newClientData);

    const clientFound = await clientRepository.findAll();

    // Verificando se o cliente foi salvo corretamente no repositório
    expect(clientFound.length).toEqual(1);

    // Verificando se os dados do cliente correspondem exatamente aos fornecidos
    expect(newClient.getName()).toEqual(newClientData.name);
    expect(newClient.getBirthDate()).toEqual(new Date(newClientData.birthDate));
    expect(newClient.getGender()).toEqual(newClientData.gender);
    expect(newClient.getHealthProblems()).toEqual(newClientData.healthProblems);
  });

});
