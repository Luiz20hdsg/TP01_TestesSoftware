"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientNotFoundExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const client_not_found_1 = require("../../exceptions/client-not-found");
let ClientNotFoundExceptionFilter = exports.ClientNotFoundExceptionFilter = class ClientNotFoundExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = 404;
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            message: exception.message,
        });
    }
};
exports.ClientNotFoundExceptionFilter = ClientNotFoundExceptionFilter = __decorate([
    (0, common_1.Catch)(client_not_found_1.ClientNotFoundException)
], ClientNotFoundExceptionFilter);
//# sourceMappingURL=client-not-found-filter.js.map