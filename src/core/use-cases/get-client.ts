import { Injectable } from '@nestjs/common';
import { ClientRepository } from '../repositories/client-repository';
import { Client } from '../entities/client';

@Injectable()
export class GetClient {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(id: string): Promise<Client> | null {
    const client = await this.clientRepository.findById(id);

    return client;
  }

  /*async execute(id: string | null, name: string | null): Promise<Client | null> {
    if (id) {
      const client = await this.clientRepository.findById(id);
      return client;
    } else if (name) {
      const client = await this.clientRepository.findByName(name);
      return client;
    }
    return null;
  }*/
}
