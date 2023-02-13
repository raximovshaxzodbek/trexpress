import axios from "axios";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import { useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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

  // const handleChange = (e) => {
  //   setCard({ ...card, [e.target.name]: e.target.value });
  // };

  const handleCardNumber = (e) => {
    setCard_number(e.target.value);
  };

  // const handleExpiryNumber = (e) => {
  //   setCard({ ...card, expiry: expiry });
  // };

  // let str

  console.log(() => {
    str;
  });

  let consumerKey = "ZLxYtIFHxYnQXpGstH7Mm6Fy79Ia";
  let customerSecret = "mVDSfWJIF0M4Az9rYtcY9KfTnsAa";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (card_number && monthExp && yearExp) {
      setCard({
        card_number: card_number,
        expiry: yearExp + monthExp,
      });

      const data = await axios.post("/partner/bind-card/create", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer Wkx4WXRJRkh4WW5RWHBHc3RIN01tNkZ5NzlJYTptVkRTZldKSUYwTTRBejlyWXRjWTlLZlRuc0Fh`,
          Host: "partner.paymo.uz",
        },
      });
      console.log(data.data);
      e.target.reset();
      setOpen(false);
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

  return (
    <>
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
        </Box>
      </Modal>
    </>
  );
};
export default ModalPay;
