import { Ship } from '../modules/ship/Ship';
import { Bullets } from '../modules/ship/Bullet';
import { Score } from './objects/Score';
import { QuadTree } from './objects/QuadTree';
import * as asteroids from '../modules/asteroid/Asteroid';
import { Manager as AsteroidsManager } from '../modules/asteroid/Manager';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants';

export class State {
  ship: Ship;
  bullets: Bullets;
  asteroids: AsteroidsManager;
  score: Score;
  quadTree: QuadTree;

  constructor (
    ship: Ship,
    asteroids: AsteroidsManager,
    score: Score = new Score(),
    bullets: Bullets = new Bullets(),
    quadTree: QuadTree = new QuadTree()
  ) {
    this.ship = ship;
    this.bullets = bullets;
    this.score = score;
    this.asteroids = asteroids;
    this.quadTree = quadTree;
  }

  static initialState (): State {
    return new State(
      new Ship(3, null, null, 0, 0),
      new AsteroidsManager([
        asteroids.big(5, 5),
        asteroids.big(5, CANVAS_HEIGHT - 105),
        asteroids.big(CANVAS_WIDTH - 105, 5),
        asteroids.big(CANVAS_WIDTH - 105, CANVAS_HEIGHT - 105),
      ])
    )
  }
}