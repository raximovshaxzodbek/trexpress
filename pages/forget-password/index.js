import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Confirm from "../../components/forget-password/confirm-otp";
import EnterPhone from "../../components/forget-password/enter-phone";
import NewPassword from "../../components/forget-password/new-password";
import { images } from "../../constants/images";
import serviceWithOutToken from "../../services/auth";
import { MainContext } from "../../utils/contexts/MainContext";

const ForgetPassword = () => {
  const { t: tl } = useTranslation();
  const settings = useSelector((state) => state.settings.data);
  const [formStep, setFormStep] = useState("enter-phone");
  const [phone, setPhone] = useState();
  const [loader, setLoader] = useState(false);
  const [verify, setVerify] = useState(false);
  const { theme } = useContext(MainContext);

  const sumbimtEnterPhone = (e) => {
    e && e.preventDefault();
    serviceWithOutToken
      .post("/api/v1/auth/forgot/password", { phone })
      .then((res) => {
        setVerify(res.data.data);
        setFormStep("confirm");
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <div className="container">
      <div className="auth-header">
        <Link href="/">
          <Image
            src={`/assets/images/${theme}ThemeLogo.png`}
            alt="logo"
            width={200}
            height={60}
          />
        </Link>
        <div className="auth-btn-side">
          <div className="label">{tl("Do not have an account?")}</div>
          <Link href="/auth/sign-up">
            <a className="btn-auth">{tl("Sign Up")}</a>
          </Link>
        </div>
      </div>
      <div className="authentication">
        <div className="auth-form">
          <div className="title">{tl("Forget password")}</div>
          {formStep === "enter-phone" && (
            <EnterPhone
              phone={phone}
              loader={loader}
              setPhone={setPhone}
              sumbimtEnterPhone={sumbimtEnterPhone}
            />
          )}
          {formStep === "confirm" && (
            <Confirm
              setFormStep={setFormStep}
              verify={verify}
              sumbimtEnterPhone={sumbimtEnterPhone}
            />
          )}
          {formStep === "new-password" && <NewPassword />}
        </div>
        <div className="auth-banner">
          <img
            src="/assets/images/Online-security-registration.png"
            alt="Auth banner"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
