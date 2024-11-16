import { Ship } from '../modules/ship/Ship';
import * as asteroids from '../modules/asteroid/Asteroid';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants';

export class State {
  ship: Ship;
  asteroids: Array<asteroids.Asteroid>

  constructor (
    ship: Ship,
    asteroids: Array<asteroids.Asteroid>
  ) {
    this.ship = ship;
    this.asteroids = asteroids;
  }

  static initialState (): State {
    return new State(
      new Ship(20, 20, 0),
      [
        asteroids.big(0, 0),
        asteroids.big(0, CANVAS_HEIGHT - 100),
        asteroids.big(CANVAS_WIDTH - 100, 0),
        asteroids.big(CANVAS_WIDTH - 100, CANVAS_HEIGHT - 100),
      ]
    )
  }
}