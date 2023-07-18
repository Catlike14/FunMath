import Konva from 'konva';
import { KonvaDriver } from 'src/drawer/drivers/konva/driver';
import { Line, Point, RegularPolygon } from 'src/geometry';

const sceneWidth = 1000;
const sceneHeight = 1000;

// const RAY_POINT = 1;
const SIDES = 6;
// const STROKE_WIDTH = 2;
const MAX_ITERATIONS = 50000;
const VELOCITY = 1000;
// const RESPONSIVE = false;
const ANIMATED = false;
const RATIO = 2/3;

const driver = new KonvaDriver();
const canvas = driver.createCanvas(sceneWidth, sceneHeight, document.getElementById('container'));
const layer = driver.createLayer();
canvas.addLayer(layer);

const polygon = new RegularPolygon({ x: sceneWidth / 2, y: sceneHeight / 2 }, SIDES, sceneWidth * .4);
layer.addPolygon(polygon);

let lastPoint = polygon.getRandomPointInside();
for (let i = 0; i < MAX_ITERATIONS; i++) {
  lastPoint = hexGameIteration(polygon, lastPoint);
}

function hexGameIteration(polygon: RegularPolygon, lastPoint: Point) {
  const { vertex } = polygon.getRandomVertex();
  const line = new Line(lastPoint, vertex);
  const pointInLine = line.getPointAtRatio(RATIO);
  layer.addPoint(pointInLine);
  return pointInLine;
}

let i = 0;
const debugText = document.getElementById('debug-text');

if (ANIMATED) {
  const animation = new Konva.Animation(() => {
    if (i >= MAX_ITERATIONS) {
      animation.stop();
      return false;
    }

    for (let v = 0; v < VELOCITY; v++) {
      lastPoint = hexGameIteration(polygon, lastPoint);
    }

    i += VELOCITY;
    debugText.innerHTML = `Iteration: ${i}`;
  }, layer);
  animation.start();
} else {
  
}

/* function fitStageIntoParentContainer() {
  const container = document.querySelector<HTMLElement>('#parent');
  const containerHeight = container.offsetHeight;
  const scale = containerHeight / sceneHeight;
  // stage.width(sceneWidth * scale);
  // stage.height(sceneHeight * scale);
  // stage.scale({ x: scale, y: scale });
}

fitStageIntoParentContainer();

if (RESPONSIVE) {
  window.addEventListener('resize', fitStageIntoParentContainer);
} */

layer.draw();