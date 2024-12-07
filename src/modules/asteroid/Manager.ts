import { Asteroid } from './Asteroid';
import { State } from '../../shared/State';
import { Cursor } from '../../shared/objects/Cursor';

export class Manager {
  asteroids: Array<Asteroid>;

  constructor (asteroids: Array<Asteroid>) {
    this.asteroids = asteroids;
  }

  update (dt: number, state: State, keys: Set<string>, cursor: Cursor): Manager {
    const asteroids = this.asteroids.reduce((acum, asteroid) => {
      if (asteroid.collided) {
        const remainings = asteroid.spread().map(a => a.update(dt, state, keys, cursor))

        acum.push(...remainings);
      
      } else {
        acum.push(asteroid.update(dt, state, keys, cursor));
      }

      return acum;
    }, [])
  
    return new Manager(asteroids);
  }

  draw (ctx: CanvasRenderingContext2D) {
    this.asteroids.forEach(asteroid => asteroid.draw(ctx));
  }
}