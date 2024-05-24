"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaClientRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../services/prisma-service");
const prisma_client_mapper_1 = require("../mappers/prisma-client-mapper");
const client_not_found_1 = require("../../../exceptions/client-not-found");
const library_1 = require("@prisma/client/runtime/library");
const bson_objectid_1 = require("bson-objectid");
let PrismaClientRepository = exports.PrismaClientRepository = class PrismaClientRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
        this.prismaService = prismaService;
    }
    async findAll() {
        const clients = await this.prismaService.client.findMany();
        return clients.map(prisma_client_mapper_1.PrismaClientMapper.toDomain);
    }
    async findById(id) {
        if (!bson_objectid_1.default.isValid(id))
            throw new client_not_found_1.ClientNotFoundException();
        const client = await this.prismaService.client.findUnique({
            where: { id: id },
        });
        if (!client) {
            throw new client_not_found_1.ClientNotFoundException();
        }
        return prisma_client_mapper_1.PrismaClientMapper.toDomain(client);
    }
    async save(client) {
        const rawClient = prisma_client_mapper_1.PrismaClientMapper.toPrisma(client);
        await this.prismaService.client.create({ data: rawClient });
    }
    async update(id, clientUpdates) {
        if (!bson_objectid_1.default.isValid(id))
            throw new client_not_found_1.ClientNotFoundException();
        const rawClientUpdates = prisma_client_mapper_1.PrismaClientMapper.toPrisma(clientUpdates);
        try {
            await this.prismaService.client.update({
                where: { id: id },
                data: rawClientUpdates,
            });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError)
                throw new client_not_found_1.ClientNotFoundException();
            else
                throw error;
        }
    }
    async delete(id) {
        if (!bson_objectid_1.default.isValid(id))
            throw new client_not_found_1.ClientNotFoundException();
        try {
            await this.prismaService.client.delete({ where: { id: id } });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError)
                throw new client_not_found_1.ClientNotFoundException();
            else
                throw error;
        }
    }
};
exports.PrismaClientRepository = PrismaClientRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaClientRepository);
//# sourceMappingURL=prisma-client-repository.js.map