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
exports.UpdateClient = void 0;
const common_1 = require("@nestjs/common");
const client_repository_1 = require("../repositories/client-repository");
const client_1 = require("../entities/client");
let UpdateClient = exports.UpdateClient = class UpdateClient {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    async execute(id, request) {
        const { name, birthDate: birthDateString, gender, healthProblems, } = request;
        const birthDate = birthDateString ? new Date(birthDateString) : undefined;
        const client = new client_1.Client({ name, birthDate, gender, healthProblems });
        client.setCreatedAt(undefined);
        await this.clientRepository.update(id, client);
    }
};
exports.UpdateClient = UpdateClient = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_repository_1.ClientRepository])
], UpdateClient);
//# sourceMappingURL=update-client.js.map