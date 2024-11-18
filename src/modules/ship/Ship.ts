import { State } from '../../shared/State';
import { Entity } from '../../shared/types';
import { Point } from '../../shared/objects/Point';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../../shared/constants';

export class Ship implements Entity {
  x: number;
  y: number;
  status: ShipStatus;
  passed: number;
  angle: number;
  width: number;
  height: number

  constructor (
    width: number, 
    height: number, 
    angle: number,
    status: ShipStatus = ShipStatus.Ready,
    passed: number = 0,
    x?: number, 
    y?: number
  ) {
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.status = status;
    this.passed = passed;
    
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
    let status = this.status;
    let passed = this.passed;

    const angle = Math.atan2(dy, dx);

    if (this.status === ShipStatus.Ready) {
      if (keys.has('Space')) {
        status = ShipStatus.Firing;
      }
    } else if (this.status === ShipStatus.Firing) {
      status = ShipStatus.Loading;
    
    } else if (this.status === ShipStatus.Loading) {
      passed += dt;

      if (passed > 0.5) {
        status = ShipStatus.Ready;
        passed = 0;
      }
    }

    return new Ship(
      this.width, 
      this.height, 
      angle, 
      status, 
      passed, 
      this.x, 
      this.y
    );
  }

  draw (ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = 'white';

    ctx.save()

    ctx.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    ctx.rotate(-this.angle);

    ctx.beginPath();
    ctx.moveTo(-(this.width / 2), -(this.height / 2));
    ctx.lineTo(this.width / 2, 0);
    ctx.lineTo(-(this.width / 2), this.height / 2);
    ctx.lineTo(-5, 0)
    ctx.lineTo(-(this.width / 2), -(this.height / 2));
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
  }
}

export enum ShipStatus {
  Ready = "Ready",
  Firing = "Firing",
  Loading = "Loading",
}