import Link from "next/link";
import React from "react";
import { images } from "../../../constants/images";
import SignInForm from "../../../components/auth/sign-in-form";
import SocialAuth from "../../../components/auth/social";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useContext } from "react";
import { MainContext } from "../../../utils/contexts/MainContext";

const SignIn = () => {
  const { t: tl } = useTranslation();
  const settings = useSelector((state) => state.settings.data);
  const { theme } = useContext(MainContext);
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
          <div className="title">{tl("Sign In")}</div>
          <SignInForm />
          {/* <SocialAuth /> */}
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

export default SignIn;
