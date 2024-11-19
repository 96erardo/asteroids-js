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
    this.x = x;
    this.y = y;

    this.angle = angle;

    this.xSpeed = xSpeed || (BULLET_SPEED * Math.cos(angle));
    this.ySpeed = ySpeed || -(BULLET_SPEED * Math.sin(angle));

    this.width = BULLET_RADIUS * 2;
    this.height = BULLET_RADIUS * 2;
  }

  update (dt: number, state: State, keys: Set<string>, cursor: Point): Bullet {
    let x = this.x;
    let y = this.y;

    x += this.xSpeed * dt;
    y += this.ySpeed * dt;

    const bullet = new Bullet(x, y, this.angle, this.xSpeed, this.ySpeed);

    state.quadTree.insert(bullet);

    return bullet;
  }

  draw (ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';

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
}

export class Bullets {
  bullets: Array<Bullet>;

  constructor (bullets: Array<Bullet> = []) {
    this.bullets = bullets;
  }
  
  update (dt: number, state: State, keys: Set<string>, cursor: Point): Bullets {
    const bullets = this.bullets
      .map(b => b.update(dt, state, keys, cursor))
      .filter(b => b.isIn());

    if (state.ship.status === ShipStatus.Firing) {
      bullets.push(new Bullet(
          (CANVAS_WIDTH / 2) - BULLET_RADIUS,
          (CANVAS_HEIGHT / 2) - BULLET_RADIUS,
          state.ship.angle
        )
      )
    }
    
    return new Bullets(bullets);
  }

  draw (ctx: CanvasRenderingContext2D) {
    this.bullets.forEach(bullet => bullet.draw(ctx));
  }
}