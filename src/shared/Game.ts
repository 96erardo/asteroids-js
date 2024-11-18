import { State } from './State';
import { Point } from './objects/Point';
import { QuadTree } from './objects/QuadTree';

export class Game {
  state: State;

  constructor () {
    this.state = State.initialState()
  }

  update (dt: number, keys: Set<string>, cursor: Point) {
    const ship = this.state.ship.update(dt, this.state, keys, cursor);
    
    const asteroids = this.state.asteroids.map(asteroid => asteroid.update(
      dt, this.state, keys, cursor
    ))

    this.state.setShip(ship)

    const bullets = this.state.bullets.update(dt, this.state, keys, cursor);

    const quadTree = new QuadTree();

    this.state = new State(ship, asteroids, bullets);
  }
}