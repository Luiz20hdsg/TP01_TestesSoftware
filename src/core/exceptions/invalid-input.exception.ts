// exceptions/invalid-input.exception.ts

export class InvalidInputException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidInputException';
  }
}

