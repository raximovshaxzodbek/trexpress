import Link from "next/link";
import React, { useState } from "react";
import SignUpForm from "../../../components/auth/sign-up-form";
import { images } from "../../../constants/images";
import Confirm from "../../../components/auth/confirm";
import SignUpFormFull from "../../../components/auth/sign-up-full";
import SocialAuth from "../../../components/auth/social";
import { useTranslation } from "react-i18next";
import serviceWithOutToken from "../../../services/auth";
import { UserApi } from "../../../api/main/user";
import { setCookie } from "nookies";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { MainContext } from "../../../utils/contexts/MainContext";
import { useContext } from "react";
import { useSelector } from "react-redux";
const SignUp = () => {
  const { t: tl } = useTranslation();
  const router = useRouter();
  const settings = useSelector((state) => state.settings.data);
  const [formKey, setFormKey] = useState("phone");
  const [verifyPhone, setVerifyPhone] = useState({});
  const [isTimeOver, setIsTimeOver] = useState(null);
  const [phone, setPhone] = useState(null);
  const [loader, setLoader] = useState(false);
  const [otp, setOtp] = useState(null);
  const [userData, setUserData] = useState({});
  const { getUser } = useContext(MainContext);

  // 946758050
  const getVerifyCode = () => {
    setLoader(true);
    serviceWithOutToken
      .post("/api/v1/auth/register", { phone })
      .then((res) => {
        setVerifyPhone(res.data.data);
        setFormKey("confirm");
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
        setLoader(false);
      });
  };
  const handleConfirm = () => {
    setLoader(true);
    serviceWithOutToken
      .post("/api/v1/auth/verify/phone", {
        verifyId: verifyPhone.verifyId,
        verifyCode: otp,
      })
      .then((res) => {
        setFormKey("formfull");
        setCookie(null, "access_token", res.data.data.token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        getUser();
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
        toast.error(error.response.data.message);
      });
  };
  const onSubmit = (e) => {
    setLoader(true);
    e.preventDefault();
    UserApi.update(userData)
      .then(() => {
        setLoader(false);
        getUser();
        if (router.query.invite) {
          router.push(`/invite/${router.query.invite}`);
        } else router.push("/");
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="container">
      <div className="auth-header">
        <Link href="/">
          <a className="logo">{settings?.title}</a>
        </Link>
        <div className="auth-btn-side">
          <div className="label">{tl("Have an account")}</div>
          <Link href="/auth/sign-in">
            <a className="btn-auth">{tl("Sign In")}</a>
          </Link>
        </div>
      </div>
      <div className="authentication">
        <div className="auth-form">
          <div className="title">{tl("Sign Up")}</div>
          {formKey === "phone" && (
            <SignUpForm
              loader={loader}
              setPhone={setPhone}
              getVerifyCode={getVerifyCode}
              phone={phone}
            />
          )}
          {formKey === "confirm" && (
            <Confirm
              loader={loader}
              otp={otp}
              setOtp={setOtp}
              verifyPhone={verifyPhone}
              isTimeOver={isTimeOver}
              setIsTimeOver={setIsTimeOver}
              setFormKey={setFormKey}
              getVerifyCode={getVerifyCode}
              handleConfirm={handleConfirm}
            />
          )}
          {formKey === "formfull" && (
            <SignUpFormFull
              loader={loader}
              userData={userData}
              setUserData={setUserData}
              setFormKey={setFormKey}
              onSubmit={onSubmit}
            />
          )}
          <SocialAuth />
        </div>
        <div className="auth-banner">
          <img src={images.AuthBanner} alt="Auth banner" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
