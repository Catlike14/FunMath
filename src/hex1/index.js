import Konva from 'konva';

const sceneWidth = 1000;
const sceneHeight = 1000;

const RAY_POINT = 1;
const SIDES = 6;
const STROKE_WIDTH = 2;
const MAX_ITERATIONS = 50000;
const VELOCITY = 1000;
const RESPONSIVE = true;
const ANIMATED = false;

const stage = new Konva.Stage({
  container: 'container',
  width: sceneWidth,
  height: sceneHeight,
});

const layer = new Konva.Layer();
stage.add(layer);

const vertices = calculatePolygonVertices(stage.width() / 2, stage.height() / 2, SIDES, sceneWidth * .4);
drawPolygon(vertices, layer);

var lastPoint = generateRandomPointInsidePolygon(vertices);

var i = 0;
const debugText = document.getElementById('debug-text');

if (ANIMATED) {
  const animation = new Konva.Animation(() => {
    if (i > MAX_ITERATIONS) return;

    for (var v = 0; v < VELOCITY; v++) {
      lastPoint = hexGameIteration(vertices, lastPoint);
      i++;
    }

    layer.batchDraw();
    debugText.innerHTML = `Iteration: ${i}`;
  }, layer);
  animation.start();
} else {
  for (i = 0; i < MAX_ITERATIONS; i++) {
    lastPoint = hexGameIteration(vertices, lastPoint);
  }
}

function hexGameIteration(vertices, lastPoint) {
  const randomVertex = getRandomVertex(vertices)[0];
  const line = [lastPoint.x, lastPoint.y, randomVertex[0], randomVertex[1]];

  const pointInLine = getPointInLine(line, 2 / 3);
  drawPoint(pointInLine.x, pointInLine.y, layer);
  return pointInLine;
}

function fitStageIntoParentContainer() {
  var container = document.querySelector('#parent');
  var containerHeight = container.offsetHeight;
  var scale = containerHeight / sceneHeight;
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

function drawPolygon(vertices, layer) {
  const polygon = new Konva.Line({
    points: vertices,
    closed: true,
    fill: 'red',
    stroke: 'black',
    strokeWidth: STROKE_WIDTH,
  });

  layer.add(polygon);
  return polygon;
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


function calculatePolygonVertices(x, y, sides, radius) {
  const vertices = [];

  for (let i = 0; i < sides; i++) {
    const angle = (2 * Math.PI * i) / sides;
    const vertexX = x + radius * Math.cos(angle);
    const vertexY = y + radius * Math.sin(angle);
    vertices.push(vertexX, vertexY);
  }

  return vertices;
}

function generateRandomPointInsidePolygon(vertices) {
  const sides = vertices.length / 2;
  const [randomVertex, randomVertexIndex] = getRandomVertex(vertices);

  const nextVertexIndex = (randomVertexIndex + 1) % sides;
  const nextVertex = vertices.slice(nextVertexIndex * 2, nextVertexIndex * 2 + 2);

  const prevVertexIndex = (randomVertexIndex + sides - 1) % sides;
  const prevVertex = vertices.slice(prevVertexIndex * 2, prevVertexIndex * 2 + 2);

  const randomT = Math.random();
  const randomS = Math.random() * (1 - randomT);

  const randomX = randomVertex[0] + randomS * (nextVertex[0] - randomVertex[0]) + randomT * (prevVertex[0] - randomVertex[0]);
  const randomY = randomVertex[1] + randomS * (nextVertex[1] - randomVertex[1]) + randomT * (prevVertex[1] - randomVertex[1]);

  return { x: randomX, y: randomY };
}

function getRandomVertex(vertices) {
  const sides = vertices.length / 2;
  const randomVertexIndex = Math.floor(Math.random() * sides);
  const randomVertex = vertices.slice(randomVertexIndex * 2, randomVertexIndex * 2 + 2);
  return [randomVertex, randomVertexIndex];
}

function getPointInLine(line, ratio) {
  const x = line[0] + (line[2] - line[0]) * ratio;
  const y = line[1] + (line[3] - line[1]) * ratio;
  return { x, y };
}

if (RESPONSIVE) {
  fitStageIntoParentContainer();
  window.addEventListener('resize', fitStageIntoParentContainer);
} else {
  layer.batchDraw();
}