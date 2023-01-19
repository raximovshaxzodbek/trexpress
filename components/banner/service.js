import React from "react";
import { useTranslation } from "react-i18next";
import { images } from "../../constants/images";

const ServiceBanner = () => {
  const { t: tl } = useTranslation();
  return (
    <div className="service-wrapper">
      <div className="service-item delivery">
        <img src={images.MultiDelivery} />
        <div className="service-content">
          <div className="title">{tl("Multi Order")}</div>
          <div className="description">{tl("multi.order.text")}</div>
        </div>
      </div>
      <div className="service-item cashback">
        <img src={images.Cashback} />
        <div className="service-content">
          <div className="title">{tl("Cashback")}</div>
          <div className="description">{tl("cashback.text")}</div>
        </div>
      </div>
      <div className="service-item become">
        <img src={images.Become} />
        <div className="service-content">
          <div className="title">{tl("Become Seller")}</div>
          <div className="description">{tl("become.seller.text")}</div>
        </div>
      </div>
    </div>
  );
};

export default ServiceBanner;
