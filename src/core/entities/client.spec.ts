import { Client } from './client';

describe('Test for Client entity', () => {
  let client;
  beforeAll(() => {
    client = new Client({
      id: 'a8Ahy1j',
      name: 'Davi',
      birthDate: new Date('2023-1-5'),
      gender: 'M',
      healthProblems: [
        { name: 'diabetes', degree: 2 },
        { name: 'asthma', degree: 5 },
      ],
      createdAt: new Date('2021-3-4'),
      updatedAt: new Date('2021-3-4'),
    });
  });

  it('should be able to create a client', () => {
    expect(client).toBeTruthy();
  });

  it('should be able to calculate the right score', () => {
    expect(client.getScore()).toBeCloseTo(98.52);
  });

  it('should be able to update the score', () => {
    client.setHealthProblems([]);
    expect(client.getScore()).toBeCloseTo(5.73);
  });
});
