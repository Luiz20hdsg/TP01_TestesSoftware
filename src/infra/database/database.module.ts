import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/services/prisma-service';
import { ClientRepository } from '@core/repositories/client-repository';
import { PrismaClientRepository } from './prisma/repositories/prisma-client-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: ClientRepository,
      useClass: PrismaClientRepository,
    },
  ],
  exports: [ClientRepository],
})
export class DatabaseModule {}
