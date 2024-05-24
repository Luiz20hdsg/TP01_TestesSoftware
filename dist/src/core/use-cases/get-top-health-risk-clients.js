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
exports.GetTopHealthRiskClients = void 0;
const common_1 = require("@nestjs/common");
const client_repository_1 = require("../repositories/client-repository");
let GetTopHealthRiskClients = exports.GetTopHealthRiskClients = class GetTopHealthRiskClients {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
        this.numberOfClients = 10;
    }
    async execute() {
        const clients = await this.clientRepository.findAll();
        clients.sort((a, b) => b.getScore() - a.getScore());
        return clients.slice(0, this.numberOfClients);
    }
    setNumberOfClients(numberOfClients) {
        this.numberOfClients = numberOfClients;
    }
};
exports.GetTopHealthRiskClients = GetTopHealthRiskClients = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_repository_1.ClientRepository])
], GetTopHealthRiskClients);
//# sourceMappingURL=get-top-health-risk-clients.js.map