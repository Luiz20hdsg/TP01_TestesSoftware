import { Client } from '@core/entities/client';
import { ClientRepository } from '@core/repositories/client-repository';
import ObjectID from 'bson-objectid';
import { ClientNotFoundException } from '@infra/exceptions/client-not-found';

export class InMemoryClientRepository implements ClientRepository {
  public clients: Client[] = [];

  async findAll(): Promise<Client[]> {
    return this.clients;
  }

  async findById(clientId: string): Promise<Client> | null {
    if (!ObjectID.isValid(clientId)) throw new ClientNotFoundException();

    const client = this.clients.find((item) => clientId === item.getId());

    if (!client) throw new ClientNotFoundException();

    return client;
  }

  async save(client: Client) {
    this.clients.push(client);
  }

  async update(id: string, clientUpdates: Client) {
    const clientIndex = this.findClientIndex(id);

    if (clientIndex === -1) throw new ClientNotFoundException();

    const client = this.clients[clientIndex];
    client.updatePropertiesFrom(clientUpdates);
    this.clients[clientIndex] = client;
  }

  async delete(id: string): Promise<void> {
    const clientIndex = this.findClientIndex(id);

    if (clientIndex === -1) throw new ClientNotFoundException();

    this.clients.splice(clientIndex, 1);
  }

  private findClientIndex(clientId: string) {
    return this.clients.findIndex((item) => clientId === item.getId());
  }
}
