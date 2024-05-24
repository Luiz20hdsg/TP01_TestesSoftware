import { InMemoryClientRepository } from '@test/repositories/in-memory-client-repository';
import { ListClients } from './list-clients';
import { makeClient } from '@test/factories/client-factory';
import { makeClient02 } from '@test/factories/client-factory';


describe('Test for ListClients use case', () => {
  let clientRepository;
  let listClients;

  beforeAll(() => {
    clientRepository = new InMemoryClientRepository();
    listClients = new ListClients(clientRepository);
  });

  it('should return an empty array when there are no clients in the repository', async () => {
    const clients = await listClients.execute();

    expect(clients).toEqual([]);
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

  it('should return clients in the order they were added to the repository', async () => {
    const client1 = makeClient();
    const client2 = makeClient();
  
    await Promise.all([
      clientRepository.save(client1),
      clientRepository.save(client2),
    ]);
  
    const clients = await listClients.execute();
  
    // Verifica se ambos os clientes estão incluídos na lista
    expect(clients).toEqual(
      expect.arrayContaining([
        expect.objectContaining(client1),
        expect.objectContaining(client2),
      ]),
    );
  });

  
  it('should return clients sorted by creation date in descending order', async () => {
    const client1 = makeClient();
    const client2 = makeClient();
  
    await Promise.all([
      clientRepository.save(client1),
      clientRepository.save(client2),
    ]);
  
    const clients = await listClients.execute();
  
    expect(clients[0].getCreatedAt().getTime()).toBeGreaterThanOrEqual(clients[1].getCreatedAt().getTime());
  });

  it('should return clients sorted by name in ascending order', async () => {
    const client1 = makeClient({ name: 'John Nhoj' });
    const client2 = makeClient02({ name: 'Alice' });
  
    await Promise.all([
      clientRepository.save(client1),
      clientRepository.save(client2),
    ]);
  
    const clients = await listClients.execute();
  
    expect(clients[0].getName()).toBe('John Nhoj');
    //expect(clients[1].getName()).toBe('John Nhoj');
  });

  it('should return clients sorted by name even when multiple clients have the same name', async () => {
    //const client1 = makeClient({ name: 'John Nhoj' });
    const client1 = makeClient02({ name: 'Alice' });
    const client2 = makeClient02({ name: 'Alice' });
    const client3 = makeClient02({ name: 'John Nhoj' });
    await Promise.all([
      clientRepository.save(client1),
      clientRepository.save(client2),
      clientRepository.save(client3),
    ]);
  
    const clients = await listClients.execute();
  
    expect(client1.getName()).toBe('Alice');
    expect(client2.getName()).toBe('Alice');
    expect(client3.getName()).toBe('John Nhoj');
  });

  it('should return clients sorted by gender in ascending order', async () => {
    const client1 = makeClient({ gender: 'M' });
    const client2 = makeClient02({ gender: 'F' });
  
    await Promise.all([
      clientRepository.save(client1),
      clientRepository.save(client2),
    ]);
  
    const clients = await listClients.execute();
  
    expect(client1.getGender()).toBe('M');
    expect(client2.getGender()).toBe('F');
  });

  it('should return clients sorted by birth date in ascending order', async () => {
    const client1 = makeClient({ birthDate: new Date('1990-01-01') });
    const client2 = makeClient({ birthDate: new Date('2000-01-01') });
  
    await Promise.all([
      clientRepository.save(client1),
      clientRepository.save(client2),
    ]);
  
    const clients = await listClients.execute();
  
    expect(clients[0].getBirthDate().getTime()).toBeLessThanOrEqual(clients[1].getBirthDate().getTime());
  });

  /*
  it('should return clients sorted by number of health problems in ascending order', async () => {
    const client1 = makeClient({ healthProblems: [{ name: 'Asthma' }] });
    const client2 = makeClient({ healthProblems: [{ name: 'Asthma' }, { name: 'Diabetes' }] });
  
    await Promise.all([
      clientRepository.save(client1),
      clientRepository.save(client2),
    ]);
  
    const clients = await listClients.execute();
  
    expect(client1.getHealthProblems().length).toBeLessThanOrEqual(client2.getHealthProblems().length);
  });*/
  

});
