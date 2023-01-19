import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CheckboxBlankCircleLineIcon from "remixicon-react/CheckboxBlankCircleLineIcon";
import RecordCircleLineIcon from "remixicon-react/RecordCircleLineIcon";
import { PaymentApi } from "../../api/main/payment";
import { TransactionsApi } from "../../api/main/transactions";
import { images } from "../../constants/images";
import { MainContext } from "../../utils/contexts/MainContext";
import { getPrice } from "../../utils/getPrice";
import DiscordLoader from "../loader/discord-loader";
import PayPal from "../payment/paypal";

const PayLater = ({ getOrderDetail, data, setOpen, open }) => {
  const [paymentType, setPaymentType] = useState(null);
  const [payment, setPayment] = useState(null);
  const [openPayPal, setOpenPayPal] = useState(null);
  const user = useSelector((state) => state.user.data);
  const { getUser } = useContext(MainContext);

  const getPayment = () => {
    PaymentApi.get()
      .then((res) => {
        setPaymentType(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getPayment();
  }, []);
  useEffect(() => {
    if (!open) setOpenPayPal(null);
  }, [open]);

  const handleClick = (type) => {
    setPayment(type);
    setOpenPayPal(false);
  };
  const Pay = () => {
    if (payment.tag === "paypal") {
      setOpenPayPal(true);
    } else {
      TransactionsApi.create(data.id, {
        payment_sys_id: payment.id,
      })
        .then(() => {
          getOrderDetail();
          setOpen(false);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          if (payment.tag === "wallet") getUser();
        });
    }
  };
  return (
    <div className="general-info pay-later">
      {openPayPal ? (
        <PayPal
          createdOrderData={data}
          payment={payment}
          setCheckoutContent={() => {}}
          closeDrawer={setOpen}
        />
      ) : paymentType ? (
        paymentType.map((type, key) => {
          return (
            <div
              key={key}
              className="method-item"
              onClick={() => handleClick(type)}
            >
              <div className="shipping-type">
                <div className="type">
                  {payment?.id === type.id ? (
                    <RecordCircleLineIcon color="#61DC00" size={20} />
                  ) : (
                    <CheckboxBlankCircleLineIcon size={20} />
                  )}
                  <span>{type.tag}</span>
                </div>
                {type.tag === "wallet" ? (
                  <div className="price">{getPrice(user?.wallet?.price)}</div>
                ) : (
                  <img
                    className="method-icon"
                    src={images[type.tag]}
                    alt={type.tag}
                  />
                )}
              </div>
              <div className="delivery-time">{type?.translation?.title}</div>
            </div>
          );
        })
      ) : (
        <DiscordLoader />
      )}
      {!openPayPal && (
        <button className="btn btn-success" onClick={Pay}>
          Pay
        </button>
      )}
    </div>
  );
};

export default PayLater;
