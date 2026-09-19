import { initialProductsSelect } from "./products.schema";
import type { BaseTable, QueryContext } from ">/lib/server/query/types";
import {
  addWhereIn,
  addSelect,
  createQueryContext,
} from ">/lib/server/query/buildQueryContext";
import { getConfig } from ">/lib/server/config";

export const createProductQueryContext = (
  fromBase: BaseTable,
): QueryContext => {
  const ctx = createQueryContext(initialProductsSelect, fromBase);
  ctx.where.push("p.products_display = 1");
  return ctx;
};

export const applyProductsToCategories = (
  ctx: QueryContext,
  products: number[],
) => {
  if (!products.length) return;

  ctx.joins.set(
    "p2c",
    `
    JOIN products_to_categories p2c
      ON p.products_id = p2c.products_id
    `,
  );

  addWhereIn(ctx, "p2c.products_id", products);
};

export const applyProductsToBrands = (ctx: QueryContext, brands: number[]) => {
  if (!brands.length) return;

  ctx.joins.set(
    "p2b",
    `
    JOIN products_to_brands p2b
      ON p.products_id = p2b.products_id
    `,
  );

  addWhereIn(ctx, "p2b.brands_id", brands);
};

export const applyProductsIds = (ctx: QueryContext, ids: number[]) => {
  addWhereIn(ctx, "p.products_id", ids);
};

// export const applySpecialsToProducts = (ctx: QueryContext) => {
//   ctx.joins.set(
//     'sp',
//     `
//     LEFT JOIN products_specials sp
//       ON p.products_id = sp.products_id
//       AND NOW() BETWEEN sp.start_date AND sp.end_date
//   `,
//   );
// };

// export const applyProductsToSpecials = (ctx: QueryContext) => {
//   ctx.joins.set(
//     'p',
//     `
//     LEFT JOIN products p
//       ON p.products_id = sp.products_id
//       AND NOW() BETWEEN sp.start_date AND sp.end_date
//   `,
//   );
// };

export const applyProducts = (
  ctx: QueryContext,
  fromAlias: string,
  alias = "p",
) => {
  ctx.joins.set(
    alias,
    `
    LEFT JOIN products ${alias}
      ON ${alias}.products_id = ${fromAlias}.products_id
    `,
  );
};

export const applySpecials = (
  ctx: QueryContext,
  fromAlias: string,
  alias = "sp",
) => {
  ctx.joins.set(
    alias,
    `
    LEFT JOIN products_specials ${alias}
      ON ${alias}.products_id = ${fromAlias}.products_id
      AND NOW() BETWEEN ${alias}.start_date AND ${alias}.end_date
    `,
  );
};

export const applyProductWithSpecials = (
  ctx: QueryContext,
  fromAlias: string,
) => {
  applyProducts(ctx, fromAlias);
  applySpecials(ctx, fromAlias);
};

export const applyProductsLanguage = (ctx: QueryContext, languageId = 1) => {
  const sqlAlias = "pd";
  ctx.joins.set(
    sqlAlias,
    `
    LEFT JOIN products_description pd
      ON p.products_id = pd.products_id
      AND pd.language_id = ?
  `,
  );

  addSelect({
    ctx,
    sqlAlias,
    domainAlias: "productsDescription",
    columns: ["products_name", "products_description"],
  });
  ctx.params.push(languageId);
};

export const applyProductsSort = (ctx: QueryContext, sort?: string) => {
  switch (sort) {
    case "price_asc":
      ctx.orderBy = "p.products_price ASC";
      break;

    case "special_price":
      applySpecials(ctx, "p"); // ensures join exists
      ctx.orderBy = "sp.special_price ASC";
      break;
  }
};

export const applyFeaturedProductsSort = (ctx: QueryContext, sort?: string) => {
  switch (sort) {
    case "sort_order":
      ctx.orderBy = "fp.sort_order ASC";
      break;
  }
};

export const applyExtraFields = async (
  ctx: QueryContext,
  alias: string = "p2pef",
) => {
  const useFields = Boolean(await getConfig("products.use_extra_fields"));
  if (!useFields) return;

  addSelect({
    ctx,
    sqlAlias: "p",
    domainAlias: "product",
    columns: [
      `EXISTS (
        SELECT 1
        FROM products_to_products_extra_fields ${alias}
        WHERE ${alias}.products_id = p.products_id
      ) AS has_extra_fields`,
    ],
  });
};
