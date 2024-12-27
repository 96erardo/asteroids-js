import { AsteroidSize } from '../../modules/asteroid/graphics';
import { Asteroid } from '../../modules/asteroid/Asteroid';
import { Saucer, SaucerType } from '../../modules/saucer/Saucer';
import { Entity } from './Entity';

export class Score {
  x: number;
  y: number;
  points: number;

  constructor (points: number = 0) {
    this.points = points;
  }

  point(entity: Entity) {
    if (entity instanceof Asteroid) {
      if (entity.size === AsteroidSize.Small) {
        this.points += 100;
      } else if (entity.size === AsteroidSize.Medium) {
        this.points += 50;
      } else {
        this.points += 20
      }
    
    } else if (entity instanceof Saucer) {
      if (entity.type === SaucerType.Small) {
        this.points += 1000;

      } else {
        this.points += 500;
      }
    }
  }
  
  draw (ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'white';
    ctx.font = 'normal 40px AsteroidsFont';
    ctx.fillText(this.points.toString().padStart(2, '0'), 20, 50);
  }
}