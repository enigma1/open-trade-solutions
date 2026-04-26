import type { QueryContext } from './types';
import type { PaginationParams } from '@/lib/server/shared';
import { trimTail } from '@/lib/shared/utils';

type BuildQueryProps = {
  ctx: QueryContext;
  pagination?: PaginationParams;
};
export const buildQuery = ({ ctx, pagination }: BuildQueryProps) => {
  const params = [...ctx.params];
  let selectClause = '';

  if (ctx.mode === 'count') {
    selectClause = 'COUNT(*) AS total';
  } else {
    for (const { sqlAlias, columns } of ctx.select.values()) {
      const cols = columns.has('*')
        ? `${sqlAlias}.*`
        : Array.from(columns)
            .map((col) => `${sqlAlias}.${col}`)
            .join(', ');

      selectClause += cols + ', ';
    }
    selectClause = trimTail(selectClause, ',');
  }

  // let query = `SELECT ${selectClause} FROM ${base.table} ${base.alias}`;
  let query = `SELECT ${selectClause} FROM ${ctx.fromBase.table} ${ctx.fromBase.alias}`;
  // joins
  query += Array.from(ctx.joins.values()).join('\n');

  // where
  if (ctx.where.length) {
    query += ' WHERE ' + ctx.where.join(' AND ');
  }

  // order
  if (ctx.orderBy) {
    query += ` ORDER BY ${ctx.orderBy}`;
  }

  // pagination
  if (ctx.mode === 'rows' && pagination) {
    query += ' LIMIT ? OFFSET ?';
    params.push(pagination.limit, pagination.offset);
  } else if (ctx.mode === 'rows' && ctx.limit) {
    query += ' LIMIT ?';
    params.push(ctx.limit);
  }

  return { query, params };
};
