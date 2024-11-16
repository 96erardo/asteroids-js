import { Entity } from "../../shared/types";
import { State } from "../../shared/State";
import { Point } from "../../shared/objects/Point";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../shared/constants";

export class Asteroid implements Entity {
  x: number;
  y: number;
  xSpeed: number;
  ySpeed: number;
  width: number;
  height: number;

  constructor (
    x: number, 
    y: number,
    xSpeed: number,
    ySpeed: number,
    width: number, 
    height: number
  ) {
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.width = width;
    this.height = height;
  }

  update (dt: number, state: State, keys: Set<string>, cursor: Point): Asteroid {
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

    return new Asteroid(x, y, xSpeed, ySpeed, this.width, this.height);
  }

  draw (ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = 'white';
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}


export function big (x: number, y: number): Asteroid {
  const xDir = Math.round(Math.random()) === 0 ? -1 : 1;
  const yDir = Math.round(Math.random()) === 0 ? -1 : 1;

  const xSpeed = xDir * Math.round(Math.random() * 10 + 20);
  const ySpeed = yDir * Math.round(Math.random() * 10 + 20);

  return new Asteroid(x, y, xSpeed, ySpeed, 100, 100)
}

export function medium (x: number, y: number): Asteroid {
  const xSpeed = 150;
  const ySpeed = 150;

  return new Asteroid(x, y, xSpeed, ySpeed, 75, 75)
}

export function small (x: number, y: number): Asteroid {
  const xSpeed = 200;
  const ySpeed = 200;

  return new Asteroid(x, y, xSpeed, ySpeed, 35, 35)
}