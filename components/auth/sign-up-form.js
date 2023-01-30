import Link from "next/link";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import InputText from "../form/input-text";
import Loader4LineIcon from "remixicon-react/Loader4LineIcon";
import { Input, Select } from "antd";
const SignUpForm = ({ getVerifyCode, setPhone, loader, phone }) => {
  const [privacy, setPrivacy] = useState(true);
  const { t: tl } = useTranslation();
  const onFinish = (e) => {
    e.preventDefault();
    getVerifyCode();
  };
  return (
    <div className="sign-up-form">
      <form onSubmit={onFinish}>
        {/*  <InputText
          onChange={(e) => setPhone(e.target.value)}
          // label="Phone number"
          placeholder=""
        /> */}
        {/* <Input.Group compact>
          <Select defaultValue="Sign Up" style={{ width: "30%" }}>
            <Option value="Sign Up">Sign Up</Option>
            <Option value="Sign In">Sign In</Option>
          </Select>
          <AutoComplete
            style={{ width: "70%" }}
            placeholder="Email"
            options={[{ value: "text 1" }, { value: "text 2" }]}
          />
        </Input.Group> */}
        <Input.Group size="large" style={{ height: 70 }}>
          <Select size="large"
            style={{ height: 70, width: "30%" }}
            defaultValue={1}
          >
            <Option
              value="1"
              style={{  
                backgroungImage: 'url("/assets/images/app-store.png")',
                height: 70,
              }}
            >
              <img src="/assets/images/app-store.png" />
            </Option>
            <Option
              value="2"
              style={{
                backgroungImage: 'url("/assets/images/app-store.png")',
                height: 70,
              }}
            >
              <img src="/assets/images/app-store.png" />
            </Option>
            <Option
              value="3"
              style={{
                backgroungImage: 'url("/assets/images/app-store.png")',
                height: 70,
              }}
            >
              <img src="/assets/images/app-store.png" />
            </Option>
          </Select>
          <Input  style={{ width: "70%", height: 70 }} type="tel" />
        </Input.Group>
        <div className="privacy">
          <input type="checkbox" onChange={() => setPrivacy(!privacy)} />
          {/* {tl("i agree to send SMS code.")} */}
          <Link href="/privacy-policy">
            <span>{tl("i agree to send SMS code. Privacy and Policy")}</span>
          </Link>
        </div>
        <button
          data-loader={loader}
          disabled={!(!privacy && phone)}
          type="submit"
          // className="btn-auth"
        >
          {/* <Loader4LineIcon /> */}
          {tl("Send SMS code")}
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
