export const trimTail = (str: string, char: string) => {
  const trimmed = str.trimEnd();
  return trimmed.endsWith(char) ? trimmed.slice(0, -char.length) : str;
};

export const parseListOfNumbers = (value?: string) =>
  value
    ? value
        .split(',')
        .map((v) => Number(v.trim()))
        .filter((v) => Number.isFinite(v))
    : [];
