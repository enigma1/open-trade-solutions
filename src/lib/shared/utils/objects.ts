export const toNumberArray = (value: unknown): number[] => {
  if (!value) return [];

  if (!Array.isArray(value)) {
    value = String(value).split(',');
  }

  return (value as any[])
    .map(Number)
    .filter((n) => Number.isFinite(n) && n > 0);
};

export const indexBy = <T, K extends keyof T>(
  arr: T[],
  key: K,
): Record<string, T> => {
  const result: Record<string, T> = {};

  for (const item of arr) {
    const value = item[key];
    if (value != null) {
      result[String(value)] = item;
    }
  }

  return result;
};

export const hasObjectProps = <K extends string>(
  obj: unknown,
  props: K[],
): obj is Record<K, unknown> => {
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    return false;
  }

  return props.every((key) => Object.prototype.hasOwnProperty.call(obj, key));
};

export const isEmptyObject = (obj: unknown) =>
  obj !== null &&
  typeof obj === 'object' &&
  !Array.isArray(obj) &&
  Object.keys(obj).length === 0;
