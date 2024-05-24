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
exports.CreateClientBody = void 0;
const class_validator_1 = require("class-validator");
const health_problem_validator_1 = require("./validators/health-problem-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateClientBody {
}
exports.CreateClientBody = CreateClientBody;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'client name',
        example: 'Jason Junior',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateClientBody.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'birth date in ISO 8601 format',
        example: '1990-08-10',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateClientBody.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'gender of the client',
        example: 'M',
        enum: ['M', 'F'],
    }),
    (0, class_validator_1.IsIn)(['M', 'F']),
    __metadata("design:type", String)
], CreateClientBody.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'array of health problem objects (name, degree)',
        example: [
            { name: 'asthma', degree: 3 },
            { name: 'diabetes', degree: 6 },
        ],
    }),
    (0, class_validator_1.Validate)(health_problem_validator_1.HealthProblemValidator, { each: true }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateClientBody.prototype, "healthProblems", void 0);
//# sourceMappingURL=create-client-body.js.map