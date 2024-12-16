import { State } from '../../shared/State';
import { Entity, EntityType } from '../../shared/objects/Entity';
import { Cursor } from '../../shared/objects/Cursor';
import { drawShip } from './graphics';
import { Timer } from '../../shared/objects/Timer';
import { 
  CANVAS_WIDTH, 
  CANVAS_HEIGHT,
  SHIP_ACC,
  SHIP_DECC,
} from '../../shared/constants';

export class Ship implements Entity {
  name: EntityType.Ship;
  lives: number;
  x: number;
  y: number;
  width: number;
  height: number;
  xSpeed: number;
  ySpeed: number;
  angle: number;
  status: ShipStatus;
  firing: boolean;
  recharge: Timer;
  respawn: Timer;
  collided: boolean;

  constructor (
    lives: number,
    x: number | null, 
    y: number | null,
    xSpeed: number,
    ySpeed: number,
    angle: number = 0,
    status: ShipStatus = ShipStatus.Alive,
    recharge: Timer = new Timer(0.3),
    respawn: Timer = new Timer(1),
    firing: boolean = false,
  ) {
    this.name = EntityType.Ship;
    this.lives = lives;
    this.x = x || (CANVAS_WIDTH / 2 - (20 / 2));
    this.y = y || (CANVAS_HEIGHT / 2 - (20 / 2));
    this.width = 20;
    this.height = 20;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.angle = angle;
    this.status = status;
    this.recharge = recharge;
    this.respawn = respawn;
    this.firing = firing;
  }

  update (dt: number, state: State, keys: Set<string>, cursor: Cursor): Ship {
    let x = this.x;
    let y = this.y;
    let xSpeed = this.xSpeed;
    let ySpeed = this.ySpeed;
    let firing = this.firing;
    let status = this.status;
    let recharge = this.recharge;
    let respawn = this.respawn;
    
    const dx = cursor.point.x - (x + (this.width / 2))
    const dy = - (cursor.point.y - (y + (this.height / 2)))
    const angle = Math.atan2(dy, dx);

    if (recharge.isCompleted() && status === ShipStatus.Alive) {
      if (cursor.isClicked()) {
        firing = true;
        recharge.start();
      }
    } else {
      recharge = recharge.update(dt);
    }

    if (respawn.isRunning()) {
      status = ShipStatus.Dead;
      respawn = respawn.update(dt);
    }
    
    if (this.firing) {
      firing = false;
    }

    if (status === ShipStatus.Dead) {
      xSpeed = 0;
      ySpeed = 0;

    } else if (keys.has('Space')) {
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
      this.lives,
      x,
      y,
      xSpeed,
      ySpeed,
      angle,
      status,
      recharge, 
      respawn,
      firing,
    );

    state.quadTree.insert(ship);

    return ship;
  }

  reset () {
    this.x = CANVAS_WIDTH / 2 - (20 / 2);
    this.y = CANVAS_HEIGHT / 2 - (20 / 2);
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.status = ShipStatus.Alive;
  }

  draw (ctx: CanvasRenderingContext2D) {
    let x = 20;
    let y = 60;

    for (let i = 0; i < this.lives; i++) {
      drawShip(x, y, this, ctx);
      
      x += this.width;
    }

    if (this.status === ShipStatus.Dead) {
      return;
    }

    ctx.strokeStyle = 'green';
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    
    ctx.strokeStyle = 'white';
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
    this.lives = Math.max(this.lives - 1, 0);
    this.respawn.start();
  }
}

export enum ShipStatus {
  Alive = "Alive",
  Dead = "Dead"
}