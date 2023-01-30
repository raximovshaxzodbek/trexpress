import Link from "next/link";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import InputText from "../form/input-text";
import Loader4LineIcon from "remixicon-react/Loader4LineIcon";
import { Input, Select } from "antd";
import pic from "../../public/assets/russia.png";
import { DownSquareOutlined } from "@ant-design/icons";

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
        <Input.Group compact>
          <Select
            showArrow={true}
            size="large"
            style={{ width: "30%" }}
            defaultActiveFirstOption={true}
            autoFocus={true}
            // suffixIcon={<img src="/assets/russia.png" width={80} height={50} />}
          >
            <Option value="rus">
              <img src="/assets/russia.png" width={80} height={60} />
            </Option>
            <Option value="uz">
              <img src="/assets/russia.png" width={80} height={60} />
            </Option>
            <Option value="en">
              <img src="/assets/russia.png" width={80} height={60} />
            </Option>
          </Select>
          <Input style={{ width: "70%", height: 70 }} type="tel" />
        </Input.Group>
        <div style={{ height: 18 }} />
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
