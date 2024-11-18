import { State } from './State';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants';

export class Display {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor () {
    this.canvas = document.createElement('canvas');
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;

    this.ctx = this.canvas.getContext('2d');

    document.body.appendChild(this.canvas);
  }

  draw (state: State) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    state.asteroids.forEach(a => a.draw(this.ctx));
    state.bullets.draw(this.ctx);
    state.ship.draw(this.ctx);
  }
}