import React from "react";
import { useTranslation } from "react-i18next";
import { imgBaseUrl } from "../../constants";
import { getPrice } from "../../utils/getPrice";

const Supplier = ({ shop, product }) => {
  const { t: tl } = useTranslation();
  const getCurrentPrice = () => {
    let _tax = product.shop_tax + product.productTax;
    let _discount = product.stockId.discount
      ? product.stockId.discount * product.qty
      : 0;
    let _price = product.total_price + product.shop_tax;
    // product.forEach((item) => {
    //   let totalDiscount = item.stockId.discount
    //     ? item.stockId.discount * item.qty
    //     : 0;
    //   total_tax += item.shop_tax + item.productTax;
    //   total_discount += totalDiscount;
    //   total_price += item.total_price + item.shop_tax;
    // });
    return { _discount, _price, _tax };
  };
  const getTotalPrice = () => {
    // let total_tax = product.shop_tax + product.productTax
    // let  total_discount = product.stockId.discount
    //     ? product.stockId.discount * product.qty
    //     : 0;
    // let  total_price = product.total_price + product.shop_tax
    product.forEach((item) => {
      let totalDiscount = item.stockId.discount
        ? item.stockId.discount * item.qty
        : 0;
      total_tax += item.shop_tax + item.productTax;
      total_discount += totalDiscount;
      total_price += item.total_price + item.shop_tax;
    });
    return { total_discount, total_price, total_tax };
  };
  const { _discount, _price, _tax } = getCurrentPrice();

  return (
    <div className="supplier">
      <div className="store">
        <div className="logo">
          <img src={imgBaseUrl + shop.logo} alt="logo" />
        </div>
        <div className="data">
          <div className="name">{shop?.translation?.title}</div>
          <div className="type">{tl("Seller")}</div>
        </div>
      </div>
      <div className="prices">
        <div className="item">
          <div className="label">{tl("Total product price")}</div>
          <div className="value">{getPrice(_price + _discount - _tax)}</div>
        </div>
        <div className="item">
          <div className="label">{tl("Discount")}</div>
          <div className="value">{getPrice(_discount)}</div>
        </div>
        <div className="item">
          <div className="label">{tl("Tax")}</div>
          <div className="value">{getPrice(_tax)}</div>
        </div>

        <div className="item">
          <div className="label">{tl("Total amount")}</div>
          <div className="value">{getPrice(_price)}</div>
        </div>
      </div>
    </div>
  );
};

export default Supplier;
