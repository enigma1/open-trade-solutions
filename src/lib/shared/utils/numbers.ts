export const clampInt = (
  value: string | null,
  min: number,
  max: number,
  fallback: number,
): number => {
  const n = Number(value);

  if (!Number.isFinite(n)) return fallback;

  if (n < min) return min;
  if (n > max) return max;

  return Math.floor(n);
};

export const getValidIndex = (value: unknown): number | null => {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : null;
};
