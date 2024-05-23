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
}
