import { Entity, EntityType } from "../../shared/objects/Entity";
import { AsteroidShape, AsteroidSize, genenerateShape, drawShape } from './graphics';
import { State } from "../../shared/State";
import { Cursor } from "../../shared/objects/Cursor";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../shared/constants";

export class Asteroid implements Entity {
  name: EntityType.Asteroid
  shape: AsteroidShape;
  size: AsteroidSize;
  collided: boolean;
  x: number;
  y: number;
  xSpeed: number;
  ySpeed: number;
  width: number;
  height: number;

  constructor (
    x: number, 
    y: number,
    shape: AsteroidShape,
    size: AsteroidSize,
    xSpeed: number,
    ySpeed: number,
  ) {
    this.name = EntityType.Asteroid;
    this.shape = shape;
    this.size = size;
    this.collided = false;
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.width = size;
    this.height = size;
  }

  update (dt: number, state: State, keys: Set<string>, cursor: Cursor): Asteroid {
    let x = this.x;
    let y = this.y;
    let xSpeed = this.xSpeed;
    let ySpeed = this.ySpeed;
    let xOut = 0;
    let yOut = 0;

    x += dt * xSpeed;
    y += dt * ySpeed;

    if (x < 0) {
      xOut = -x;
    } else if ((x + this.width) > CANVAS_WIDTH) {
      xOut = (x + this.width) - CANVAS_WIDTH;
    }

    if (y < 0) {
      yOut = -y;
    } else if ((y + this.height) > CANVAS_HEIGHT) {
      yOut = (y + this.height) - CANVAS_HEIGHT;
    }

    if (
      (xOut > this.width / 2) ||
      (yOut > this.height / 2)
    ) {
      if (xOut > yOut) {
        x = x < 0 ? CANVAS_WIDTH - (this.width / 2) : -(this.width / 2);
      } else {
        y = y < 0 ? CANVAS_HEIGHT - (this.height / 2) : -(this.height / 2);
      }
    }

    const asteroid = new Asteroid(x, y, this.shape, this.size, xSpeed, ySpeed);

    state.quadTree.insert(asteroid);

    return asteroid;
  }

  spread (): Array<Asteroid> {
    if (this.size === AsteroidSize.Small) {
      return []
    } else if (this.size === AsteroidSize.Medium) {
      const rand1 = Math.random();
      const rand2 = Math.random();
      const greater = this.xSpeed > this.ySpeed ? 'x' : 'y';
      
      const xSpeed1 = Math.round((rand1 * 30) + 50);
      const ySpeed1 = Math.round((rand1 * 30) + 50);

      const xSpeed2 = Math.round((rand2 * 30) + 50)
      const ySpeed2 = Math.round((rand2 * 30) + 50)

      return [
        new Asteroid(
          this.x + (this.width / 2) - (AsteroidSize.Small / 2),
          this.y + (this.width / 2) - (AsteroidSize.Small / 2),
          genenerateShape(),
          AsteroidSize.Small,
          xSpeed1,
          ySpeed1, 
        ),
        new Asteroid(
          this.x + (this.width / 2) - (AsteroidSize.Small / 2),
          this.y + (this.width / 2) - (AsteroidSize.Small / 2), 
          genenerateShape(),
          AsteroidSize.Small,
          greater === 'x' ? xSpeed2 : -xSpeed2,
          greater === 'y' ? ySpeed2 : -ySpeed2, 
        ),
      ]
    } else {
      const rand1 = Math.random();
      const rand2 = Math.random();
      const greater = this.xSpeed > this.ySpeed ? 'x' : 'y';
      
      const xSpeed1 = Math.round((rand1 * 30) + 30);
      const ySpeed1 = Math.round((rand1 * 30) + 30);

      const xSpeed2 = Math.round((rand2 * 30) + 30);
      const ySpeed2 = Math.round((rand2 * 30) + 30);

      return [
        new Asteroid(
          this.x + (this.width / 2) - (AsteroidSize.Medium / 2),
          this.y + (this.width / 2) - (AsteroidSize.Medium / 2),
          genenerateShape(),
          AsteroidSize.Medium,
          xSpeed1,
          ySpeed1,
        ),
        new Asteroid(
          this.x + (this.width / 2) - (AsteroidSize.Medium / 2),
          this.y + (this.width / 2) - (AsteroidSize.Medium / 2),
          genenerateShape(),
          AsteroidSize.Medium,
          greater === 'x' ? xSpeed2 : -xSpeed2,
          greater === 'y' ? ySpeed2 : -ySpeed2, 
        ),
      ]
    }
  }

  draw (ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = 'green';
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    drawShape(ctx, this);
  }

  onCollision () {
    this.collided = true;
  }
}

export enum AsteroidStatus {
  Free = "Free",
  Colliding = "Colliding"
}


export function big (x: number, y: number): Asteroid {
  const xDir = Math.round(Math.random()) === 0 ? -1 : 1;
  const yDir = Math.round(Math.random()) === 0 ? -1 : 1;

  const xSpeed = xDir * Math.round(Math.random() * 30 + 20);
  const ySpeed = yDir * Math.round(Math.random() * 30 + 20);

  return new Asteroid(x, y, genenerateShape(), AsteroidSize.Large, xSpeed, ySpeed)
}

export function medium (x: number, y: number): Asteroid {
  const xSpeed = 150;  
  const ySpeed = 150;

  return new Asteroid(x, y, genenerateShape(), AsteroidSize.Medium, xSpeed, ySpeed)
}

export function small (x: number, y: number): Asteroid {
  const xSpeed = 200;
  const ySpeed = 200;

  return new Asteroid(x, y, genenerateShape(), AsteroidSize.Small, xSpeed, ySpeed)
}