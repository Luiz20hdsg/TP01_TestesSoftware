import { Client as RawClient } from '@prisma/client';
import { Client } from '@core/entities/client';
export declare class PrismaClientMapper {
    static toDomain(rawClient: RawClient): Client;
    static toPrisma(client: Client): {
        name: string;
        birthDate: Date;
        gender: string;
        healthProblems: import("../../../../core/entities/health-problem").HealthProblem[];
        createdAt: Date;
        updatedAt: Date;
    };
}
