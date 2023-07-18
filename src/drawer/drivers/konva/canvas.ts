import Konva from "konva";
import { Canvas } from "src/drawer/interfaces";
import { KonvaLayer } from "./layer";

export class KonvaCanvas implements Canvas {
  private stage: Konva.Stage;

  constructor(width: number, height: number, container: HTMLElement) {
    if (container.tagName !== 'DIV') {
      throw new Error('KonvaDriver only supports div containers');
    }

    this.stage = new Konva.Stage({
      container: container as HTMLDivElement,
      width: width,
      height: height,
    });
  }

  addLayer(layer: KonvaLayer): void {
    this.stage.add(layer.layer);
  }
}