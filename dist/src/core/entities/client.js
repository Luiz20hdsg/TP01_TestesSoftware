"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
class Client {
    constructor(properties) {
        this.properties = {
            ...properties,
            createdAt: properties.createdAt ?? new Date(),
            updatedAt: properties.updatedAt ?? new Date(),
        };
        this.updateScore();
    }
    updateScore() {
        if (!this.properties.healthProblems) {
            this.properties.score = 0;
            return;
        }
        const sumOfDegrees = this.sumOfHealthProblemsDegrees();
        const exp = Math.exp(-(-2.8 + sumOfDegrees));
        this.properties.score = (1 / (1 + exp)) * 100;
    }
    sumOfHealthProblemsDegrees() {
        let sum = 0;
        for (const { degree } of this.properties.healthProblems) {
            sum += degree;
        }
        return sum;
    }
    updatePropertiesFrom(source) {
        Object.keys(source.properties).forEach((key) => {
            if (source.properties[key] !== undefined) {
                this.properties[key] = source.properties[key];
            }
        });
    }
    getScore() {
        return this.properties.score;
    }
    getId() {
        return this.properties.id;
    }
    setId(id) {
        this.properties.id = id;
    }
    getName() {
        return this.properties.name;
    }
    setName(name) {
        this.properties.name = name;
    }
    getBirthDate() {
        return this.properties.birthDate;
    }
    setBirthDate(birthDate) {
        this.properties.birthDate = birthDate;
    }
    getGender() {
        return this.properties.gender;
    }
    setGender(gender) {
        this.properties.gender = gender;
    }
    getHealthProblems() {
        return this.properties.healthProblems;
    }
    setHealthProblems(healthProblems) {
        this.properties.healthProblems = healthProblems;
        this.updateScore();
    }
    getCreatedAt() {
        return this.properties.createdAt;
    }
    setCreatedAt(createdAt) {
        this.properties.createdAt = createdAt;
    }
    getUpdatedAt() {
        return this.properties.updatedAt;
    }
    setUpdatedAt(updatedAt) {
        this.properties.updatedAt = updatedAt;
    }
}
exports.Client = Client;
//# sourceMappingURL=client.js.map