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
    currency,
    language,
    checkProduct,
    checkViewedProduct,
    getNotification,
    handleLanguae,
  } = useContext(MainContext);

  const handleContent = (key) => {
    setContent(key);
    setOpen(true);
  };

  useEffect(() => {
    if (!content) setOpen(false);
  }, []);
  return (
    <>
      <div className="topNavbar">
        {/* <CustomSelect /> */}
        <select></select>
        <button onClick={() => setTheme("light")}>light</button>
        <button onClick={() => setLanguage()}>change lang</button>
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
