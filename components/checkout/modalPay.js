import { Modal } from "antd";
import axios from "axios";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import { useRef } from "react";

const ModalPay = () => {
  const [modal, setModal] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (card_number && monthExp && yearExp) {
      setCard({
        card_number: card_number,
        expiry: yearExp + monthExp,
      });

      console.log(card);

      const data = await axios.post("/partner/bind-card/create HTTP/1.1", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 35|ZdkFJw0h36Jg46P4MkZVNDejmSeTCikKdlyA5KK9 `,
          // Host: safin24.uz,
        },
      });
      console.log(data.data);
      e.target.reset();
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
      <div className="method-item" onClick={() => setModal(true)}>
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
        open={modal}
        onCancel={() => setModal(false)}
        closable
        style={{
          top: 80,
          left: -80,
        }}
      >
        <div className="modalTop">
          <div className="logomodal">Привяжите карту</div>

          {/* <div className="orderId">
            <h3>
              The boarding shop that is being purchased is SAFIN24. Order number
              No. 329013
            </h3>
          </div> */}
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
              Pay
            </button>
          </div>
        </form>

        {/* <div className="bottompayment">
            <p>Total value payable</p>
            <p>
              {totalPrice} {cookies.currency_symbol}
            </p>
          </div> */}
      </Modal>
    </>
  );
};
export default ModalPay;
