import { State } from '../State';
import { Cursor } from './Cursor';

export interface Entity {
  name: EntityType;
  collided: boolean;
  x: number;
  y: number;
  width: number;
  height: number;

  update (dt: number, state: State, keys: Set<string>, cursor: Cursor): Entity;

  draw (ctx: CanvasRenderingContext2D): void;

  onCollision (): void;
}

export enum EntityType {
  Ship = "ship",
  Bullet = "bullet",
  Asteroid = "asteroid",
  Other = "other"
}