import { State } from "../../shared/State";
import { Entity, EntityType } from "../../shared/objects/Entity";
import { Cursor } from "../../shared/objects/Cursor";
import { 
  CANVAS_HEIGHT, 
  CANVAS_WIDTH,
  BULLET_SPEED,
  BULLET_RADIUS, 
} from "../../shared/constants";

export class Bullet implements Entity {
  name: EntityType.Bullet;
  collided: boolean;
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
    ySpeed?: number
  ) {
    this.name = EntityType.Bullet;
    this.collided = false;
    this.x = x;
    this.y = y;

    this.angle = angle;

    this.xSpeed = xSpeed || (BULLET_SPEED * Math.cos(angle));
    this.ySpeed = ySpeed || -(BULLET_SPEED * Math.sin(angle));

    this.width = BULLET_RADIUS * 2;
    this.height = BULLET_RADIUS * 2;
  }

  update (dt: number, state: State, keys: Set<string>, cursor: Cursor): Bullet {
    let x = this.x;
    let y = this.y;

    x += this.xSpeed * dt;
    y += this.ySpeed * dt;

    const bullet = new Bullet(x, y, this.angle, this.xSpeed, this.ySpeed);

    state.quadTree.insert(bullet);

    return bullet;
  }

  draw (ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.collided === false ? 'white' : 'red';
    ctx.strokeStyle = this.collided === false ? 'white' : 'red';

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

  onCollision () {
    this.collided = true;
  }
}

export class Bullets {
  list: Array<Bullet>;

  constructor (list: Array<Bullet> = []) {
    this.list = list;
  }
  
  update (dt: number, state: State, keys: Set<string>, cursor: Cursor): Bullets {
    const list = this.list
      .filter(b => b.collided === false)
      .map(b => b.update(dt, state, keys, cursor))
      .filter(b => b.isIn());

    if (state.ship.firing) {
      list.push(new Bullet(
          state.ship.x + (state.ship.width / 2) - BULLET_RADIUS,
          state.ship.y + (state.ship.height / 2) - BULLET_RADIUS,
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