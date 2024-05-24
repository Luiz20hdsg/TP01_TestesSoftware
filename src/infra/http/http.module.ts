import { Module } from '@nestjs/common';
import { ClientController } from './controllers/client-controller';
import { ListClients } from '@core/use-cases/list-clients';
import { GetClient } from '@core/use-cases/get-client';
import { CreateClient } from '@core/use-cases/create-client';
import { GetTopHealthRiskClients } from '@core/use-cases/get-top-health-risk-clients';
import { UpdateClient } from '@core/use-cases/update-client';
import { DatabaseModule } from '@infra/database/database.module';
import { DeleteClient } from '@core/use-cases/delete-client';

@Module({
  imports: [DatabaseModule],
  controllers: [ClientController],
  providers: [
    ListClients,
    GetClient,
    CreateClient,
    UpdateClient,
    GetTopHealthRiskClients,
    DeleteClient,
  ],
})
export class HttpModule {}
