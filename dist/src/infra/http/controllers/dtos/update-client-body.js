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
exports.UpdateClientBody = void 0;
const class_validator_1 = require("class-validator");
const health_problem_validator_1 = require("./validators/health-problem-validator");
const swagger_1 = require("@nestjs/swagger");
class UpdateClientBody {
}
exports.UpdateClientBody = UpdateClientBody;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'client name',
        example: 'John Smith',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateClientBody.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'birth date in ISO 8601 format',
        example: '1970-08-10',
        required: false,
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateClientBody.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'gender of the client',
        example: 'M',
        enum: ['M', 'F'],
        required: false,
    }),
    (0, class_validator_1.IsIn)(['M', 'F']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateClientBody.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'array of health problem objects (name, degree)',
        example: [{ name: 'diabetes', degree: 6 }],
        required: false,
    }),
    (0, class_validator_1.Validate)(health_problem_validator_1.HealthProblemValidator, { each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateClientBody.prototype, "healthProblems", void 0);
//# sourceMappingURL=update-client-body.js.map