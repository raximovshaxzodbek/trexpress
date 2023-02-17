import axios from "axios";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import { useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { B } from "react-html5video/dist";
import Confirm from "../auth/confirm";
import Loader4LineIcon from "remixicon-react/Loader4LineIcon";
import RefreshLineIcon from "remixicon-react/RefreshLineIcon";
import OtpInput from "react-otp-input";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { SettingsContext } from "../../utils/contexts/SettingContext";
import { Button } from "antd";

const ModalPay = () => {
  const [open, setOpen] = useState(false);
  const cookies = parseCookies();
  const [card, setCard] = useState({});
  const [card_number, setCard_number] = useState("");
  const [yearExp, setYearExp] = useState("");
  const [monthExp, setMonthExp] = useState("");
  const iconRef = useState(null);
  const ref = useRef(null);
  const borderRef = useRef(null);
  const inputref = useRef(null);
  const inputref2 = useRef(null);
  const [step, setStep] = useState("addCard");
  const [otp, setOtp] = useState();
  const { t: tl } = useTranslation();
  const [txid, setTxid] = useState(null);
  const { setCreditCard } = useContext(SettingsContext);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #ffffff",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const handleClose = () => setOpen(false);

  const handleKey = (e) => {
    if (e.target.value.length > 4) {
      iconRef.current.style = "opacity:1";
    } else {
      iconRef.current.style = "opacity:0";
    }

    if (e.target.value.length > 15) {
      e.target.value = e.target.value.slice(0, 16);
    }
  };

  const month = (e) => {
    if (e.target.value.length > 2) {
      e.target.value = e.target.value.slice(0, 2);
    }
  };

  const year = (e) => {
    if (e.target.value.length > 2) {
      e.target.value = e.target.value.slice(0, 2);
    }
  };

  const handleCardNumber = (e) => {
    setCard_number(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (card_number && monthExp && yearExp) {
      setCard({
        card_number: card_number,
        expiry: yearExp + monthExp,
      });

      const resp = await axios.post(
        "https://partner.paymo.uz/partner/bind-card/create",
        {
          card_number: String(card.card_number),
          expiry: String(card.expiry),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 73d23108-f635-31b4-975c-3ad4f7224fe3`,
            Host: "partner.paymo.uz",
            "Content-Length": 0,
            Connection: "keep-alive",
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
          },
          auth: {
            Username: "ZLxYtIFHxYnQXpGstH7Mm6Fy79Ia",
            Password: "mVDSfWJIF0M4Az9rYtcY9KfTnsAa",
          },
        }
      );

      console.log(
        "данные от запроса на подтверждение для привязки карты",
        resp.data
      );
      console.log(
        "транзакция айди для подтверждения привязки карты",
        resp.data?.transaction_id
      );
      setTxid(resp.data?.transaction_id);
      setStep("otp");
    } else {
      ref.current.style = "opacity:1";
      borderRef.current.style = "border:2px solid red";
      inputref.current.style = "border:2px solid red";
      inputref2.current.style = "border:2px solid red";

      setTimeout(() => {
        ref.current.style = "opacity:0";
        borderRef.current.style = `border:""`;
        inputref.current.style = "border:none";
        inputref2.current.style = "border:none";
      }, 3000);
    }
  };

  const handleOptSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await axios.post(
        "https://partner.paymo.uz/partner/bind-card/apply",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer Bearer 97883419-b706-3b2f-aa38-91b86f92a15d",
            Host: "partner.paymo.uz",
            "Content-Length": 44,
          },
          body: JSON.stringify({
            transaction_id: txid,
            otp: otp,
          }),
        }
      );
      console.log("дата от подтверждения запроса на привязку карты", resp.data);
      console.log("токен", resp.data.data.card_token);
      setCreditCard(card);
    } catch (e) {
      console.error(e);
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      {/* <Button ghost onClick={() => localStorage.clear()}>
        clear localstorage
      </Button> */}

      <div className="method-item" onClick={() => setOpen(true)}>
        <div className="shipping-type">
          <div className="type">
            <span>add cart</span>
          </div>
          <img
            className="method-icon"
            src="./assets/images/addCreditCard.jpg"
            alt="New cart"
          />
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {step === "addCard" && (
            <>
              <div className="modalTop">
                <div className="logomodal">Привяжите карту</div>
              </div>
              <form className="cardfilling" onSubmit={handleSubmit}>
                <span className="card-notification" ref={ref}>
                  Fill all fields
                </span>
                <div className="cardnumber" ref={borderRef}>
                  <input
                    name="number"
                    type="number"
                    placeholder="Enter the card number"
                    value={card_number}
                    onChange={handleCardNumber}
                    onInput={handleKey}
                  />
                  <img ref={iconRef} src="./assets/images/humo.svg" alt="404" />
                </div>
                <div className="card-date">
                  <input
                    ref={inputref}
                    type="number"
                    placeholder="MM"
                    name="month"
                    value={monthExp}
                    onChange={(e) => setMonthExp(e.target.value)}
                    onInput={month}
                  />
                  <input
                    ref={inputref2}
                    type="number"
                    placeholder="YY"
                    name="year"
                    value={yearExp}
                    onChange={(e) => setYearExp(e.target.value)}
                    onInput={year}
                  />
                </div>

                <div className="modalBottom">
                  <button style={{ width: "100% !important" }} id="btnpay">
                    Add Cart
                  </button>
                </div>
              </form>
            </>
          )}
          {step === "otp" && (
            <form onSubmit={handleOptSubmit}>
              <p onClick={() => setStep("addCard")}>back</p>
              <div className="confirm">
                <div className="sent-gmail">{tl("Подтвердите")}</div>
                <OtpInput
                  shouldAutoFocus={true}
                  value={otp}
                  numInputs={6}
                  separator={""}
                  className="otp-input"
                  onChange={setOtp}
                />
                <div className="btn-group">
                  <button
                    type="submit"
                    data-loader={false}
                    className="btn-success confirm-btn"
                  >
                    <Loader4LineIcon />
                    {tl("Confirm")}
                  </button>
                  {/* {isTimeOver ? (
                   <button className="btn-dark" onClick={handleResend}>
                     <RefreshLineIcon size={28} />
                   </button>
                 ) : (
                   <button className="btn-dark">
                     <Countdown
                       isTimeOver={isTimeOver}
                       setIsTimeOver={setIsTimeOver}
                     />
                   </button>
                 )} */}
                </div>
              </div>
            </form>
          )}
        </Box>
      </Modal>
    </>
  );
};
export default ModalPay;
