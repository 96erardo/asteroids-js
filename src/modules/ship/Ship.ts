import { State } from '../../shared/State';
import { Entity } from '../../shared/types';
import { Point } from '../../shared/objects/Point';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../../shared/constants';

export class Ship implements Entity {
  x: number;
  y: number;
  angle: number;
  width: number;
  height: number

  constructor (width: number, height: number, angle: number, x?: number, y?: number) {
    this.width = width;
    this.height = height;
    this.angle = angle;
    
    if (x !== undefined && y !== undefined) {
      this.x = x;
      this.y = y;
    } else {
      this.x = CANVAS_WIDTH / 2 - (width / 2)
      this.y = CANVAS_HEIGHT / 2 - (height / 2)
    }
  }

  update (dt: number, state: State, keys: Set<string>, cursor: Point): Ship {
    const dx = cursor.x - (CANVAS_WIDTH / 2)
    const dy = - (cursor.y - (CANVAS_HEIGHT / 2))

    const angle = dx > 0 ? (Math.atan(dy / dx) - 1.5708) : (Math.atan(dy / dx) + 1.5708);

    return new Ship(this.width, this.height, angle, this.x, this.y);
  }

  draw (ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = 'white';

    ctx.save()

    ctx.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    ctx.rotate(-this.angle);

    ctx.beginPath();
    ctx.moveTo(-(this.width / 2), this.height / 2);
    ctx.lineTo(0, -(this.height / 2));
    ctx.lineTo(this.width / 2, this.height / 2);
    ctx.lineTo(0, 5)
    ctx.lineTo(-(this.width / 2), this.height / 2);
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
  }
}