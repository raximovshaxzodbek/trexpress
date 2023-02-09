import Link from "next/link";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import InputText from "../form/input-text";
import Loader4LineIcon from "remixicon-react/Loader4LineIcon";
import { Input, Select } from "antd";
import { DownSquareOutlined } from "@ant-design/icons";
import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber,
  isPossiblePhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import en from "react-phone-number-input/locale/en";
import { useEffect, useRef } from "react";

const SignUpForm = ({ getVerifyCode, setPhone, loader, phone }) => {
  const [privacy, setPrivacy] = useState(true);
  const ref = useRef(null);
  const { t: tl } = useTranslation();
  const onFinish = (e) => {
    e.preventDefault();
    if (phone && isValidPhoneNumber && isPossiblePhoneNumber) {
      getVerifyCode();
      setPhone(formatPhoneNumber(phone));
    } else {
      alert("fr");
    }
  };

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div className="sign-up-form">
      <form onSubmit={onFinish}>
        <PhoneInput
          ref={ref}
          labels={en}
          placeholder="Phone number"
          // defaultCountry="RU"
          value={phone}
          onChange={(phone) => {
            setPhone(() => {
              setPhone(formatPhoneNumberIntl(phone));
            });
          }}
        />

        {/*  <InputText
          onChange={(e) => setPhone(e.target.value)}
          // label="Phone number"
          placeholder=""
        /> */}
        <div style={{ height: 18 }} />
        <div className="privacy">
          <input type="checkbox" onChange={() => setPrivacy(!privacy)} />
          <Link href="/privacy-policy">
            <span>{tl("i agree to send SMS code. Privacy and Policy")}</span>
          </Link>
        </div>
        <button
          data-loader={loader}
          disabled={(privacy || !phone)}
          type="submit"
          className="btn-auth"
        >
          {/* <Loader4LineIcon /> */}
          {tl("Send SMS code")}
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
