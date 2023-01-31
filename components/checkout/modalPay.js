import { Button, Modal } from "antd";
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
        onOk={() => setModal(false)}
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
      </Modal>
    </>
  );
};
export default ModalPay;