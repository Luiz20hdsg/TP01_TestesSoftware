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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const common_1 = require("@nestjs/common");
const get_client_1 = require("../../../core/use-cases/get-client");
const list_clients_1 = require("../../../core/use-cases/list-clients");
const client_not_found_filter_1 = require("../filters/client-not-found-filter");
const create_client_body_1 = require("./dtos/create-client-body");
const create_client_1 = require("../../../core/use-cases/create-client");
const update_client_body_1 = require("./dtos/update-client-body");
const update_client_1 = require("../../../core/use-cases/update-client");
const get_top_health_risk_clients_1 = require("../../../core/use-cases/get-top-health-risk-clients");
const delete_client_1 = require("../../../core/use-cases/delete-client");
const swagger_1 = require("@nestjs/swagger");
let ClientController = exports.ClientController = class ClientController {
    constructor(listClients, getClient, createClient, updateClient, getTopHealthRiskClients, deleteClient) {
        this.listClients = listClients;
        this.getClient = getClient;
        this.createClient = createClient;
        this.updateClient = updateClient;
        this.getTopHealthRiskClients = getTopHealthRiskClients;
        this.deleteClient = deleteClient;
    }
    async getAllClients() {
        return await this.listClients.execute();
    }
    async getTopRiskClients() {
        return await this.getTopHealthRiskClients.execute();
    }
    async getClientById(id) {
        const client = await this.getClient.execute(id);
        return client;
    }
    async create(body) {
        const { name, birthDate, gender, healthProblems } = body;
        await this.createClient.execute({
            name,
            birthDate,
            gender,
            healthProblems,
        });
    }
    async update(id, body) {
        const { name, birthDate, gender, healthProblems } = body;
        await this.updateClient.execute(id, {
            name,
            birthDate,
            gender,
            healthProblems,
        });
    }
    async remove(id) {
        await this.deleteClient.execute(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "getAllClients", null);
__decorate([
    (0, common_1.Get)('top-health-risk'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "getTopRiskClients", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseFilters)(new client_not_found_filter_1.ClientNotFoundExceptionFilter()),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "getClientById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_client_body_1.CreateClientBody]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseFilters)(new client_not_found_filter_1.ClientNotFoundExceptionFilter()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_client_body_1.UpdateClientBody]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseFilters)(new client_not_found_filter_1.ClientNotFoundExceptionFilter()),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "remove", null);
exports.ClientController = ClientController = __decorate([
    (0, swagger_1.ApiTags)('client'),
    (0, common_1.Controller)('client'),
    __metadata("design:paramtypes", [list_clients_1.ListClients,
        get_client_1.GetClient,
        create_client_1.CreateClient,
        update_client_1.UpdateClient,
        get_top_health_risk_clients_1.GetTopHealthRiskClients,
        delete_client_1.DeleteClient])
], ClientController);
//# sourceMappingURL=client-controller.js.map