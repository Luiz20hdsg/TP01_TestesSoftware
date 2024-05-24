"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaClientMapper = void 0;
const client_1 = require("../../../../core/entities/client");
class PrismaClientMapper {
    static toDomain(rawClient) {
        return new client_1.Client({
            id: rawClient.id,
            name: rawClient.name,
            birthDate: rawClient.birthDate,
            gender: rawClient.gender,
            healthProblems: rawClient.healthProblems,
            createdAt: rawClient.createdAt,
            updatedAt: rawClient.updatedAt,
        });
    }
    static toPrisma(client) {
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
exports.PrismaClientMapper = PrismaClientMapper;
//# sourceMappingURL=prisma-client-mapper.js.map