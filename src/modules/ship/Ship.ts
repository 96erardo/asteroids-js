import { State } from '../../shared/State';
import { Entity, EntityType } from '../../shared/objects/Entity';
import { Cursor } from '../../shared/objects/Cursor';
import { 
  CANVAS_WIDTH, 
  CANVAS_HEIGHT,
  SHIP_ACC,
  SHIP_DECC,
  SHIP_MAX_VEL,
} from '../../shared/constants';

export class Ship implements Entity {
  name: EntityType.Ship;
  collided: boolean;
  x: number;
  y: number;
  xSpeed: number;
  ySpeed: number;
  status: ShipStatus;
  passed: number;
  angle: number;
  width: number;
  height: number

  constructor (
    x: number | null, 
    y: number | null,
    xSpeed: number,
    ySpeed: number,
    width: number, 
    height: number, 
    angle: number,
    status: ShipStatus = ShipStatus.Ready,
    passed: number = 0,
    collided: boolean = false,
  ) {
    this.name = EntityType.Ship;
    this.x = x || (CANVAS_WIDTH / 2 - (width / 2));
    this.y = y || (CANVAS_HEIGHT / 2 - (height / 2));
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.status = status;
    this.passed = passed;
  }

  update (dt: number, state: State, keys: Set<string>, cursor: Cursor): Ship {
    let x = this.x;
    let y = this.y;
    let xSpeed = this.xSpeed;
    let ySpeed = this.ySpeed;
    const dx = cursor.point.x - (x + (this.width / 2))
    const dy = - (cursor.point.y - (y + (this.height / 2)))
    let status = this.status;
    let passed = this.passed;

    const angle = Math.atan2(dy, dx);

    if (this.status === ShipStatus.Ready) {
      if (cursor.isClicked()) {
        status = ShipStatus.Firing;
      }
    } else if (this.status === ShipStatus.Firing) {
      status = ShipStatus.Loading;
    
    } else if (this.status === ShipStatus.Loading) {
      passed += dt;

      if (passed > 0.30) {
        status = ShipStatus.Ready;
        passed = 0;
      }
    }

    if (keys.has('Space')) {
      const xAcc = SHIP_ACC * Math.cos(angle);
      const yAcc = SHIP_ACC * Math.sin(-angle);

      xSpeed = xAcc > 0 ? Math.min(100, xSpeed + (xAcc * dt)) : Math.max(-100, xSpeed + (xAcc * dt));
      ySpeed = yAcc > 0 ? Math.min(100, ySpeed + (yAcc * dt)) : Math.max(-100, ySpeed + (yAcc * dt));
    
    } else {
      if (xSpeed !== 0) {
        xSpeed = xSpeed > 0 ? Math.max(0, xSpeed - (SHIP_DECC * dt)) : Math.min(0, xSpeed + (SHIP_DECC * dt));
      }

      if (ySpeed != 0) {
        ySpeed = ySpeed > 0 ? Math.max(0, ySpeed - (SHIP_DECC * dt)) : Math.min(0, ySpeed + (SHIP_DECC * dt));
      }
    }

    x += xSpeed * dt;
    y += ySpeed * dt;

    const ship = new Ship(
      x,
      y,
      xSpeed,
      ySpeed,
      this.width, 
      this.height, 
      angle, 
      status, 
      passed
    );

    state.quadTree.insert(ship);

    return ship;
  }

  draw (ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = 'green';
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    if (this.status === ShipStatus.Colliding) {
      ctx.strokeStyle = 'red';
    } else {
      ctx.strokeStyle = 'white';
    }

    ctx.save()

    ctx.translate(this.x + (this.width / 2), this.y + (this.height / 2));
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

  onCollision () {
    this.collided = true;
  }
}

export enum ShipStatus {
  Ready = "Ready",
  Firing = "Firing",
  Loading = "Loading",
  Colliding = "Colliding"
}