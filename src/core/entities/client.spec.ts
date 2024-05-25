import { Client } from './client';
import { InvalidGenderException } from '@infra/exceptions/invalid-gender';

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

  it('should update the client name', () => {
    const newName = 'Luiz';
    client.setName(newName);
    expect(client.getName()).toEqual(newName);
  });

  it('should update the client birthDate', () => {
    const newBirthDate = new Date('1999-11-06');
    client.setBirthDate(newBirthDate);
    expect(client.getBirthDate()).toEqual(newBirthDate);
  });

  it('should update the client gender', () => {
    const newGender = 'F';
    client.setGender(newGender);
    expect(client.getGender()).toEqual(newGender);
  });

  it('should update the client healthProblems', () => {
    const newHealthProblems = [{ name: 'migraine', degree: 3 }];
    client.setHealthProblems(newHealthProblems);
    expect(client.getHealthProblems()).toEqual(newHealthProblems);
  });

  it('should update the client createdAt', () => {
    const newCreatedAt = new Date('2022-02-20');
    client.setCreatedAt(newCreatedAt);
    expect(client.getCreatedAt()).toEqual(newCreatedAt);
  });

  it('should update the client updatedAt', () => {
    const newUpdatedAt = new Date('2023-07-19');
    client.setUpdatedAt(newUpdatedAt);
    expect(client.getUpdatedAt()).toEqual(newUpdatedAt);
  });

  it('should update properties from another client', () => {
    const newClient = new Client({
      name: 'Jon',
      birthDate: new Date('2022-08-10'),
      gender: 'M',
      healthProblems: [{ name: 'hypertension', degree: 4 }],
    });
    client.updatePropertiesFrom(newClient);
    expect(client).toMatchObject(newClient);
  });

  it('should throw an error when setting an invalid gender', () => {
    expect(() => {
      client.setGender('Invalid');
    }).toThrowError(InvalidGenderException);
  });

  it('should throw an error when setting an undefined gender', () => {
    // Testa se uma exceção é lançada ao definir um gênero como undefined
    expect(() => {
      client.setGender(undefined);
    }).toThrowError(InvalidGenderException);
  });

  it('should ensure createdAt and updatedAt are valid dates', () => {
    expect(client.getCreatedAt()).toBeInstanceOf(Date);
    expect(client.getUpdatedAt()).toBeInstanceOf(Date);
  });
  /*
  it('should ensure equality between clients', () => {
    const clonedClient = new Client({
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
  
    expect(client.getId()).toEqual(clonedClient.getId());
    expect(client.getName()).toEqual(clonedClient.getName());
    expect(client.getBirthDate()).toEqual(clonedClient.getBirthDate());
    expect(client.getGender()).toEqual(clonedClient.getGender());
    expect(client.getHealthProblems()).toEqual(clonedClient.getHealthProblems());
    expect(client.getCreatedAt()).toEqual(clonedClient.getCreatedAt());
    expect(client.getUpdatedAt()).toEqual(clonedClient.getUpdatedAt());
  });*/

});
