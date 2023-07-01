import { Point } from "./Point";
import { Vertex } from "./Vertex";

export interface PolygonInterface {
  getVertices(): Vertex[];
  setVertices(vertices: Vertex[]): void;
  getRandomPointInside(): Point;
  getRandomVertex(): { vertex: Vertex, vertexIndex: number };

}

export class Polygon implements PolygonInterface {
  protected vertices: Vertex[];

  constructor(vertices: Vertex[]) {
    this.setVertices(vertices);
  }

  getVertices(): Vertex[] { return this.vertices; }
  setVertices(vertices: Vertex[]) {
    if (vertices.length < 3) throw new Error("A polygon must have at least 3 sides.");
    this.vertices = vertices;
  }

  getRandomPointInside(): Point {
    const { vertex, vertexIndex } = this.getRandomVertex();

    const nextVertexIndex = (vertexIndex + 1) % this.vertices.length;
    const nextVertex = this.vertices[nextVertexIndex];

    const prevVertexIndex = (vertexIndex + this.vertices.length - 1) % this.vertices.length;
    const prevVertex = this.vertices[prevVertexIndex];

    const a = Math.random();
    const b = Math.random() * (1 - a);

    const randomX = vertex.x + b * (nextVertex.x - vertex.x) + a * (prevVertex.x - vertex.x);
    const randomY = vertex.y + b * (nextVertex.y - vertex.y) + a * (prevVertex.y - vertex.y);

    return { x: randomX, y: randomY };
  }

  getRandomVertex() {
    const vertexIndex = Math.floor(Math.random() * this.vertices.length);
    const vertex = this.vertices[vertexIndex];
    return { vertex, vertexIndex };
  }
}