import { State } from './State';
import { Cursor } from './objects/Cursor';
import { Collision } from './objects/Collision';
import { font } from './assets';

export class Game {
  state: State;
  collision: Collision;
  status: GameStatus;

  constructor () {
    this.state = State.initialState();
    this.collision = new Collision();
    this.status = GameStatus.Running;
  }

  async load () {
    await Promise.all([
      font.load()
    ])

    document.fonts.add(font);
  }

  update (dt: number, keys: Set<string>, cursor: Cursor) {
    this.state.quadTree.clear();

    const ship = this.state.ship.update(dt, this.state, keys, cursor);
    const asteroids = this.state.asteroids.update(dt, this.state, keys, cursor);
    const bullets = this.state.bullets.update(dt, this.state, keys, cursor);
    const saucer = this.state.saucer.update(dt, this.state, keys, cursor);

    this.state = this.collision.detect(
      ship, 
      asteroids, 
      saucer,
      bullets,
      this.state.score,
      this.state.quadTree
    );
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