import React, { useContext, useEffect, useState } from "react";
import EnterAddress from "../components/address/enter-delivery-address";
import CustomDrawer from "../components/drawer";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import OrderList from "../components/order/list";
import AddWallet from "../components/wallet/add";
import WalletHistory from "../components/wallet/history";
import TransferWallet from "../components/wallet/transfer";
import { MainContext } from "../utils/contexts/MainContext";
import LookDetail from "../components/looks/detail";
import { setLanguage } from "../utils/setLanguage";
import { setCookie } from "nookies";
import { SettingsContext } from "../utils/contexts/SettingContext";
import CustomSelect from "../components/form/custom-select";
import axios from "axios";
import { useTranslation } from "react-i18next";
import ArrowDownSLineIcon from "remixicon-react/ArrowDownSLineIcon";
import AddLineIcon from "remixicon-react/AddLineIcon";

const Layout = ({ children }) => {
  const {
    isOpen,
    setIsOpen,
    open,
    setOpen,
    content,
    setContent,
    theme,
    setTheme,
    language,
  } = useContext(MainContext);
  const {
    defaultCurrency,
    defaultLanguage,
    handleLanguae,
    handleCurrency,
    handleClick,
    languageList,
    currencyList,
  } = useContext(SettingsContext);

  const handleContent = (key) => {
    setContent(key);
    setOpen(true);
  };

  useEffect(() => {
    if (!content) setOpen(false);
  }, []);

  const getToken = async () => {
    try {
      const consumerKey = "ZLxYtIFHxYnQXpGstH7Mm6Fy79Ia";
      const customerSecret = "mVDSfWJIF0M4Az9rYtcY9KfTnsAa";
      const hash = btoa(consumerKey + ":" + customerSecret);
      //Wkx4WXRJRkh4WW5RWHBHc3RIN01tNkZ5NzlJYTptVkRTZldKSUYwTTRBejlyWXRjWTlLZlRuc0Fh

      const data = await axios.post(
        "https://partner.paymo.uz/token",
        {},
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic Wkx4WXRJRkh4WW5RWHBHc3RIN01tNkZ5NzlJYTptVkRTZldKSUYwTTRBejlyWXRjWTlLZlRuc0Fh`,
            Host: "partner.paymo.uz",
            "Content-Length": 0,
            Accept: "*/*",
            "User-Agent": "PostmanRuntime/7.31.0",
            "Accept-Encoding": "gzip, deflate, br",
          },
          auth: {
            Username: "ZLxYtIFHxYnQXpGstH7Mm6Fy79Ia",
            Password: "mVDSfWJIF0M4Az9rYtcY9KfTnsAa",
          },
          params: {
            grant_type: "client_credentials",
          },
        }
      );
      console.log(data.data);
    } catch (e) {
      console.error(e.message);
      console.error(e.name);
      console.error(e.code);
    }
  };

  return (
    <>
      <div className="topNavbar">
        <button onClick={getToken}>get token</button>
        <p>Aлоқа маркази : +998 99 999 99 99</p>
        <TopNavbarSelect
          options={languageList()}
          onChange={(e) => {
            handleLanguae(e);
            window.location.reload();
          }}
          value={defaultLanguage}
        />
        <TopNavbarSelect
          options={currencyList()}
          onChange={(e) => {
            handleCurrency(e);
            window.location.reload();
          }}
          value={defaultCurrency}
        />
        <TopNavbarSelect
          value={theme}
          options={[
            {
              value: "light",
              id: "light",
            },
            {
              value: "dark",
              id: "dark",
            },
            {
              value: "auto",
              id: "auto",
            },
          ]}
          onChange={(e) => {
            console.log(e);
            handleClick(e.value);
          }}
        />
      </div>
      <div className="container">
        <Navbar handleContent={handleContent} />
        {children}
        <Footer />
        <CustomDrawer title="Top up wallet" open={open} setOpen={setOpen}>
          {content === "add-wallet" && <AddWallet />}
          {content === "transfer-wallet" && <TransferWallet />}
          {content === "wallet-history" && <WalletHistory />}
          {content === "order-list" && <OrderList setOpen={setOpen} />}
          {isOpen === "enter-address" && (
            <EnterAddress setIsOpen={setIsOpen} setOpen={setOpen} />
          )}
          {content === "show-look" && <LookDetail open={open} />}
        </CustomDrawer>
      </div>
      <div
        onClick={() => setIsOpen(null)}
        className={isOpen ? "backdrop" : "d-none"}
      />
    </>
  );
};

export default Layout;

export const TopNavbarSelect = ({
  options = [],
  label = "",
  placeholder = "",
  value,
  onChange,
  name,
  type = "",
}) => {
  const { t: tl } = useTranslation();
  let selected = options?.find((item) => item.id == value);
  const [active, setActive] = useState(false);
  const { setCheckoutAddress } = useContext(MainContext);
  return (
    <div
      className={`topNavBarFormItem tobNavbarInterface ${active && "active"}`}
      onClick={() => setActive(!active)}
    >
      <div className="label">{tl(label)}</div>
      <div className="placeholder">
        {selected ? selected.value : tl(placeholder)}
      </div>
      {/* <ArrowDownSLineIcon className="suffix" size={10} /> */}
      <div className="option">
        {options?.map((item, key) => (
          <div key={key} className="option-item" onClick={() => onChange(item)}>
            <div className="status">
              <input
                onChange={() => {}}
                type="radio"
                id="option"
                name={name}
                value={selected?.value}
                checked={selected?.value === item.value}
              />
            </div>
            <label htmlFor="#option" className="label">
              {item.value}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
