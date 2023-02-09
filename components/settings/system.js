import React, { useContext } from "react";
import CustomSelect from "../form/custom-select";
import RadioButtonFillIcon from "remixicon-react/RadioButtonFillIcon";
import CheckboxBlankCircleLineIcon from "remixicon-react/CheckboxBlankCircleLineIcon";
import { MainContext } from "../../utils/contexts/MainContext";
import { useTranslation } from "react-i18next";
import { SettingsContext } from "../../utils/contexts/SettingContext";
const System = ({ setLoader }) => {
  const { t: tl } = useTranslation();
  const { theme } = useContext(MainContext);

  // const handleLanguae = (e) => {
  //   const body = document.getElementsByTagName("body");
  //   setLoader(true);
  //   const { locale } = e;
  //   setDefaultLanguage(e.id);
  //   setLanguage(e);
  //   if (e.backward) {
  //     body[0].setAttribute("dir", "rtl");
  //     setCookie(null, "dir", "rtl");
  //   } else {
  //     body[0].setAttribute("dir", "ltr");
  //     setCookie(null, "dir", "ltr");
  //   }

  //   informationService
  //     .translations({ lang: locale })
  //     .then(({ data }) => {
  //       i18n.addResourceBundle(locale, "translation", data.data);
  //       i18n.changeLanguage(locale);
  //     })
  //     .finally(() => {
  //       setLoader(false);
  //       router.push("/");
  //     });
  //   dispatch(clearViewedList());
  //   getNotification();
  // };

  const {
    defaultCurrency,
    defaultLanguage,
    handleLanguae,
    handleCurrency,
    handleClick,
    languageList,
    currencyList,
  } = useContext(SettingsContext);
  return (
    <div className="system">
      <div className="title">{tl("Others")}</div>
      <CustomSelect
        label="Language"
        placeholder="English"
        options={languageList()}
        onChange={(e) => {
          handleLanguae(e);
        }}
        value={defaultLanguage}
      />
      <CustomSelect
        label="Currencies"
        placeholder="Currency"
        options={currencyList()}
        onChange={(e) => {
          handleCurrency(e);
        }}
        value={defaultCurrency}
      />
      <div className="theme-item-wrapper">
        <div className="theme-items">
          <div
            className="theme-card-wrapper"
            onClick={() => handleClick("light")}
          >
            <div className="theme-card light">
              <div className="line">
                <div className="line-sm"></div>
              </div>
              <div className="line">
                <div className="circle"></div>
                <div className="line-sm"></div>
              </div>
              <div className="line">
                <div className="circle"></div>
                <div className="line-sm"></div>
              </div>
              <div className="line">
                <div className="circle"></div>
                <div className="line-sm"></div>
              </div>
              <div className="line">
                <div className="circle"></div>
                <div className="line-sm"></div>
              </div>
            </div>
            <div className="select-box">
              <div className="item">
                {theme === "light" ? (
                  <RadioButtonFillIcon color="#61DC00" size={20} />
                ) : (
                  <CheckboxBlankCircleLineIcon color="#B8B8B8" size={20} />
                )}
                <span>{tl("Light")}</span>
              </div>
            </div>
          </div>
          <div
            className="theme-card-wrapper"
            onClick={() => handleClick("dark")}
          >
            <div className="theme-card dark">
              <div className="line">
                <div className="line-sm"></div>
              </div>
              <div className="line">
                <div className="circle"></div>
                <div className="line-sm"></div>
              </div>
              <div className="line">
                <div className="circle"></div>
                <div className="line-sm"></div>
              </div>
              <div className="line">
                <div className="circle"></div>
                <div className="line-sm"></div>
              </div>
              <div className="line">
                <div className="circle"></div>
                <div className="line-sm"></div>
              </div>
            </div>
            <div className="select-box">
              <div className="item">
                {theme === "dark" ? (
                  <RadioButtonFillIcon color="#61DC00" size={20} />
                ) : (
                  <CheckboxBlankCircleLineIcon color="#B8B8B8" size={20} />
                )}
                <span>{tl("Dark")}</span>
              </div>
            </div>
          </div>
          <div
            className="theme-card-wrapper"
            onClick={() => handleClick("auto")}
          >
            <div className="theme-card auto">
              <div className="light">
                <div className="line">
                  <div className="line-sm"></div>
                </div>
                <div className="line">
                  <div className="circle"></div>
                  <div className="line-sm"></div>
                </div>
                <div className="line">
                  <div className="circle"></div>
                  <div className="line-sm"></div>
                </div>
                <div className="line">
                  <div className="circle"></div>
                  <div className="line-sm"></div>
                </div>
                <div className="line">
                  <div className="circle"></div>
                  <div className="line-sm"></div>
                </div>
              </div>
              <div className="dark">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </div>
            </div>
            <div className="select-box">
              <div className="item">
                {theme === "auto" ? (
                  <RadioButtonFillIcon color="#61DC00" size={20} />
                ) : (
                  <CheckboxBlankCircleLineIcon color="#B8B8B8" size={20} />
                )}
                <span>{tl("Auto")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default System;
