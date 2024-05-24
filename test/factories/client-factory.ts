import { Client, ClientProperties } from '@core/entities/client';
import ObjectID from 'bson-objectid';

type Override = Partial<ClientProperties>;

export function makeClient(override: Override = {}): Client {
  const id = ObjectID().toHexString();
  const defaultProperties: ClientProperties = {
    id,
    name: 'John Nhoj',
    gender: 'M',
    birthDate: new Date('1990-10-11'),
    healthProblems: [],
    createdAt: new Date('2000-01-02'),
    updatedAt: new Date('2000-01-02'),
  };

  return new Client({ ...defaultProperties, ...override });
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
