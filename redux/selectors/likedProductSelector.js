export function getFilteredLikedProducts(products, shop) {
  if (!shop) {
    return [];
  }
  return products.filter((item) => item.shop_id === shop.id);
}
