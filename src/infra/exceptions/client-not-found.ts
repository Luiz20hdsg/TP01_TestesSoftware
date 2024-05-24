export class ClientNotFoundException extends Error {
  constructor() {
    super('Client not found');
  }
}
