export class InsufficientUserResourceException extends Error {
  constructor() {
    super('Insufficient user resource (not enough amount).');
  }
}
