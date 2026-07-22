// 0.1+0.2 !== 0.3 in js, so eventually money will produce a total
// that is off by a penny. formatPrice will help convert and display
// with only 2 decimals only.
export function formatPrice(cent) {
  return `$${(cent / 100).toFixed(2)}`;
}

// cart subtotal for a given set of selected ids.
// takes a Set so it stays fast as the list grows.
export function subtotalCents(items, selectedIds) {
  return items
    .filter((item) => selectedIds.has(item.id))
    .reduce((sum, item) => sum + item.priceCent * item.quantity, 0);
}
