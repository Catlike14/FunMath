import { Point } from "./Point";
import { Polygon, PolygonInterface } from "./Polygon";

export class RegularPolygon implements PolygonInterface {
  private sides: number;
  private center: Point;
  private radius: number;
  private polygon: Polygon;

  constructor(center: Point, sides: number, radius: number) {
    if (radius <= 0) throw new Error("Radius must be greater than 0.");
    
    this.center = center;
    this.sides = sides;
    this.radius = radius;
    this.polygon = new Polygon(this.calculateVertices());
  }

  private calculateVertices(): Point[] {
    const vertices: Point[] = [];
    const angle = (2 * Math.PI) / this.sides;

    for (let i = 0; i < this.sides; i++) {
      vertices.push({
        x: this.center.x + this.radius * Math.cos(i * angle),
        y: this.center.y + this.radius * Math.sin(i * angle),
      });
    }

    return vertices;
  }

  getVertices(): Point[] {
    return this.polygon.getVertices();
  }

  setVertices() {
    throw new Error("Cannot set vertices of a regular polygon.");
  }

  getRandomPointInside(): Point {
    return this.polygon.getRandomPointInside();
  }

  getRandomVertex() {
    return this.polygon.getRandomVertex();
  }
}