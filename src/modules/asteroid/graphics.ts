import { Asteroid } from './Asteroid';

export enum AsteroidShape {
  One,
  Two,
  Three
}

export enum AsteroidSize {
  Small = 15,
  Medium = 35,
  Large = 75,
}

export function genenerateShape (): AsteroidShape {
  return Math.round(Math.random() * 2) as AsteroidShape;
}

export function drawShape (
  ctx: CanvasRenderingContext2D,
  asteroid: Asteroid,           
) {
  const bigger = asteroid.size === AsteroidSize.Small ? 0 : 5;


  switch (asteroid.shape) {
    case AsteroidShape.One:
      return shape1(
        ctx, 
        asteroid.x - (bigger), 
        asteroid.y - (bigger), 
        asteroid.width + (bigger * 2), 
        asteroid.height + (bigger * 2)
      )
    case AsteroidShape.Two: 
      return shape2(
        ctx, 
        asteroid.x - (bigger), 
        asteroid.y - (bigger), 
        asteroid.width + (bigger * 2), 
        asteroid.height + (bigger * 2)
      )
    case AsteroidShape.Three:
      return shape3(
        ctx, 
        asteroid.x - (bigger), 
        asteroid.y - (bigger), 
        asteroid.width + (bigger * 2), 
        asteroid.height + (bigger * 2)
      )
    default:
      console.log('default')
  }
}

export function shape1 (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
) {
  ctx.strokeStyle = 'white';
  const oW = 113;
  const oH = 115;
  const wRatio = width / oW;
  const hRatio = height / oH;

  ctx.beginPath()
  ctx.moveTo(x, y + Math.round(32 * hRatio));
  ctx.lineTo(x + Math.round(32 * wRatio), y + Math.round(1 * hRatio));
  ctx.lineTo(x + Math.round(58 * wRatio), y + Math.round(19 * hRatio));
  ctx.lineTo(x + Math.round(84 * wRatio), y + Math.round(0 * hRatio));
  ctx.lineTo(x + width, y + Math.round(32 * hRatio));
  ctx.lineTo(x + Math.round(90 * wRatio), y + Math.round(48 * hRatio));
  ctx.lineTo(x + width - (2 * wRatio), y + Math.round(71 * hRatio));
  ctx.lineTo(x + Math.round(83 * wRatio), y + height - (2 * hRatio));
  ctx.lineTo(x + Math.round(44 * wRatio), y + Math.round(98 * hRatio));
  ctx.lineTo(x + Math.round(31 * wRatio), y+ height);
  ctx.lineTo(x, y + Math.round(83 * hRatio));
  ctx.lineTo(x + Math.round(18 * wRatio), y + Math.round(58 * hRatio));
  ctx.lineTo(x, y + Math.round(32 * hRatio));
  ctx.stroke();
  ctx.closePath();
}

export function shape2 (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
) {
  ctx.strokeStyle = 'white';
  const oW = 110;
  const oH = 111;
  const wRatio = width / oW;
  const hRatio = height / oH;

  ctx.beginPath()
  ctx.moveTo(x, y + Math.round(27 * hRatio));
  ctx.lineTo(x + Math.round(40 * wRatio), y + Math.round(27 * hRatio));
  ctx.lineTo(x + Math.round(26 * wRatio), y);
  ctx.lineTo(x + Math.round(69 * wRatio), y);
  ctx.lineTo(x + width, y + Math.round(30 * hRatio));
  ctx.lineTo(x + width - Math.round(5 * wRatio), y + Math.round(47 * hRatio));
  ctx.lineTo(x + width - Math.round(5 * wRatio), y + Math.round(47 * hRatio));
  ctx.lineTo(x + Math.round(74 * wRatio), y + Math.round(60 * hRatio));
  ctx.lineTo(x + width, y + Math.round(82 * hRatio));
  ctx.lineTo(x + Math.round(83 * wRatio), y + height - Math.round(3 * hRatio));
  ctx.lineTo(x + Math.round(66 * wRatio), y + Math.round(99 * hRatio));
  ctx.lineTo(x + Math.round(27 * wRatio), y + height);
  ctx.lineTo(x, y + Math.round(72 * hRatio));
  ctx.lineTo(x, y + Math.round(27 * hRatio));
  ctx.stroke();
  ctx.closePath();
}

export function shape3 (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
) {
  ctx.strokeStyle = 'white';
  const oW = 113;
  const oH = 111;
  const wRatio = width / oW;
  const hRatio = height / oH;

  ctx.beginPath()
  ctx.moveTo(x, y + Math.round(42 * hRatio));
  ctx.lineTo(x + Math.round(42 * wRatio), y);
  ctx.lineTo(x + Math.round(83 * wRatio), y);
  ctx.lineTo(x + width, y + Math.round(40 * wRatio));
  ctx.lineTo(x + width, y + Math.round(71 * wRatio));
  ctx.lineTo(x + Math.round(85 * wRatio), y + height - Math.round(5 * hRatio));
  ctx.lineTo(x + Math.round(85 * wRatio), y + Math.round(64 * hRatio));
  ctx.lineTo(x + Math.round(30 * wRatio), y + height);
  ctx.lineTo(x, y + Math.round(68 * hRatio));
  ctx.lineTo(x + Math.round(30 * wRatio), y + Math.round(57 * hRatio));
  ctx.lineTo(x, y + Math.round(42 * hRatio));
  ctx.stroke();
  ctx.closePath();
}