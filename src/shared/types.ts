import { State } from './State';
import { Point } from './objects/Point';

export interface Entity {
  x: number;
  y: number;
  width: number;
  height: number;

  update (dt: number, state: State, keys: Set<string>, cursor: Point): Entity;

  draw (ctx: CanvasRenderingContext2D): void;
}