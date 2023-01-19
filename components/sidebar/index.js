import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

import { parseCookies } from "nookies";
const Sidebar = ({ setOpen }) => {
  const { t: tl } = useTranslation();
  const cookie = parseCookies();
  const handleClick = () => {
    setOpen(false);
  };
  return (
    <div className="sidebar">
      <div className="close-btn" onClick={handleClick}></div>
      <div className="sider-links">
        {cookie?.access_token && (
          <Link href="/order-history">
            <a onClick={handleClick} className="link">
              {tl("Order history")}
            </a>
          </Link>
        )}
        <Link href="/stores/discount-product">
          <a onClick={handleClick} className="link">
            {tl("Discount")}
          </a>
        </Link>
        <Link href="/stores/viewed-product">
          <a onClick={handleClick} className="link">
            {tl("Viwed Products")}
          </a>
        </Link>
        {cookie?.access_token && (
          <Link href="/wallet-history">
            <a onClick={handleClick} className="link">
              {tl("Wallet history")}
            </a>
          </Link>
        )}
        <Link href="/blog">
          <a onClick={handleClick} className="link">
            {tl("Blog")}
          </a>
        </Link>
        <Link href="/settings">
          <a onClick={handleClick} className="link">
            {tl("Settings")}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
