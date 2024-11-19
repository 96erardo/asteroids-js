import { State } from "../../shared/State";
import { Entity, EntityType } from "../../shared/types";
import { Point } from "../../shared/objects/Point";
import { 
  CANVAS_HEIGHT, 
  CANVAS_WIDTH,
  BULLET_SPEED,
  BULLET_RADIUS, 
} from "../../shared/constants";
import { ShipStatus } from './Ship';

export class Bullet implements Entity {
  name: EntityType.Bullet;
  status: BulletStatus;
  x: number;
  y: number;
  xSpeed: number;
  ySpeed: number;
  angle: number;
  width: number;
  height: number;

  constructor (
    x: number,
    y: number,
    angle: number,
    xSpeed?: number,
    ySpeed?: number,
    status: BulletStatus = BulletStatus.Free,
  ) {
    this.name = EntityType.Bullet;
    this.status = status;
    this.x = x;
    this.y = y;

    this.angle = angle;

    this.xSpeed = xSpeed || (BULLET_SPEED * Math.cos(angle));
    this.ySpeed = ySpeed || -(BULLET_SPEED * Math.sin(angle));

    this.width = BULLET_RADIUS * 2;
    this.height = BULLET_RADIUS * 2;
  }

  update (dt: number, state: State, keys: Set<string>, cursor: Point): Bullet {
    this.clear();
    
    let x = this.x;
    let y = this.y;

    x += this.xSpeed * dt;
    y += this.ySpeed * dt;

    const bullet = new Bullet(x, y, this.angle, this.xSpeed, this.ySpeed);

    state.quadTree.insert(bullet);

    return bullet;
  }

  draw (ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.status === BulletStatus.Free ? 'white' : 'red';
    ctx.strokeStyle = this.status === BulletStatus.Free ? 'white' : 'red';

    ctx.beginPath();
    ctx.ellipse(this.x, this.y, BULLET_RADIUS, BULLET_RADIUS, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }

  isIn (): boolean {
    return (
      (this.x + this.width) > 0 &&
      (this.x < CANVAS_WIDTH) &&
      (this.y + this.height) > 0 &&
      (this.y < CANVAS_HEIGHT) 
    )
  }

  clear () {
    this.status = BulletStatus.Free;
  }

  onCollision () {
    this.status = BulletStatus.Colliding;
  }
}

export class Bullets {
  list: Array<Bullet>;

  constructor (list: Array<Bullet> = []) {
    this.list = list;
  }
  
  update (dt: number, state: State, keys: Set<string>, cursor: Point): Bullets {
    const list = this.list
      .map(b => b.update(dt, state, keys, cursor))
      .filter(b => b.isIn());

    if (state.ship.status === ShipStatus.Firing) {
      list.push(new Bullet(
          (CANVAS_WIDTH / 2) - BULLET_RADIUS,
          (CANVAS_HEIGHT / 2) - BULLET_RADIUS,
          state.ship.angle
        )
      )
    }
    
    return new Bullets(list);
  }

  draw (ctx: CanvasRenderingContext2D) {
    this.list.forEach(bullet => bullet.draw(ctx));
  }
}

export enum BulletStatus {
  Free = "Free",
  Colliding = "Colliding"
}