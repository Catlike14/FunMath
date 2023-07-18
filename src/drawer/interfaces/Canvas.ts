import { Layer } from "./Layer";

export interface Canvas {
  addLayer(layer: Layer): void;
}