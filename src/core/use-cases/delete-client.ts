import { ClientRepository } from '@core/repositories/client-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteClient {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(id: string) {
    await this.clientRepository.delete(id);
  }
}
