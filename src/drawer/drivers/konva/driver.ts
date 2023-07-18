import { Driver } from "src/drawer/interfaces";
import { KonvaCanvas } from "./canvas";
import { KonvaLayer } from "./layer";

export class KonvaDriver implements Driver {
  createCanvas(width: number, height: number, container: HTMLElement) {
    if (container.tagName !== 'DIV') {
      throw new Error('KonvaDriver only supports div containers');
    }

    const canvas = new KonvaCanvas(width, height, container);
    return canvas;
  }

  createLayer() {
    const layer = new KonvaLayer();
    return layer;
  }
}