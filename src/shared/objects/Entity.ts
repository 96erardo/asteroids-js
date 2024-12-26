import { State } from '../State';
import { Cursor } from './Cursor';

export interface Entity {
  name: EntityType;
  x: number;
  y: number;
  width: number;
  height: number;
  collided: boolean;

  update (dt: number, state: State, keys: Set<string>, cursor: Cursor): Entity;

  draw (ctx: CanvasRenderingContext2D): void;

  onCollision (): void;
}

export enum EntityType {
  Ship = "ship",
  Bullet = "bullet",
  Asteroid = "asteroid",
  Saucer = "saucer",
  Other = "other"
}