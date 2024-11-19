import { State } from './State';
import { Point } from './objects/Point';
import { Collision } from './objects/Collision';

export class Game {
  state: State;
  collision: Collision;
  status: GameStatus;

  constructor () {
    this.state = State.initialState();
    this.collision = new Collision();
    this.status = GameStatus.Running;
  }

  update (dt: number, keys: Set<string>, cursor: Point) {
    this.state.quadTree.clear();

    const ship = this.state.ship.update(dt, this.state, keys, cursor);
    
    const asteroids = this.state.asteroids.map(asteroid => asteroid.update(
      dt, this.state, keys, cursor
    ));

    const bullets = this.state.bullets.update(dt, this.state, keys, cursor);

    this.state = this.collision.detect(ship, asteroids, bullets, this.state.quadTree);
  }

  pause (): void {
    this.status = GameStatus.Paused;
  }

  resume (): void {
    this.status = GameStatus.Running;
  }

  isPaused (): boolean {
    return this.status === GameStatus.Paused;
  }
}

export enum GameStatus {
  Running = "Running",
  Paused = "Paused",
  Ended = "Ended"
}