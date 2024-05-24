import { Injectable } from '@nestjs/common';
import { ClientRepository } from '@core/repositories/client-repository';
import { PrismaService } from '../services/prisma-service';
import { Client } from '@core/entities/client';
import { PrismaClientMapper } from '../mappers/prisma-client-mapper';
import { ClientNotFoundException } from '@infra/exceptions/client-not-found';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import ObjectID from 'bson-objectid';

@Injectable()
export class PrismaClientRepository implements ClientRepository {
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async findAll(): Promise<Client[]> {
    const clients = await this.prismaService.client.findMany();
    return clients.map(PrismaClientMapper.toDomain);
  }

  async findById(id: string): Promise<Client> | null {
    if (!ObjectID.isValid(id)) throw new ClientNotFoundException();

    const client = await this.prismaService.client.findUnique({
      where: { id: id },
    });

    if (!client) {
      throw new ClientNotFoundException();
    }

    return PrismaClientMapper.toDomain(client);
  }

  async save(client: Client): Promise<void> {
    const rawClient = PrismaClientMapper.toPrisma(client);

    await this.prismaService.client.create({ data: rawClient });
  }

  async update(id: string, clientUpdates: Client): Promise<void> {
    if (!ObjectID.isValid(id)) throw new ClientNotFoundException();

    const rawClientUpdates = PrismaClientMapper.toPrisma(clientUpdates);

    try {
      await this.prismaService.client.update({
        where: { id: id },
        data: rawClientUpdates,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        throw new ClientNotFoundException();
      else throw error;
    }
  }

  async delete(id: string): Promise<void> {
    if (!ObjectID.isValid(id)) throw new ClientNotFoundException();

    try {
      await this.prismaService.client.delete({ where: { id: id } });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        throw new ClientNotFoundException();
      else throw error;
    }
  }
}
