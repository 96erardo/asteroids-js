import { Entity, EntityType } from "../../shared/objects/Entity";
import { AsteroidShape, genenerateShape, drawShape } from './graphics';
import { State } from "../../shared/State";
import { Cursor } from "../../shared/objects/Cursor";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../shared/constants";

export class Asteroid implements Entity {
  name: EntityType.Asteroid
  shape: AsteroidShape;
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
    xSpeed: number,
    ySpeed: number,
    width: number, 
    height: number,
  ) {
    this.name = EntityType.Asteroid;
    this.shape = shape;
    this.collided = false;
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.width = width;
    this.height = height;
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

    const asteroid = new Asteroid(x, y, this.shape, xSpeed, ySpeed, this.width, this.height);

    state.quadTree.insert(asteroid);

    return asteroid;
  }

  spread (): Array<Asteroid> {
    if (this.width === 35) {
      return []
    } else if (this.width === 75) {
      const factor1 = Math.random() * 2.5;
      const factor2 = Math.random() * 2.5;
      const greater = this.xSpeed > this.ySpeed ? 'x' : 'y';
      
      const xSpeed1 = Math.min(Math.max(20, this.xSpeed * factor1), 50);
      const ySpeed1 = Math.min(Math.max(20, this.xSpeed * factor1), 50);

      const xSpeed2 = Math.min(Math.max(20, this.xSpeed * factor2), 50);
      const ySpeed2 = Math.min(Math.max(20, this.xSpeed * factor2), 50);

      return [
        new Asteroid(
          this.x + (this.width / 2) - (35 / 2),
          this.y + (this.width / 2) - (35 / 2),
          genenerateShape(),
          xSpeed1,
          ySpeed1, 
          35, 
          35
        ),
        new Asteroid(
          this.x + (this.width / 2) - (35 / 2),
          this.y + (this.width / 2) - (35 / 2), 
          genenerateShape(),
          greater === 'x' ? xSpeed2 : -xSpeed2,
          greater === 'y' ? ySpeed2 : -ySpeed2, 
          35, 
          35
        ),
      ]
    } else {
      const factor1 = Math.random() * 4;
      const factor2 = Math.random() * 4;
      const greater = this.xSpeed > this.ySpeed ? 'x' : 'y';
      
      const xSpeed1 = Math.min(Math.max(20, this.xSpeed * factor1), 50);
      const ySpeed1 = Math.min(Math.max(20, this.xSpeed * factor1), 50);

      const xSpeed2 = Math.min(Math.max(20, this.xSpeed * factor2), 50);
      const ySpeed2 = Math.min(Math.max(20, this.xSpeed * factor2), 50);

      return [
        new Asteroid(
          this.x + (this.width / 2) - (75 / 2),
          this.y + (this.width / 2) - (75 / 2),
          genenerateShape(),
          xSpeed1,
          ySpeed1,
          75,
          75
        ),
        new Asteroid(
          this.x + (this.width / 2) - (75 / 2),
          this.y + (this.width / 2) - (75 / 2),
          genenerateShape(),
          greater === 'x' ? xSpeed2 : -xSpeed2,
          greater === 'y' ? ySpeed2 : -ySpeed2, 
          75, 
          75
        ),
      ]
    }
  }

  draw (ctx: CanvasRenderingContext2D) {
    // ctx.strokeStyle = 'green';
    // ctx.strokeRect(this.x, this.y, this.width, this.height);
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

  return new Asteroid(x, y, genenerateShape(), xSpeed, ySpeed, 100, 100)
}

export function medium (x: number, y: number): Asteroid {
  const xSpeed = 150;
  const ySpeed = 150;

  return new Asteroid(x, y, genenerateShape(), xSpeed, ySpeed, 75, 75)
}

export function small (x: number, y: number): Asteroid {
  const xSpeed = 200;
  const ySpeed = 200;

  return new Asteroid(x, y, genenerateShape(), xSpeed, ySpeed, 35, 35)
}