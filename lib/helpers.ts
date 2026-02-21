/** Linear interpolation between two values */
export const lerp = (start: number, end: number, factor: number): number =>
  start + (end - start) * factor;

/** Clamp a value between min and max */
export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

/** Exponential ease-out for counter animations */
export const easeOutExpo = (t: number): number =>
  t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

/** Map a value from one range to another */
export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number => {
  const clamped = clamp(value, inMin, inMax);
  return ((clamped - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
};

/** Format number with commas */
export const formatNumber = (num: number): string =>
  num.toLocaleString('en-US');

/** Format currency */
export const formatCurrency = (num: number): string =>
  '$' + num.toLocaleString('en-US');
