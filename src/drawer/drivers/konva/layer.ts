import Konva from "konva";
import { Layer } from "src/drawer/interfaces";
import { Point, Line, PolygonInterface } from "src/geometry";

export class KonvaLayer implements Layer {
  layer: Konva.Layer;

  constructor() {
    this.layer = new Konva.Layer();
  }


  addLine(line: Line): void {
    const points = [line.start.x, line.start.y, line.end.x, line.end.y];
    const konvaLine = new Konva.Line({
      points,
      stroke: 'black',
      strokeWidth: 2,
    });
  
    this.layer.add(konvaLine);
  }

  addPolygon(polygon: PolygonInterface): void {
    const vertices = polygon.getVertices().reduce((acc, v) => [...acc, v.x, v.y], []);
    const kanvaPolygon = new Konva.Line({
      points: vertices,
      closed: true,
      fill: 'white',
      stroke: 'black',
      strokeWidth: 2,
    });

    this.layer.add(kanvaPolygon);
  }

  addPoint(point: Point): void {
    const circle = new Konva.Circle({
      x: point.x,
      y: point.y,
      radius: 1,
      fill: 'blue',
    });
  
    this.layer.add(circle);
  }

  draw(): void {
    this.layer.draw();
  }

}