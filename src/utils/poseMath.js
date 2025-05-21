class Vector {
}

//TODO: vector subtraction func


function getAngle(p1, p2, p3) {
  const a = Math.hypot(p2.x - p1.x, p2.y - p1.y);
  const b = Math.hypot(p2.x - p3.x, p2.y - p3.y);
  const c = Math.hypot(p3.x - p1.x, p3.y - p1.y);
  return Math.acos((a ** 2 + b ** 2 - c ** 2) / (2 * a * b)) * (180 / Math.PI);
}

