import { Client, ClientProperties } from '@core/entities/client';
import ObjectID from 'bson-objectid';

type Override = Partial<ClientProperties>;

export function makeClient(override: Override = {}) {
  return new Client({
    id: ObjectID().toHexString(),
    name: 'John Nhoj',
    gender: 'M',
    birthDate: new Date('1990-10-11'),
    healthProblems: [],
    createdAt: new Date('2000-1-2'),
    updatedAt: new Date('2000-1-2'),
    ...override,
  });
}
