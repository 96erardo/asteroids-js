import { State } from '../../shared/State';
import { Cursor } from '../../shared/objects/Cursor';
import { Entity, EntityType } from '../../shared/objects/Entity';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../../shared/constants';

export class SpawnSpace implements Entity  {
  name: EntityType;
  x: number;
  y: number;
  width: number;
  height: number;
  collided: boolean;

  constructor () {
    this.name = EntityType.Ship;
    this.width = 100;
    this.height = 100;
    this.x = (CANVAS_WIDTH / 2) - (this.width / 2);
    this.y = (CANVAS_HEIGHT / 2) - (this.height / 2);
    this.collided = false;
  }

  update (dt: number, state: State, keys: Set<string>, cursor: Cursor): SpawnSpace {
    return new SpawnSpace();
  };
  
  draw (ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = 'green';
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  };

  onCollision () {};
}