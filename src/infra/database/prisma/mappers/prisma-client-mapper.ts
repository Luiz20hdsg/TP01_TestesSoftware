import { Client as RawClient } from '@prisma/client';
import { Client } from '@core/entities/client';

export class PrismaClientMapper {
  static toDomain(rawClient: RawClient): Client {
    return new Client({
      id: rawClient.id,
      name: rawClient.name,
      birthDate: rawClient.birthDate,
      gender: rawClient.gender,
      healthProblems: rawClient.healthProblems,
      createdAt: rawClient.createdAt,
      updatedAt: rawClient.updatedAt,
    });
  }

  static toPrisma(client: Client) {
    return {
      name: client.getName(),
      birthDate: client.getBirthDate(),
      gender: client.getGender(),
      healthProblems: client.getHealthProblems(),
      createdAt: client.getCreatedAt(),
      updatedAt: client.getUpdatedAt(),
    };
  }
}
