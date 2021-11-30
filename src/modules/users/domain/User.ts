import { v4 as uuid } from 'uuid';

export class User {
  public readonly id: string;

  public name: string;

  public email: string;

  public password: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
