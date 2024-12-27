import { Saucer, SaucerType } from './Saucer';
import { State } from '../../shared/State';
import { Cursor } from '../../shared/objects/Cursor';
import { Timer } from '../../shared/objects/Timer';

export class Manager {
  saucer: Saucer | null;
  timer: Timer | null;

  constructor (saucer: Saucer = null, timer: Timer = null) {
    this.saucer = saucer;
    this.timer = timer;
  }

  update(dt: number, state: State, keys: Set<string>, cursor: Cursor): Manager {
    let timer = this.timer;
    let saucer = this.saucer;

    if (!timer && !saucer) {
      const time = Math.round((Math.random() * 30) + 20);

      saucer = null;
      timer = new Timer(time, 0, 'running');

      return new Manager(saucer, timer);
    } 

    timer = timer.update(dt);

    if (timer.isCompleted() && !saucer) {
      saucer = Saucer.generate();
    }

    if (saucer) {
      if (saucer.collided) {
        saucer = null;
        timer = null;
      
      } else {
        saucer = saucer.update(dt, state, keys, cursor);
      }
    }

    return new Manager(saucer, timer);
  }
}