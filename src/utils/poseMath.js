class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

//TODO: vector subtraction func


// pass in the x, y coords for all three joints, knee, hip, ankle
// A = hip, B = knee, C = ankle
function vectorSub(A, B) {
  const vec = Vector(A, B);
  return vec;
}


