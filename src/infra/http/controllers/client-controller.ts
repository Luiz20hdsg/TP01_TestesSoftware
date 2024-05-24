import {
  Controller,
  Get,
  Post,
  Param,
  UseFilters,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { GetClient } from '@core/use-cases/get-client';
import { ListClients } from '@core/use-cases/list-clients';
import { ClientNotFoundExceptionFilter } from '../filters/client-not-found-filter';
import { CreateClientBody } from './dtos/create-client-body';
import { CreateClient } from '@core/use-cases/create-client';
import { UpdateClientBody } from './dtos/update-client-body';
import { UpdateClient } from '@core/use-cases/update-client';
import { GetTopHealthRiskClients } from '@core/use-cases/get-top-health-risk-clients';
import { DeleteClient } from '@core/use-cases/delete-client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('client')
@Controller('client')
export class ClientController {
  constructor(
    private readonly listClients: ListClients,
    private readonly getClient: GetClient,
    private readonly createClient: CreateClient,
    private readonly updateClient: UpdateClient,
    private readonly getTopHealthRiskClients: GetTopHealthRiskClients,
    private readonly deleteClient: DeleteClient,
  ) {}

  @Get()
  async getAllClients() {
    return await this.listClients.execute();
  }

  @Get('top-health-risk')
  async getTopRiskClients() {
    return await this.getTopHealthRiskClients.execute();
  }

  @Get(':id')
  @UseFilters(new ClientNotFoundExceptionFilter())
  async getClientById(@Param('id') id: string) {
    const client = await this.getClient.execute(id);

    return client;
  }

  @Post()
  async create(@Body() body: CreateClientBody) {
    const { name, birthDate, gender, healthProblems } = body;

    await this.createClient.execute({
      name,
      birthDate,
      gender,
      healthProblems,
    });
  }

  @Patch(':id')
  @UseFilters(new ClientNotFoundExceptionFilter())
  async update(@Param('id') id: string, @Body() body: UpdateClientBody) {
    const { name, birthDate, gender, healthProblems } = body;
    await this.updateClient.execute(id, {
      name,
      birthDate,
      gender,
      healthProblems,
    });
  }

  @Delete(':id')
  @UseFilters(new ClientNotFoundExceptionFilter())
  async remove(@Param('id') id: string) {
    await this.deleteClient.execute(id);
  }
}
