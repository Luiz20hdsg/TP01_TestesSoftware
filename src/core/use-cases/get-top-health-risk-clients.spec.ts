import { makeClient } from '@test/factories/client-factory';
import { InMemoryClientRepository } from '@test/repositories/in-memory-client-repository';
import { GetTopHealthRiskClients } from './get-top-health-risk-clients';


describe('Test for GetTopHealthRiskClients use case', () => {
  let getTopHealthRiskClients;
  let clientRepository;
  let client1, client2, client3;

  beforeEach(async () => {
    clientRepository = new InMemoryClientRepository();
    getTopHealthRiskClients = new GetTopHealthRiskClients(clientRepository);
    getTopHealthRiskClients.setNumberOfClients(2);

    client1 = makeClient({ healthProblems: [{ name: 'asthma', degree: 3 }] });
    client2 = makeClient({ healthProblems: [{ name: 'asthma', degree: 4 }] });
    client3 = makeClient({ healthProblems: [{ name: 'asthma', degree: 5 }] });
    await Promise.all([
      clientRepository.save(client1),
      clientRepository.save(client2),
      clientRepository.save(client3),
    ]);
  });

  it('should retrieve the top 2 health risk clients', async () => {
    const topRiskClients = await getTopHealthRiskClients.execute();

    expect(topRiskClients).toEqual([client3, client2]);
  });

  it('should retrieve the correct number of top health risk clients based on set number', async () => {
    getTopHealthRiskClients.setNumberOfClients(1);

    const topRiskClients = await getTopHealthRiskClients.execute();

    expect(topRiskClients.length).toEqual(1);
  });

  it('should return an empty array if there are no clients', async () => {
    clientRepository.clear();
  
    const topRiskClients = await getTopHealthRiskClients.execute();
  
    expect(topRiskClients).toEqual([]);
  });
  
  it('should return an empty array if the number of clients is set to 0', async () => {
    getTopHealthRiskClients.setNumberOfClients(0);
  
    const topRiskClients = await getTopHealthRiskClients.execute();
  
    expect(topRiskClients).toEqual([]);
  });
});