import { getAngle } from './poseMath';

describe('PoseNet Math - getAngle()', () => {
  it('calculates 90 degrees angle', () => {
    const a = { x: 0, y: 1 }; // vertical
    const b = { x: 0, y: 0 }; // center
    const c = { x: 1, y: 0 }; // horizontal

    const angle = getAngle(a, b, c);
    expect(Math.round(angle)).toBe(90);
  });

  it('calculates 180 degrees angle (straight line)', () => {
    const a = { x: -1, y: 0 };
    const b = { x: 0, y: 0 };
    const c = { x: 1, y: 0 };

    const angle = getAngle(a, b, c);
    expect(Math.round(angle)).toBe(180);
  });

  it('handles edge cases with same points', () => {
    const a = { x: 0, y: 0 };
    const b = { x: 0, y: 0 };
    const c = { x: 0, y: 0 };

    const angle = getAngle(a, b, c);
    expect(isNaN(angle)).toBe(true); // undefined angle
  });
});
