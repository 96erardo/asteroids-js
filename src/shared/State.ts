import { Ship } from '../modules/ship/Ship';
import { Bullets } from '../modules/ship/Bullet';
import * as asteroids from '../modules/asteroid/Asteroid';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants';

export class State {
  ship: Ship;
  bullets: Bullets;
  asteroids: Array<asteroids.Asteroid>;

  constructor (
    ship: Ship,
    asteroids: Array<asteroids.Asteroid>,
    bullets: Bullets = new Bullets(),
  ) {
    this.ship = ship;
    this.bullets = bullets,
    this.asteroids = asteroids;
  }

  setShip (ship: Ship) {
    this.ship = ship;
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