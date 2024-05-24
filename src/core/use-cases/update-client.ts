import { Injectable } from '@nestjs/common';
import { ClientRepository } from '../repositories/client-repository';
import { HealthProblem } from '../entities/health-problem';
import { Client } from '../entities/client';
import { InvalidInputException } from '../exceptions/invalid-input.exception';

interface UpdateClientRequest {
  name?: string;
  birthDate?: string;
  gender?: string;
  healthProblems?: HealthProblem[];
}

@Injectable()
export class UpdateClient {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(id: string, request: UpdateClientRequest): Promise<void> {
    const { name, birthDate: birthDateString, gender, healthProblems } = request;

    if (birthDateString) {
      const birthDate = new Date(birthDateString);
      if (isNaN(birthDate.getTime())) {
        throw new InvalidInputException('Invalid birthDate');
      }
    }

    const birthDate = birthDateString ? new Date(birthDateString) : undefined;

    const client = new Client({ name, birthDate, gender, healthProblems });
    client.setCreatedAt(undefined);

    await this.clientRepository.update(id, client);
  }
}
