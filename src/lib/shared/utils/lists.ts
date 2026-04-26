export const getUniqueNumberedList = (val?: string | null): number[] => {
  if (!val) return [];

  return [
    ...new Set(
      val
        .split(',')
        .map((v) => Number(v.trim()))
        .filter(Number.isFinite),
    ),
  ];
};

export const limitList = <T>(arr: T[], max = 50): T[] => arr.slice(0, max);
