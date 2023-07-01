import Konva from 'konva';
import { Line, Point, RegularPolygon } from 'src/geometry';

const sceneWidth = 1000;
const sceneHeight = 1000;

const RAY_POINT = 1;
const SIDES = 6;
const STROKE_WIDTH = 2;
const MAX_ITERATIONS = 50000;
const VELOCITY = 1000;
const RESPONSIVE = false;
const ANIMATED = true;

const stage = new Konva.Stage({
  container: 'container',
  width: sceneWidth,
  height: sceneHeight,
});

const layer = new Konva.Layer();
stage.add(layer);

const polygon = new RegularPolygon({ x: sceneWidth / 2, y: sceneHeight / 2 }, SIDES, sceneWidth * .4);
drawPolygon(polygon, layer);

let lastPoint = polygon.getRandomPointInside();

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
  for (i = 0; i < MAX_ITERATIONS; i++) {
    lastPoint = hexGameIteration(polygon, lastPoint);
  }
}

function hexGameIteration(polygon: RegularPolygon, lastPoint: Point) {
  const { vertex } = polygon.getRandomVertex();
  const line = new Line(lastPoint, vertex);
  const pointInLine = line.getPointAtRatio(2 / 3);
  drawPoint(pointInLine.x, pointInLine.y, layer);
  return pointInLine;
}

function fitStageIntoParentContainer() {
  const container = document.querySelector<HTMLElement>('#parent');
  const containerHeight = container.offsetHeight;
  const scale = containerHeight / sceneHeight;
  stage.width(sceneWidth * scale);
  stage.height(sceneHeight * scale);
  stage.scale({ x: scale, y: scale });
}

function drawPoint(x, y, layer) {
  const pointAsLine = [x, y, x+RAY_POINT, y+RAY_POINT];
  return drawLine(pointAsLine, layer);

  /* const point = new Konva.Circle({
    x,
    y,
    radius: RAY_POINT,
    fill: 'blue',
  });

  layer.add(point);
  return point; */
}

function drawPolygon(polygon: RegularPolygon, layer) {
  const vertices = polygon.getVertices().reduce((acc, v) => [...acc, v.x, v.y], []);
  const kanvaPolygon = new Konva.Line({
    points: vertices,
    closed: true,
    fill: 'red',
    stroke: 'black',
    strokeWidth: STROKE_WIDTH,
  });

  layer.add(kanvaPolygon);
  return kanvaPolygon;
}

function drawLine(line, layer) {
  const konvaLine = new Konva.Line({
    points: line,
    stroke: 'green',
    strokeWidth: STROKE_WIDTH,
  });

  layer.add(konvaLine);
  return konvaLine;
}

fitStageIntoParentContainer();

if (RESPONSIVE) {
  window.addEventListener('resize', fitStageIntoParentContainer);
}

layer.batchDraw();