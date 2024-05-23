import { Injectable } from '@nestjs/common';
import { ClientRepository } from '../repositories/client-repository';
import { Client } from '../entities/client';

@Injectable()
export class ListClients {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(): Promise<Client[]> {
    return await this.clientRepository.findAll();
  }
}
