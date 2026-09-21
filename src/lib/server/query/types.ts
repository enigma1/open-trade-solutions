type QueryMode = 'rows' | 'count';
export type BaseTable = {
  table: string;
  alias: string;
};

export type SelectGroup = {
  sqlAlias: string;
  domainAlias: string;
  columns: Set<string>;
};

export type InitialSelectInput = Record<
  string,
  {
    sqlAlias: string;
    domainAlias: string;
    columns: string[];
  }
>;

export type QueryContext = {
  select: Map<string, SelectGroup>;
  fromBase: BaseTable;
  joins: Map<string, string>;
  where: string[];
  params: any[];
  orderBy?: string;
  mode: QueryMode;
  nestTables?: boolean;
  limit?: number;
  ignoredTables: string[];
  languageId: number;
};
