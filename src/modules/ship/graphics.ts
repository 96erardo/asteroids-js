import { Ship } from './Ship';

export function drawShip (
  x: number, 
  y: number, 
  ship: Ship, 
  ctx: CanvasRenderingContext2D
) {
  const width = ship.width * 0.8;
  const height = ship.height * 0.8;

  ctx.save()

  ctx.translate(x, y);

  ctx.beginPath();
  ctx.moveTo(0, height);
  ctx.lineTo(width / 2, 0);
  ctx.lineTo(width, height);
  ctx.lineTo(width / 2, height - 5);
  ctx.lineTo(0, height);
  ctx.stroke();
  ctx.closePath();

  ctx.restore();
}