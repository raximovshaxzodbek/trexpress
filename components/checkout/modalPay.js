import { Modal } from "antd";
import React, { useState } from "react";
const ModalPay = (props) => {
  const [modal, setModal] = useState(false);
  return (
    <>
      <div className="method-item" onClick={() => setModal(true)}>
        <div className="shipping-type">
          <div className="type">
            {/* <RecordCircleLineIcon color="#61DC00" size={20} /> */}
            {/* <CheckboxBlankCircleLineIcon size={20} /> */}
            <span>add cart</span>
          </div>
          <img
            className="method-icon"
            src="./assets/images/addCreditCard.jpg"
            alt="New cart"
          />
        </div>
        {/* <div className="delivery-time">{type?.translation?.title}</div> */}
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
          <div className="logomodal">Logo SAFIN24</div>

          <div className="orderId">
            <h3>
              The boarding shop that is being purchased is SAFIN24. Order number
              No. 329013
            </h3>
          </div>
        </div>

        <div className="cardfilling">
          <div className="cardnumber">
            <input type="number" placeholder="Enter the card number" />
            <img src="./assets/images/humo.svg" alt="404" />
          </div>

          <div className="card-date">
            <input type="number" placeholder="MM" />
            <input type="number" placeholder="YY" />
          </div>

          <div className="modalBottom">
            <button style={{ width: "100% !important" }} id="btnpay">
              Pay
            </button>
          </div>
        </div>

        <div className="bottompayment">
          <p>Total value payable</p>
          <p>2 059 000 UZB</p>
        </div>
      </Modal>
    </>
  );
};
export default ModalPay;
