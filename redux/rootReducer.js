import cart from "./slices/cart";
import stores from "./slices/stores";
import banners from "./slices/banner";
import category from "./slices/category";
import savedProduct from "./slices/savedProduct";
import savedStore from "./slices/savedStore";
import viewedProduct from "./slices/viewed-product";
import notification from "./slices/viewed-notification";
import savedAddress from "./slices/savedAddress";
import user from "./slices/user";
import order from "./slices/order";
import chat from "./slices/chat";
import settings from "./slices/settings";
const rootReducer = {
  user: user,
  cart: cart,
  stores: stores,
  savedProduct: savedProduct,
  savedStore: savedStore,
  viewedProduct: viewedProduct,
  savedAddress: savedAddress,
  category: category,
  banners: banners,
  order: order,
  notification: notification,
  chat: chat,
  settings: settings,
};

export default rootReducer;
