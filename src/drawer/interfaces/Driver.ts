import { Canvas } from "./Canvas";
import { Layer } from "./Layer";

export interface Driver {
  createCanvas(width: number, height: number, container: HTMLElement): Canvas;
  createLayer(): Layer;
}