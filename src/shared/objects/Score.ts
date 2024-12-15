import { Entity } from './Entity';


export class Score {
  x: number;
  y: number;
  points: number;

  constructor (points: number = 0) {
    this.points = points;
  }

  point(asteroid: Entity) {
    if (asteroid.width === 35) {
      this.points += 100;
    
    } else if (asteroid.width === 75) {
      this.points += 50;

    } else {
      this.points += 20
    }
  }
  
  draw (ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'white';
    ctx.font = 'normal 40px AsteroidsFont';
    ctx.fillText(this.points.toString().padStart(2, '0'), 20, 50);
  }
}