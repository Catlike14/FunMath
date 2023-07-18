import { Line, Point, Polygon } from "src/geometry";

export interface Layer<GraphicOptions> {
  addLine(line: Line, option: GraphicOptions): void;
  addPolygon(polygon: Polygon, option: GraphicOptions): void;
  addPoint(point: Point, option: GraphicOptions): void;
  draw(): void;
}

export interface GraphicOptions {
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
}