import { InMemoryClientRepository } from '@test/repositories/in-memory-client-repository';
import { Client } from '../entities/client';
import { UpdateClient } from './update-client';
import { makeClient } from '@test/factories/client-factory';
import { ClientNotFoundException } from '@infra/exceptions/client-not-found';
import { InvalidInputException } from '../exceptions/invalid-input.exception'; 

describe('Test for UpdateClient use case', () => {
  let clientTest;
  let clientTestId;
  let clientRepository;
  let updateClient;

  beforeEach(async () => {
    clientRepository = new InMemoryClientRepository();
    updateClient = new UpdateClient(clientRepository);

    clientTest = makeClient();
    clientTestId = clientTest.getId();

    await clientRepository.save(clientTest);

    const mockDate = new Date('2023-1-1');
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any);
  });

  afterEach(() => {
    (global.Date as any).mockRestore();
  });

  it('should update the client', async () => {
    const clientUpdates = {
      name: 'James Semaj',
      birthDate: undefined,
      gender: undefined,
      healthProblems: [
        { name: 'diabetes', degree: 5 },
        { name: 'asthma', degree: 3 },
      ],
    };

    const clientCopy = await clientRepository.findById(clientTestId);
    clientCopy.updatePropertiesFrom(new Client(clientUpdates));
    clientCopy.setCreatedAt(clientTest.getCreatedAt());

    await updateClient.execute(clientTestId, clientUpdates);

    const newClient = await clientRepository.findById(clientTestId);

    expect(newClient).toEqual(clientCopy);
  });

  it('should update only the client name', async () => {
    const clientUpdates = {
      name: 'New Name',
    };

    const clientCopy = await clientRepository.findById(clientTestId);
    clientCopy.setName(clientUpdates.name);

    await updateClient.execute(clientTestId, clientUpdates);

    const newClient = await clientRepository.findById(clientTestId);

    expect(newClient).toMatchObject(clientCopy);
  });

  it('should update only the client birthDate', async () => {
    const clientUpdates = {
      birthDate: '1990-01-01',
    };
  
    const clientCopy = await clientRepository.findById(clientTestId);
    clientCopy.setBirthDate(new Date(clientUpdates.birthDate));
  
    await updateClient.execute(clientTestId, clientUpdates);
  
    const newClient = await clientRepository.findById(clientTestId);
  
    expect(newClient).toMatchObject(clientCopy);
  });
  
  it('should update only the client gender', async () => {
    const clientUpdates = {
      gender: 'F',
    };
  
    const clientCopy = await clientRepository.findById(clientTestId);
    clientCopy.setGender(clientUpdates.gender);
  
    await updateClient.execute(clientTestId, clientUpdates);
  
    const newClient = await clientRepository.findById(clientTestId);
  
    expect(newClient).toMatchObject(clientCopy);
  });
  
  it('should update only the client healthProblems', async () => {
    const clientUpdates = {
      healthProblems: [
        { name: 'diabetes', degree: 5 },
        { name: 'asthma', degree: 3 },
      ],
    };
  
    const clientCopy = await clientRepository.findById(clientTestId);
    clientCopy.setHealthProblems(clientUpdates.healthProblems);
  
    await updateClient.execute(clientTestId, clientUpdates);
  
    const newClient = await clientRepository.findById(clientTestId);
  
    expect(newClient).toMatchObject(clientCopy);
  });


  it('should throw an error when updating a non-existent client', async () => {
    const nonExistentClientId = 'non_existent_client_id';
    const clientUpdates = {
      name: 'Updated Name',
    };
  
    await expect(updateClient.execute(nonExistentClientId, clientUpdates)).rejects.toThrow(ClientNotFoundException);
  });

  it('should not throw an error when updating a client without changes', async () => {
    const clientUpdates = {};

    const newClient = await clientRepository.findById(clientTestId);
    await expect(updateClient.execute(clientTestId, clientUpdates)).resolves.not.toThrow();
    
    const updatedClient = await clientRepository.findById(clientTestId);
    expect(updatedClient).toMatchObject(newClient);
  });

});
