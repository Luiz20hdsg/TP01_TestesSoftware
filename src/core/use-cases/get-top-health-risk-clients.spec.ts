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
    // Configurando para obter apenas 1 cliente de alto risco
    getTopHealthRiskClients.setNumberOfClients(1);

    // principais clientes de risco à saúde
    const topRiskClients = await getTopHealthRiskClients.execute();

    // retornados corresponde ao número definido
    expect(topRiskClients.length).toEqual(1);
  });

  it('should return an empty array if there are no clients', async () => {
    // Limpa o repositório antes de executar o teste
    clientRepository.clear();
  
    // Executa o caso de uso quando não há clientes cadastrados pelo sistema
    const topRiskClients = await getTopHealthRiskClients.execute();
  
    // Verifica o array vazio
    expect(topRiskClients).toEqual([]);
  });
  
  it('should return an empty array if the number of clients is set to 0', async () => {
    //  0 clientes de alto risco
    getTopHealthRiskClients.setNumberOfClients(0);
  
    // Recupera os clientes
    const topRiskClients = await getTopHealthRiskClients.execute();
  
    // Verifica se um array vazio é retornado
    expect(topRiskClients).toEqual([]);
  });
  /*
  it('should return clients with the highest risk degree if there are multiple clients with the same score', async () => {
    // Cria mais um cliente com o mesmo problema de saúde que o client3, mas com um grau de risco maior
    const client4 = makeClient({ healthProblems: [{ name: 'asthma', degree: 5 }] });
  
    // Salva o novo cliente no repositório
    await clientRepository.save(client4);
  
    // Recupera os top 2 clientes de alto risco
    const topRiskClients = await getTopHealthRiskClients.execute();
  
    // Verifica se o cliente4, com grau de risco mais alto, é retornado no lugar do client3
    expect(topRiskClients).toEqual([client4, client2]);
  });
  */
});