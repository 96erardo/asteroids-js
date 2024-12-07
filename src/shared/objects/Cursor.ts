import { Point } from './Point';

export class Cursor {
  point: Point;
  clicked: boolean;

  constructor () {
    this.point = new Point(0,0);
    this.clicked = false;
  }

  isClicked (): boolean {
    return this.clicked
  }

  onPress () {
    this.clicked = true;
  }

  onRelease () {
    this.clicked = false;
  }
}