import { Ship } from '../modules/ship/Ship';

export class State {
  ship: Ship;

  constructor (ship: Ship) {
    this.ship = ship;
  }

  static initialState (): State {
    return new State(
      new Ship(20, 20, 0)
    )
  }
}