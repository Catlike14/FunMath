import { Point } from "./Point";
import { Vertex } from "./Vertex";

export class RegularPolygon {
  center: Point;
  sides: number;
  radius: number;
  
  private _vertices: Vertex[];

  constructor(center: Point, sides: number, radius: number) {
    if (sides < 3) throw new Error("A polygon must have at least 3 sides.");
    if (radius <= 0) throw new Error("Radius must be greater than 0.");

    this.center = center;
    this.sides = sides;
    this.radius = radius;
  }

  getVertices(): Vertex[] {
    if (this._vertices) return this._vertices;
    this._vertices = this._calculateVertices();
    return this._vertices;
  }

  private _calculateVertices(): Vertex[] {
    const vertices: Vertex[] = [];
    const angle = (2 * Math.PI) / this.sides;

    for (let i = 0; i < this.sides; i++) {
      vertices.push({
        x: this.center.x + this.radius * Math.cos(i * angle),
        y: this.center.y + this.radius * Math.sin(i * angle),
      });
    }

    return vertices;
  }

  getRandomPointInside(): Point {
    const vertices = this.getVertices();
    const { vertex, vertexIndex } = this.getRandomVertex();

    const nextVertexIndex = (vertexIndex + 1) % this.sides;
    const nextVertex = vertices[nextVertexIndex];

    const prevVertexIndex = (vertexIndex + this.sides - 1) % this.sides;
    const prevVertex = vertices[prevVertexIndex];

    const a = Math.random();
    const b = Math.random() * (1 - a);

    const randomX = vertex.x + b * (nextVertex.x - vertex.x) + a * (prevVertex.x - vertex.x);
    const randomY = vertex.y + b * (nextVertex.y - vertex.y) + a * (prevVertex.y - vertex.y);

    return { x: randomX, y: randomY };
  }

  getRandomVertex() {
    const vertices = this.getVertices();
    const vertexIndex = Math.floor(Math.random() * this.sides);
    const vertex = vertices[vertexIndex];
    return { vertex, vertexIndex };
  }
}