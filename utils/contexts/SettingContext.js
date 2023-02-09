import { useRouter } from "next/router";
import { parseCookies, setCookie } from "nookies";
import { useEffect } from "react";
import { useState, useContext, createContext } from "react";
import { useDispatch } from "react-redux";
import { UserApi } from "../../api/main/user";
import { clearCart, clearOrderShops } from "../../redux/slices/cart";
import { clearViewedList } from "../../redux/slices/viewed-product";
import i18n from "../../services/i18next";
import informationService from "../../services/informationService";
import { useThemeDetector } from "../hooks/useThemeDetector";
import { setCurrency } from "../setCurrency";
import { setLanguage } from "../setLanguage";
import { MainContext } from "./MainContext";


export const SettingsContext = createContext();

export const SettingsContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const cookies = parseCookies();
  const router = useRouter();
  const {
    setTheme,
    currency,
    language,
    checkProduct,
    checkViewedProduct,
    getNotification,
  } = useContext(MainContext);

  const [defaultCurrency, setDefaultCurrency] = useState({});
  const [defaultLanguage, setDefaultLanguage] = useState({});
  const isDarkTheme = useThemeDetector();

  const currencyList = () => {
    const array = [];
    currency.forEach((element) => {
      array.push({
        id: element.id,
        value: `${element.title} - (${element.symbol})`,
        ...element,
      });
    });
    return array;
  };
  const languageList = () => {
    const array = [];
    language.forEach((element) => {
      array.push({
        id: element.id,
        value: element.title,
        img: element.img,
        ...element,
      });
    });
    return array;
  };
  const handleClick = (key) => {
    if (key === "auto") {
      setTheme(key);
      setCookie(null, "theme", isDarkTheme ? "dark" : "light");
    } else {
      setTheme(key);
      setCookie(null, "theme", key);
    }
  };
  const handleCurrency = (e) => {
    if (cookies.access_token)
      UserApi.get({ currency_id: e.id })
        .then((res) => {
          dispatch(savedUser(res.data));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          checkProduct();
          checkViewedProduct();
        });
    setCurrency(e);
    setDefaultCurrency(e.id);
    dispatch(clearCart());
    dispatch(clearOrderShops());
  };

  const handleLanguae = (e) => {
    const body = document.getElementsByTagName("body");
    // setLoader(true);
    const { locale } = e;
    setDefaultLanguage(e.id);
    setLanguage(e);
    if (e.backward) {
      body[0].setAttribute("dir", "rtl");
      setCookie(null, "dir", "rtl");
    } else {
      body[0].setAttribute("dir", "ltr");
      setCookie(null, "dir", "ltr");
    }

    informationService
      .translations({ lang: locale })
      .then(({ data }) => {
        i18n.addResourceBundle(locale, "translation", data.data);
        i18n.changeLanguage(locale);
      })
      .finally(() => {
        // setLoader(false);
        router.push("/");
      });
    dispatch(clearViewedList());
    getNotification();
  };
  useEffect(() => {
    setDefaultCurrency(cookies.currency_id);
    setDefaultLanguage(cookies.language_id);
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        defaultCurrency,
        setDefaultCurrency,
        defaultLanguage,
        setDefaultLanguage,
        handleLanguae,
        handleCurrency,
        handleClick,
        languageList,
        currencyList,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
