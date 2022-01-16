class point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function computeSlope(pointA, pointB) {
  if ((pointB.x - pointA.x) === 0) {
    return 0;
  }
  return (pointB.y-pointA.y)/(pointB.x-pointA.x);
}

function computeYIntercept(pointA, pointB) {
  return (pointB.y - (computeSlope(pointA, pointB) * pointB.x));
}

exports.point = point;
exports.computeSlope = computeSlope;
exports.computeYIntercept = computeYIntercept;
