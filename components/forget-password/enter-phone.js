import React from "react";
import { useTranslation } from "react-i18next";
import InputText from "../form/input-text";
import Loader4LineIcon from "remixicon-react/Loader4LineIcon";

const EnterPhone = ({ loader, sumbimtEnterPhone, setPhone }) => {
  const { t: tl } = useTranslation();

  return (
    <div className="sign-up-form">
      <form onSubmit={sumbimtEnterPhone}>
        <InputText
          onChange={(e) => setPhone(e.target.value)}
          label="Phone number"
          placeholder="1 202 340 1032"
          type="number"
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
