"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpModule = void 0;
const common_1 = require("@nestjs/common");
const client_controller_1 = require("./controllers/client-controller");
const list_clients_1 = require("../../core/use-cases/list-clients");
const get_client_1 = require("../../core/use-cases/get-client");
const create_client_1 = require("../../core/use-cases/create-client");
const get_top_health_risk_clients_1 = require("../../core/use-cases/get-top-health-risk-clients");
const update_client_1 = require("../../core/use-cases/update-client");
const database_module_1 = require("../database/database.module");
const delete_client_1 = require("../../core/use-cases/delete-client");
let HttpModule = exports.HttpModule = class HttpModule {
};
exports.HttpModule = HttpModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [client_controller_1.ClientController],
        providers: [
            list_clients_1.ListClients,
            get_client_1.GetClient,
            create_client_1.CreateClient,
            update_client_1.UpdateClient,
            get_top_health_risk_clients_1.GetTopHealthRiskClients,
            delete_client_1.DeleteClient,
        ],
    })
], HttpModule);
//# sourceMappingURL=http.module.js.map