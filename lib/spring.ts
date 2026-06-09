type SpringAxis = "x" | "y";

export type Spring2D = {
  current: { x: number; y: number };
  target: { x: number; y: number };
  velocity: { x: number; y: number };
  update: (factor?: number) => void;
};

/** Matches spencergabor.work spring composable (mass/stiffness tuned for scatter images). */
export function createSpring2D(stiffness = 0.05, damping = 0.8): Spring2D {
  const current = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };
  const velocity = { x: 0, y: 0 };

  const updateAxis = (axis: SpringAxis, factor: number) => {
    let delta = target[axis] - current[axis];
    delta *= stiffness;
    delta *= factor;
    velocity[axis] *= damping;
    velocity[axis] += delta;
    current[axis] += velocity[axis];
    current[axis] = Math.round(current[axis] * 100) / 100;
  };

  return {
    current,
    target,
    velocity,
    update(factor = 1) {
      updateAxis("x", factor);
      updateAxis("y", factor);
    },
  };
}
