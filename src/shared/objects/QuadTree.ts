import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants";
import { Entity } from "./Entity";

export class QuadTree {
  x: number; 
  y: number;
  width: number;
  height: number;
  nodes: Array<QuadTree>;
  entities: Array<Entity>;

  constructor (x?: number, y?: number, width?: number, height?: number) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || CANVAS_WIDTH;
    this.height = height || CANVAS_HEIGHT;

    this.entities = [];
    this.nodes = [];
  }

  log () {
    console.log(this.entities.map(e => e.name).join(' - '))

    this.nodes.forEach(node => node.log());
  }

  draw (ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = 'green';
    
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    
    this.nodes.forEach(node => node.draw(ctx));
  }

  clear () {
    this.entities = [];

    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i]) {
        this.nodes[i].clear();
        this.nodes[i] = null;
      }
    }

    this.nodes = [];
  }

  split () {
    const subWidth = this.width / 2;
    const subHeight = this.height / 2;
    const { x, y } = this;

    this.nodes.push(new QuadTree(x + subWidth, y, subWidth, subHeight));
    this.nodes.push(new QuadTree(x, y, subWidth, subHeight));
    this.nodes.push(new QuadTree(x, y + subHeight, subWidth, subHeight));
    this.nodes.push(new QuadTree(x + subWidth, y + subHeight, subWidth, subHeight));
  }

  getIndex (entity: Entity): number {
    const verticalMidpoint = this.x + (this.width / 2);
    const horizontalMidpoint = this.y + (this.height / 2);

    const isTop = (entity.y < horizontalMidpoint) && (entity.y + entity.height < horizontalMidpoint);
    const isBottom = entity.y > horizontalMidpoint;

    if (entity.x < verticalMidpoint && entity.x + entity.width < verticalMidpoint) {
      if (isTop) {
        return 1;
      }

      if (isBottom) {
        return 2;
      }
    }

    if (entity.x > verticalMidpoint) {
      if (isTop) {
        return 0;
      }

      if (isBottom) {
        return 3;
      }
    }

    return -1;
  }

  insert (entity: Entity): void {
    if (this.nodes.length > 0) {
      const index = this.getIndex(entity);

      if (index !== -1) {
        this.nodes[index].insert(entity);

        return;
      }
    }

    this.entities.push(entity);

    if (this.entities.length > 4) {
      if (this.nodes.length === 0) {
        this.split();
      }

      let i = 0;

      while (i < this.entities.length) {
        const index = this.getIndex(this.entities[i]);
        
        if (index !== -1) {
          const entity = this.entities.at(i);
          this.entities = [...this.entities.slice(0, i), ...this.entities.slice(i + 1)];

          this.nodes[index].insert(entity);
        } else {
          i++;
        }
      }
    }
  }

  retrieve (entity: Entity): Array<Entity> {
    const index = this.getIndex(entity);
    const near = []

    if (index !== -1 && this.nodes.length > 0) {
      near.push(...this.nodes[index].retrieve(entity));
    }

    near.push(...this.entities);

    return near;
  }
}