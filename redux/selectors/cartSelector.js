export function getFilteredCart(cart, shop) {
  const cartItems = cart.cartItems.filter((item) => item.shop.id === shop?.id);
  if (!cartItems.length) {
    return {
      cartItems: [],
      cartTotalAmount: 0,
      cartTotalQuantity: 0,
    };
  }
  return {
    ...cart,
    cartItems,
  };
}
