export class InvalidGenderException extends Error {
    constructor() {
      super('Exception! Gender not found');
    }
  }