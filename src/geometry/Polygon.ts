import { Point } from "./Point";

export interface PolygonInterface {
  getVertices(): Point[];
  setVertices(vertices: Point[]): void;
  getRandomPointInside(): Point;
  getRandomVertex(): { vertex: Point, vertexIndex: number };
}

export class Polygon implements PolygonInterface {
  protected vertices: Point[];

  constructor(vertices: Point[]) {
    this.setVertices(vertices);
  }

  getVertices(): Point[] { return this.vertices; }
  setVertices(vertices: Point[]) {
    if (vertices.length < 3) throw new Error("A polygon must have at least 3 sides.");
    this.vertices = vertices;
  }

  getRandomPointInside(): Point {
    const { vertex, vertexIndex } = this.getRandomVertex();

    const nextPointIndex = (vertexIndex + 1) % this.vertices.length;
    const nextPoint = this.vertices[nextPointIndex];

    const prevPointIndex = (vertexIndex + this.vertices.length - 1) % this.vertices.length;
    const prevPoint = this.vertices[prevPointIndex];

    const a = Math.random();
    const b = Math.random() * (1 - a);

    const randomX = vertex.x + b * (nextPoint.x - vertex.x) + a * (prevPoint.x - vertex.x);
    const randomY = vertex.y + b * (nextPoint.y - vertex.y) + a * (prevPoint.y - vertex.y);

    return { x: randomX, y: randomY };
  }

  getRandomVertex() {
    const vertexIndex = Math.floor(Math.random() * this.vertices.length);
    const vertex = this.vertices[vertexIndex];
    return { vertex, vertexIndex };
  }
}