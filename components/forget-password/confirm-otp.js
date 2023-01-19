import React from "react";
import OtpInput from "react-otp-input";
import RefreshLineIcon from "remixicon-react/RefreshLineIcon";
import Countdown from "../../utils/countDown";
import { useTranslation } from "react-i18next";
import Loader4LineIcon from "remixicon-react/Loader4LineIcon";
import { useState } from "react";
import serviceWithOutToken from "../../services/auth";
import { toast } from "react-toastify";
import { setCookie } from "nookies";
import { useContext } from "react";
import { MainContext } from "../../utils/contexts/MainContext";
const Confirm = ({ verify, setFormStep, sumbimtEnterPhone }) => {
  const { t: tl } = useTranslation();
  const [otp, setOtp] = useState();
  const [loader, setLoader] = useState(false);
  const [isTimeOver, setIsTimeOver] = useState(null);
  const { getUser } = useContext(MainContext);
  const handleChange = (otp) => setOtp(otp);
  const handleResend = () => {
    setIsTimeOver(null);
    sumbimtEnterPhone();
  };
  const handleConfirm = () => {
    setLoader(true);
    serviceWithOutToken
      .post("/api/v1/auth/forgot/password/confirm", {
        verifyId: verify.verifyId,
        verifyCode: otp,
      })
      .then((res) => {
        setCookie(null, "access_token", res.data.data.token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        getUser();
        setFormStep("new-password");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setLoader(false);
      });
  };
  return (
    <div className="confirm">
      <div className="sent-gmail">{`${tl("sent-sms")} ${verify.phone}`}</div>
      <OtpInput
        value={otp}
        onChange={handleChange}
        numInputs={6}
        separator={""}
        className="otp-input"
      />
      <div className="btn-group">
        <button
          data-loader={loader}
          className="btn-success confirm-btn"
          onClick={handleConfirm}
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
            <Countdown isTimeOver={isTimeOver} setIsTimeOver={setIsTimeOver} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Confirm;
