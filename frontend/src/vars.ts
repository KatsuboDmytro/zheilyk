let SIZES: string[] = [];
let COLORS: string[] = [];
let BRAND: string[] = [];

const WAYS = (t: (key: string) => string) => [
  t("catalog.filters.the_newest"),
  t("catalog.filters.the_lower_price"),
  t("catalog.filters.the_highest_price"),
];

export { SIZES, COLORS, BRAND, WAYS };