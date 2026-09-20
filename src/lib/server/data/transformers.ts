import { type SelectGroup } from ">/lib/server/query";

export const transformData = <
  T extends Record<string, any> = Record<string, any>,
>(
  items: Record<string, any>[],
  select: Map<string, SelectGroup>,
): T[] => {
  return items.map((row) => {
    const output: T = {} as T;

    for (const group of select.values()) {
      const source = row[group.sqlAlias];
      if (!source) continue;

      const domainAlias = group.domainAlias as keyof T;
      const columns = group.columns;

      if (columns.has("*")) {
        output[domainAlias] = source;
        continue;
      }
      const partial: Record<string, unknown> = {};

      for (const col of columns) {
        partial[col] = source[col];
      }
      output[domainAlias] = partial as T[keyof T];
    }
    return output;
  });
};
