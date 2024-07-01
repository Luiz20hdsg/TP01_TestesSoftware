import { Client, ClientProperties } from '@core/entities/client';
import { CreateClientRequest } from '@core/use-cases/create-client';
import ObjectID from 'bson-objectid';

type Override = Partial<ClientProperties>;
type OverrideRequest = Partial<CreateClientRequest>;

export function makeClient(override: Override = {}): Client {
    return new Client({
        id: ObjectID().toHexString(),
        name: 'Davi',
        birthDate: new Date('2023-1-5'),
        gender: 'M',
        healthProblems: [
            { name: 'diabetes', degree: 2 },
            { name: 'asthma', degree: 1 },
        ],
        createdAt: new Date('2021-3-4'),
        updatedAt: new Date('2021-3-4'),
        ...override,
    });
}

export function makeClient02(override: Override = {}): Client {
    const id = ObjectID().toHexString();
    const defaultProperties: ClientProperties = {
        id,
        name: 'Alice',
        gender: 'F',
        birthDate: new Date('1995-05-15'),
        healthProblems: [],
        createdAt: new Date('2000-01-02'),
        updatedAt: new Date('2000-01-02'),
    };

    return new Client({ ...defaultProperties, ...override });
}

export function makeClientRequest(
    override: OverrideRequest = {}
): CreateClientRequest {
    const clientRequest: CreateClientRequest = {
        name: 'Davi',
        birthDate: '2023-1-5',
        gender: 'M',
        healthProblems: [
            { name: 'diabetes', degree: 2 },
            { name: 'asthma', degree: 1 },
        ],
        ...override,
    };

    return clientRequest;
}
