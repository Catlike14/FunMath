import { Point } from "./Point";

export class Line {
  start: Point;
  end: Point;

  constructor(start: Point, end: Point) {
    this.start = start;
    this.end = end;
  }

  getPointAtRatio(ratio: number): Point {
    const x = this.start.x + (this.end.x - this.start.x) * ratio;
    const y = this.start.y + (this.end.y - this.start.y) * ratio;
    return { x, y };
  }
}