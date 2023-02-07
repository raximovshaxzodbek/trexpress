import React from "react";
import { useTranslation } from "react-i18next";
import InputText from "../form/input-text";
import Loader4LineIcon from "remixicon-react/Loader4LineIcon";
import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber,
  isPossiblePhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import en from "react-phone-number-input/locale/en";
import { useRef } from "react";
import { useEffect } from "react";

const EnterPhone = ({ loader, sumbimtEnterPhone, setPhone, phone }) => {
  const { t: tl } = useTranslation();
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div className="sign-up-form">
      <form onSubmit={sumbimtEnterPhone}>
        {/* <InputText
          onChange={(e) => setPhone(e.target.value)}
          label="Phone number"
          placeholder="1 202 340 1032"
          type="number"
        /> */}
        <PhoneInput
          ref={ref}
          labels={en}
          value={phone}
          onChange={(phone) => {
            setPhone(() => {
              setPhone(formatPhoneNumberIntl(phone));
            });
          }}
        />
        <button data-loader={loader} type="submit" className="btn-success">
          <Loader4LineIcon />
          {tl("Send sms code")}
        </button>
      </form>
    </div>
  );
};

export default EnterPhone;
