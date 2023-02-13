import React, { useContext, useEffect, useState } from "react";
import InputPassword from "../form/input-password";
import serviceWithOutToken from "../../services/auth";
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/slices/user";
import { setCookie } from "nookies";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import InputText from "../form/input-text";
import Loader4LineIcon from "remixicon-react/Loader4LineIcon";
import { MainContext } from "../../utils/contexts/MainContext";
import { useTranslation } from "react-i18next";
import en from "react-phone-number-input/locale/en";

import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber,
  isPossiblePhoneNumber,
} from "react-phone-number-input";
import Link from "next/link";
import { useRef } from "react";
const SignInForm = () => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const { getUser } = useContext(MainContext);
  const { t: tl } = useTranslation();
  const [phone, setPhone] = useState();

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const onFinish = async (e) => {
    setLoader(true);
    e && e.preventDefault();
    const body = {};
    setError("");
    dispatch(clearUser());
    // if (!userData.login?.includes("@")) {
    body.phone = phone /*  userData.login; */;
    // } else {
    //   body.email = userData.login;
    // }

    body.password = userData.password;
    serviceWithOutToken
      .post("/api/v1/auth/login", body)
      .then((res) => {
        setCookie(null, "access_token", res.data.data.access_token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        getUser();
        if (router.query.invite) {
          router.push(`/invite/${router.query.invite}`);
        } else router.push("/");
      })
      .catch((error) => {
        setError(tl("Login or password is incorrect"));
        toast.error(error.response.data.message, {
          position: "top-right",
        });
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const onChange = (event) => {
    const { target } = event;
    const value = target.type === "radio" ? target.checked : target.value;
    const { name } = target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <div className="sign-up-form">
      <form onSubmit={onFinish} autoComplete="off">
        <div style={{ textAlign: "center", color: "red", marginBottom: 10 }}>
          {error}
        </div>
        {/* <InputText
          name="login"
          onChange={onChange}
          label="Login"
          placeholder="Phone number"
        /> */}
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
          // onChange={onChange}
        />
        <InputPassword
          name="password"
          onChange={onChange}
          label="Password"
          placeholder="*******"
        />
        <Link href="/forget-password">
          <div className="forget">{tl("Forgot password")}</div>
        </Link>
        <button type="submit" className="btn-success" data-loader={loader}>
          <Loader4LineIcon />
          {tl("Login")}
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
