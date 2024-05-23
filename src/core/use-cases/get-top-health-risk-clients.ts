import { Injectable } from '@nestjs/common';
import { ClientRepository } from '../repositories/client-repository';
import { Client } from '../entities/client';

@Injectable()
export class GetTopHealthRiskClients {
  private numberOfClients = 10;

  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(): Promise<Client[]> {
    const clients = await this.clientRepository.findAll();

    clients.sort((a, b) => b.getScore() - a.getScore());

    return clients.slice(0, this.numberOfClients);
  }

  public setNumberOfClients(numberOfClients: number) {
    this.numberOfClients = numberOfClients;
  }
}
