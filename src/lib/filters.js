// filters.js

/**
 * Filter projects by category
 */
export function filterByCategory(items, category) {
  if (!category || category === "All") return items;
  return items.filter((item) => item.category === category);
}

/**
 * Get unique categories from a list of items
 */
export function getCategories(items) {
  const cats = items.map((item) => item.category);
  return ["All", ...new Set(cats)];
}
