# FunMath - Random experiments
## How to use
    npm install
    npm start
Open [http://localhost:1234](http://localhost:1234)

## Hexagon 001
Hexagon chaos game with some setting for tinkering (check index.js)

![](src/hex1/screen1.jpg?raw=true)


`RAY_POINT` ray of the generated points (they're small circles)

`SIDES` number of sides/vertex of the polygon

`MAX_ITERATIONS` how many points it should compute

`VELOCITY` how many point it computes at each update (when animated)

`ANIMATED` show the generation in real-time (if true, it becomes slow)

## Todo
- Improve Polygon/RegularPolygon hierarchy instead of sharing a common interface and wrapping
- Test with other driver
- Implement responsiveness on Canvas
- Write a configuration for each addObject in Layer