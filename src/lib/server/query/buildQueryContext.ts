import { languageApi } from '>/lib/server/request/language';
import type {
  InitialSelectInput,
  SelectGroup,
  QueryContext,
  BaseTable,
} from './types';

export type InitialSelect = Record<string, SelectGroup>;
export type SelectMap = Record<string, string[]>;

export const createQueryContext = async (
  initialSelect: InitialSelectInput = {},
  fromBase: BaseTable,
): Promise<QueryContext> => {
  const lId = (await languageApi.resolveLanguage()).languages_id;
  const select = new Map<string, SelectGroup>();

  for (const [sqlAlias, group] of Object.entries(initialSelect)) {
    select.set(sqlAlias, {
      sqlAlias: group.sqlAlias,
      domainAlias: group.domainAlias,
      columns: new Set(group.columns),
    });
  }

  return {
    select,
    joins: new Map(),
    where: [],
    params: [],
    mode: 'rows',
    nestTables: false,
    fromBase,
    ignoredTables: [],
    languageId: lId,
  };
};

export const applyCount = (ctx: QueryContext) => {
  ctx.mode = 'count';
  ctx.select.clear(); // wipe row selects
};

const addColumn = (group: SelectGroup, col: string) => {
  if (col === '*') {
    group.columns.clear();
    group.columns.add('*');
    return;
  }

  group.columns.add(col);
};

type AddSelectProps = {
  ctx: QueryContext;
  sqlAlias: string;
  domainAlias: string;
  columns: string[];
};

export const addSelect = ({
  ctx,
  sqlAlias,
  domainAlias,
  columns,
}: AddSelectProps) => {
  if (!ctx.select.has(sqlAlias)) {
    ctx.select.set(sqlAlias, {
      sqlAlias,
      domainAlias,
      columns: new Set(),
    });
  }

  const group = ctx.select.get(sqlAlias)!;

  for (const col of columns) {
    addColumn(group, col);
  }
};

export const addWhereIn = (
  ctx: QueryContext,
  column: string,
  values: number[],
) => {
  if (!values.length) return;
  const uniques = [...new Set(values)].filter(
    (n) => Number.isInteger(n) && n >= 0,
  );

  if (!uniques.length) {
    if (values.length > 0) {
      ctx.where.push('1=0'); // force empty result
    }
    return;
  }

  ctx.where.push(`${column} IN (${uniques.map(() => '?').join(',')})`);
  ctx.params.push(...uniques);
};

type QueryFeature<T> = (ctx: QueryContext, query: T) => void;
type BuildQueryContextProps<T> = {
  params: URLSearchParams;
  schema: any;
  features: QueryFeature<T>[];
  initialSelect?: InitialSelectInput;
  fromBase: BaseTable;
};
export const buildQueryContext = async <T>({
  params,
  schema,
  features,
  initialSelect = {},
  fromBase,
}: BuildQueryContextProps<T>) => {
  const ctx = await createQueryContext(initialSelect, fromBase);
  const query = schema.parse(Object.fromEntries(params.entries()));

  for (const feature of features) {
    feature(ctx, query);
  }

  return {
    ctx,
    query,
  };
};
