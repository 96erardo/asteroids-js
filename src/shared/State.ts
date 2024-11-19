import { Ship } from '../modules/ship/Ship';
import { Bullets } from '../modules/ship/Bullet';
import { QuadTree } from './objects/QuadTree';
import * as asteroids from '../modules/asteroid/Asteroid';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants';

export class State {
  ship: Ship;
  bullets: Bullets;
  asteroids: Array<asteroids.Asteroid>;
  quadTree: QuadTree;

  constructor (
    ship: Ship,
    asteroids: Array<asteroids.Asteroid>,
    bullets: Bullets = new Bullets(),
    quadTree: QuadTree = new QuadTree()
  ) {
    this.ship = ship;
    this.bullets = bullets,
    this.asteroids = asteroids;
    this.quadTree = quadTree;
  }

  setShip (ship: Ship) {
    this.ship = ship;
  }

  static initialState (): State {
    return new State(
      new Ship(20, 20, 0),
      [
        asteroids.big(5, 5),
        asteroids.big(5, CANVAS_HEIGHT - 105),
        asteroids.big(CANVAS_WIDTH - 105, 5),
        asteroids.big(CANVAS_WIDTH - 105, CANVAS_HEIGHT - 105),
      ]
    )
  }
}