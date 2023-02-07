import React, { useEffect, useRef } from "react";
import OtpInput from "react-otp-input";
import RefreshLineIcon from "remixicon-react/RefreshLineIcon";
import Countdown from "../../utils/countDown";
import { useTranslation } from "react-i18next";
import Loader4LineIcon from "remixicon-react/Loader4LineIcon";
const Confirm = ({
  isTimeOver,
  setIsTimeOver,
  verifyPhone,
  getVerifyCode,
  setOtp,
  otp,
  handleConfirm,
  loader,
}) => {
  const ref = useRef(null);
  const { t: tl } = useTranslation();
  const handleChange = (otp) => setOtp(otp);
  const handleResend = () => {
    setIsTimeOver(null);
    getVerifyCode();
  };

  useEffect(() => {
    ref?.current?.focus();
  }, []);

  return (
    <form onSubmit={handleConfirm}>
      <div className="confirm">
        <div className="sent-gmail">{`${tl("sent-sms")} ${
          verifyPhone.phone
        }`}</div>
        <OtpInput
          shouldAutoFocus={true}
          value={otp}
          onChange={handleChange}
          numInputs={6}
          separator={""}
          className="otp-input"
        />
        <div className="btn-group">
          <button
            type="submit"
            data-loader={loader}
            className="btn-success confirm-btn"
          >
            <Loader4LineIcon />
            {tl("Confirm")}
          </button>
          {isTimeOver ? (
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
          )}
        </div>
      </div>
    </form>
  );
};

export default Confirm;
