import React, { useEffect, useState } from "react";
import RecordCircleLineIcon from "remixicon-react/RecordCircleLineIcon";
import CheckboxBlankCircleLineIcon from "remixicon-react/CheckboxBlankCircleLineIcon";
import { PaymentApi } from "../../api/main/payment";
import { images } from "../../constants/images";
import CustomDrawer from "../drawer";
import DiscordLoader from "../loader/discord-loader";
import AddNewCard from "./add-new-card";
import ModalPay from "./modalPay";
import CustomSelect from "../form/custom-select";
import { useDispatch, useSelector } from "react-redux";
import { addToOrderAddress } from "../../redux/slices/order";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { getPrice } from "../../utils/getPrice";
import { useContext } from "react";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { SettingsContext } from "../../utils/contexts/SettingContext";
const PaymentMethod = ({
  setCheckoutContent,
  setStepKey,
  address,
  setPayment,
  deliveryType,
}) => {
  const { t: tl } = useTranslation();
  const dispatch = useDispatch();
  const { userLocation } = useContext(AuthContext);
  const { getCreditCards, creditCards } = useContext(SettingsContext);
  const [open, setOpen] = useState(null);
  const [error, setError] = useState(false);
  const [paymentId, setPaymentId] = useState(null);
  const [paymentType, setPaymentType] = useState(null);
  const order = useSelector((state) => state.order);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.data);
  const currentAddress = order?.shops[0]?.delivery_address_id;
  const targetLocation = userLocation?.split(",");
  const addressList = [];

  useEffect(() => {
    getCreditCards();
  }, []);

  // localStorage.clear()
  console.log(creditCards);

  address?.forEach((item) => {
    addressList.push({
      id: item.id,
      value: item.address,
      location: item.location,
    });
  });
  const getPayment = () => {
    PaymentApi.get()
      .then((res) => {
        setPaymentType(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const selectedAddress = addressList.find(
    (item) => item.location.latitude === targetLocation[0]
  );

  useEffect(() => {
    if (!paymentType) getPayment();
    if (paymentType) {
      setPaymentId(paymentType[0]);
      setPayment(paymentType[0]);
    }
    setStepKey("payment");
  }, [paymentType]);

  useEffect(() => {
    if (selectedAddress) handleSelectAddress(selectedAddress);
  }, []);

  const handleClick = (type) => {
    setPaymentId(type);
    setPayment(type);
  };

  const handleSelectAddress = (e) => {
    setError(false);
    dispatch(
      addToOrderAddress({
        delivery_address_id: e.id,
      })
    );
  };
  const getGroupById = (flattenExtras = []) => {
    let result = [];
    flattenExtras.forEach((r) => {
      if (!result[r.shop.id]) {
        result[r.shop.id] = [];
      }
      result[r.shop.id].push(r);
    });
    return result;
  };
  const showProduct = getGroupById(cart.cartItems).filter(
    (item) => item.length > 0
  );
  const getFinnalyCheck = () => {
    let totalDiscount = 0;
    let total_price = 0;
    let totalTax = 0;
    let shopTax = 0;
    let deliveryFee = order.shops.reduce(
      (old, newd) => old + newd.delivery_fee,
      0
    );

    showProduct.forEach((item) => {
      item.forEach((data) => {
        if (data.stockId.discount) {
          totalDiscount += data.stockId.discount * data.qty;
        }
        total_price += data.total_price - data.productTax;
        totalTax += data.productTax;
        shopTax += data.shop_tax;
      });
    });
    return { totalDiscount, total_price, totalTax, shopTax, deliveryFee };
  };
  const { total_price, totalTax, shopTax, deliveryFee } = getFinnalyCheck();

  const totalAmount =
    total_price +
    totalTax +
    shopTax +
    deliveryFee -
    (order?.coupon?.price ? order?.coupon?.price : 0);

  const handleContinue = () => {
    if (paymentId?.tag === "wallet") {
      if (user?.wallet?.price < totalAmount) {
        toast.error("You don't have enough funds in your wallet");
      } else {
        if (currentAddress) {
          setCheckoutContent("verify");
        } else {
          toast.error("Please select address");
          setError(true);
        }
      }
    } else {
      if (currentAddress) {
        setCheckoutContent("verify");
      } else {
        toast.error("Please select address");
        setError(true);
      }
    }
  };

  return (
    <div className="payment-method">
      <div className="tab-pane">
        <div className="shipping-info">
          <div className="info-wrapper">
            <div className="general-info">
              <div className="title">{tl("Delivery Address")}</div>
              <CustomSelect
                options={addressList}
                label="Address"
                placeholder="Address"
                onChange={(e) => handleSelectAddress(e)}
                value={currentAddress}
                name="delivery_address_id"
                required={true}
                error={error}
                type="address"
              />
            </div>
            <div className="general-info">
              <div className="title">{tl("Payment type")}</div>
              {paymentType ? (
                paymentType.map((type, key) => {
                  return (
                    <div
                      key={key}
                      className="method-item"
                      onClick={() => handleClick(type)}
                    >
                      <div className="shipping-type">
                        <div className="type">
                          {paymentId?.id === type.id ? (
                            <RecordCircleLineIcon color="#61DC00" size={20} />
                          ) : (
                            <CheckboxBlankCircleLineIcon size={20} />
                          )}
                          <span>{type.tag}</span>
                        </div>
                        {type.tag === "wallet" ? (
                          <div className="price">
                            {getPrice(user?.wallet?.price)}
                          </div>
                        ) : (
                          <img
                            className="method-icon"
                            src={images[type.tag]}
                            alt={type.tag}
                          />
                        )}
                      </div>
                      <div className="delivery-time">
                        {type?.translation?.title}
                      </div>
                    </div>
                  );
                })
              ) : (
                <DiscordLoader />
              )}
              {creditCards?.length > 0 &&
                creditCards.map((el) => (
                  <div
                    key={el.card_number}
                    className="method-item"
                    onClick={() =>
                      alert(
                        "Перейти на страницу оплаты и оплатить с этой картф"
                      )
                    }
                  >
                    <div className="shipping-type">
                      <p>{el.card_number}</p>
                      <div>
                        <p>year:{el.expiry.substr(0, 2)}</p>
                        <p>month:{el.expiry.substr(2)}</p>
                      </div>
                      {/* <div className="type">
                        <RecordCircleLineIcon color="#61DC00" size={20} />
                        <CheckboxBlankCircleLineIcon size={20} />
                        <span>тайп тэг</span>
                      </div> */}
                      {/* <div className="price">67868868</div> */}
                    </div>
                    {/* <div className="delivery-time">
                      {type?.translation?.title}
                    </div> */}
                  </div>
                ))}
              <ModalPay totalAmount={totalAmount} />
            </div>
          </div>
        </div>
        <div className="btn-group">
          <button
            className="btn-dark"
            onClick={() => setCheckoutContent("delivery-type")}
          >
            {tl("Back")}
          </button>
          <button className="btn-success" onClick={handleContinue}>
            {tl("Continue")}
          </button>
        </div>
      </div>
      {/* <CustomDrawer title="Add new card" open={false} setOpen={setOpen}>
        <AddNewCard />
      </CustomDrawer> */}
    </div>
  );
};

export default PaymentMethod;
