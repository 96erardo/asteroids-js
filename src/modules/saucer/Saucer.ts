import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../../shared/constants';
import { Timer } from '../../shared/objects/Timer';
import { Cursor } from '../../shared/objects/Cursor';
import { Entity, EntityType } from '../../shared/objects/Entity';
import { State } from '../../shared/State';

export class Saucer implements Entity {
  name: EntityType.Saucer;
  type: SaucerType;
  x: number;
  y: number;
  width: number;
  height: number;
  xSpeed: number;
  ySpeed: number;
  collided: boolean;
  jump: Timer

  constructor (
    type: SaucerType, 
    x: number, 
    y: number,
    xSpeed: number,
    ySpeed: number,
    jump: Timer,
  ) {
    this.name = EntityType.Saucer;
    this.type = type;
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.jump = jump;

    if (this.type === SaucerType.Small) {
      this.width = 30;
      this.height = 20;

    } else {
      this.width = 50;
      this.height = 33;
    }
  }

  static generate (): Saucer {
    const type: SaucerType = Math.round(Math.random() * 2);
    
    const width = type === SaucerType.Small ? 30 : 50;
    const height = type === SaucerType.Small ? 20 : 33;

    const dir = Math.round(Math.random()) === 0 ? 1 : -1;
    
    const x = dir === 1 ? ((width / 2) + 20) : (CANVAS_WIDTH - ((width / 2) + 20));
    const y = Math.round((Math.random() * CANVAS_HEIGHT) - height);
    const jump = new Timer(Math.round(Math.random() * 3 + 2), 0, 'running');

    
    return new Saucer(type, x, y, dir * 100, 0, jump);
  }

  update(dt: number, state: State, keys: Set<string>, cursor: Cursor): Saucer {
    let x = this.x;
    let y = this.y;
    let jump = this.jump;
    let ySpeed = this.ySpeed;

    if (x + (this.width / 2) > CANVAS_WIDTH) {
      x = -(this.width / 2);
    
    } else if (x + (this.width / 2) < 0) {
      x = CANVAS_WIDTH - (this.width - 2);
    }

    if (y + (this.height / 2) < 0) {
      y = CANVAS_HEIGHT - (this.height / 2)
    
    } else if (y + (this.height / 2) > CANVAS_HEIGHT) {
      y = -(this.height / 2)
    }

    if (jump.isRunning()) {
      jump = jump.update(dt);

      if (jump.isCompleted()) {
        const dir = Math.round(Math.random()) === 0 ? 1 : -1;

        if (ySpeed === 0) {
          ySpeed = dir * 100;

        } else {
          ySpeed = 0;
        }

        jump = new Timer(Math.round(Math.random() * 3 + 2), 0, 'running');
      }
    }

    x += dt * this.xSpeed;
    y += dt * ySpeed;

    return new Saucer(this.type, x, y, this.xSpeed, ySpeed, jump);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.strokeStyle = 'green';
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    if (this.type === SaucerType.Small) {
      ctx.strokeStyle = 'white';

      ctx.moveTo(this.x, this.y + 12)
      ctx.lineTo(this.x + 3, this.y + 12)
      ctx.lineTo(this.x + 11, this.y + 7)
      ctx.lineTo(this.x + 13, this.y);
      ctx.lineTo(this.x + 17, this.y);
      ctx.lineTo(this.x + 19, this.y + 7);
      ctx.lineTo(this.x + 27, this.y + 12);
      ctx.lineTo(this.x + 30, this.y + 12);
      ctx.lineTo(this.x + 30, this.y + 15);
      ctx.lineTo(this.x + 27, this.y + 15);
      ctx.lineTo(this.x + 19, this.y + 20);
      ctx.lineTo(this.x + 11, this.y + 20);
      ctx.lineTo(this.x + 3, this.y + 15);
      ctx.lineTo(this.x, this.y + 15);
      ctx.lineTo(this.x, this.y + 12);
  
      ctx.moveTo(this.x  + 11, this.y + 7);
      ctx.lineTo(this.x  + 19, this.y + 7);
      
      ctx.stroke();

      ctx.fillStyle = 'rgba(255, 255, 255, .8)';
  
      ctx.fillRect(this.x, this.y + 12, this.width, 3)
    
    } else {
      ctx.strokeStyle = 'white';

      ctx.moveTo(this.x, this.y + 19)
      ctx.lineTo(this.x + 4, this.y + 19)
      ctx.lineTo(this.x + 18, this.y + 10)
      ctx.lineTo(this.x + 20, this.y);
      ctx.lineTo(this.x + 30, this.y);
      ctx.lineTo(this.x + 32, this.y + 10);
      ctx.lineTo(this.x + 46, this.y + 19);
      ctx.lineTo(this.x + 50, this.y + 19);
      ctx.lineTo(this.x + 50, this.y + 24);
      ctx.lineTo(this.x + 46, this.y + 24);
      ctx.lineTo(this.x + 32, this.y + 33);
      ctx.lineTo(this.x + 18, this.y + 33);
      ctx.lineTo(this.x + 4, this.y + 24);
      ctx.lineTo(this.x, this.y + 24);
      ctx.lineTo(this.x, this.y + 19);
  
      ctx.moveTo(this.x + 19, this.y + 10);
      ctx.lineTo(this.x + 31, this.y + 10);
      
      ctx.stroke();
  
      ctx.fillStyle = 'rgba(255, 255, 255, .8)';
  
      ctx.fillRect(this.x, this.y + 19, this.width, 5)

    }
  }

  onCollision(): void {
    
  }
}

export enum SaucerType {
  Small,
  Large
}