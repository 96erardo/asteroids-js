import { State } from './State';
import { Point } from './objects/Point';

export class Game {
  state: State;

  constructor () {
    this.state = State.initialState()
  }

  update (dt: number, keys: Set<string>, cursor: Point) {
    const ship = this.state.ship.update(dt, this.state, keys, cursor);

    this.state = new State(ship);
  }
}