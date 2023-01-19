import React from "react";
import MapOnlyShow from "../../components/map/only-show";
import { useTranslation } from "react-i18next";
import MapPinLineIcon from "remixicon-react/MapPinLineIcon";
import CheckboxBlankCircleLineIcon from "remixicon-react/CheckboxBlankCircleLineIcon";
import RecordCircleLineIcon from "remixicon-react/RecordCircleLineIcon";
import InfoLineIcon from "remixicon-react/InformationLineIcon";
import DateRangePopover from "../form/date-range-popover";
import { getLocationObj } from "../../utils/getLocation";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
const Pickup = ({
  setCheckoutContent,
  deliveryDate,
  currentShop,
  handleTab,
  tabKey,
  isActivePickup,
  handleDeliveryDate,
  addToOrderData,
  order,
  shops,
}) => {
  const { t: tl } = useTranslation();
  const [address, setAddress] = useState({});
  let count = 0;
  const handleContinue = () => {
    if (deliveryDate) {
      if (order.shops?.length < shops?.length) {
        toast.error("Please select all shops data");
      } else if (order.shops?.length === shops?.length) {
        order.shops?.forEach((element) => {
          for (const property in element) {
            if (element[property] === undefined) {
              count++;
              toast.error(
                `Please select ${property} of ${element.products[0].shop.translation.title}`
              );
            }
          }
        });
        if (count === 0) {
          addToOrderData();
          setCheckoutContent("payment-method");
        }
      }
    } else {
      toast.error("Please select delivery date");
    }
  };
  useEffect(() => {
    getLocationObj({
      location: {
        lat: currentShop.location.latitude,
        lng: currentShop.location.longitude,
      },
      setAddress: setAddress,
    });
  }, []);
  return (
    <div className="tab-pane">
      <div className="delivery-type">
        <div className="tabs">
          <button
            className={tabKey === "delivery" ? "tab active" : "tab"}
            onClick={() => handleTab("delivery")}
          >
            {tabKey === "delivery" ? (
              <RecordCircleLineIcon color="#61DC00" size={20} />
            ) : (
              <CheckboxBlankCircleLineIcon size={20} />
            )}
            <span>{tl("Delivery")}</span>
          </button>
          <button
            disabled={isActivePickup >= 0 ? false : true}
            className={tabKey === "pickup" ? "tab active" : "tab"}
            onClick={() => handleTab("pickup")}
          >
            {tabKey === "pickup" ? (
              <RecordCircleLineIcon color="#61DC00" size={20} />
            ) : (
              <CheckboxBlankCircleLineIcon size={20} />
            )}
            <span>{tl("Pickup")}</span>
          </button>
        </div>
      </div>
      <div className="shipping-info">
        <div className="info-wrapper">
          <div className="general-info">
            <div className="method-item">
              <div className="shipping-type">
                <div className="type">
                  <MapPinLineIcon color="#61DC00" size={20} />
                  <span>{tl("Address")}</span>
                </div>
                <div className="price"></div>
              </div>
              <div className="delivery-time">
                {address?.address ? address?.address : tl("Shop address")}
              </div>
            </div>
            <div className="store-address">
              <MapOnlyShow location={currentShop.location} />
            </div>
          </div>
          <div className="general-info">
            <div className="warning-msg">
              <InfoLineIcon />
              {`The shop is open from  ${currentShop?.open_time} to ${currentShop?.close_time}`}
            </div>
            <DateRangePopover
              label="Date"
              onChange={handleDeliveryDate}
              value={deliveryDate}
            />
          </div>
        </div>
        <button className="btn-success" onClick={handleContinue}>
          {tl("Continue")}
        </button>
      </div>
    </div>
  );
};

export default Pickup;
