import React from "react";
import SelectAddress from "../form/select-address";
import Wallet3LineIcon from "remixicon-react/Wallet3LineIcon";
import AddCircleFillIcon from "remixicon-react/AddCircleFillIcon";
import QrScanLineIcon from "remixicon-react/QrScanLineIcon";
import Notification4LineIcon from "remixicon-react/Notification4LineIcon";
import ArrowRightSLineIcon from "remixicon-react/ArrowRightSLineIcon";
import Bookmark3LineIcon from "remixicon-react/Bookmark3LineIcon";
import Heart3LineIcon from "remixicon-react/Heart3LineIcon";
import PercentLineIcon from "remixicon-react/PercentLineIcon";
import EyeLineIcon from "remixicon-react/EyeLineIcon";
import Wallet2LineIcon from "remixicon-react/Wallet2LineIcon";
import ImageLineIcon from "remixicon-react/ImageLineIcon";
import UserSettingsLineIcon from "remixicon-react/UserSettingsLineIcon";
import FileListLineIcon from "remixicon-react/FileListLineIcon";
import CustomerService2LineIcon from "remixicon-react/CustomerService2LineIcon";
import LoginCircleLineIcon from "remixicon-react/LoginCircleLineIcon";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../redux/slices/user";
import { clearCart, clearOrderShops } from "../../redux/slices/cart";
import { clearOrder } from "../../redux/slices/order";
import { clearSavedStore } from "../../redux/slices/savedStore";
import { clearAddress } from "../../redux/slices/savedAddress";
import { clearList } from "../../redux/slices/savedProduct";
import { clearViewedList } from "../../redux/slices/viewed-product";
import { imgBaseUrl } from "../../constants";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { getPrice } from "../../utils/getPrice";
import StoreLineIcon from "remixicon-react/StoreLineIcon";
import LinksLineIcon from "remixicon-react/LinksLineIcon";
import { useRouter } from "next/router";
import { useContext } from "react";
import { MainContext } from "../../utils/contexts/MainContext";

const MobileNav = ({ setOpen }) => {
  const { t: tl } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const { setAddress } = useContext(MainContext);
  const user = useSelector((state) => state.user.data);
  const isEmpty = Object.keys(user).length === 0;
  const logOut = () => {
    dispatch(clearUser());
    dispatch(clearCart());
    dispatch(clearOrderShops());
    dispatch(clearOrder());
    dispatch(clearSavedStore());
    dispatch(clearAddress());
    dispatch(clearList());
    dispatch(clearViewedList());
    setAddress([]);
    document.cookie =
      "access_token" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie =
      "userLocation" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push("/");
  };
  const routes = [
    {
      icon: <Notification4LineIcon size={22} />,
      href: "/notification",
      label: "Notification",
      show: true,
    },
    {
      icon: <Bookmark3LineIcon size={22} />,
      href: "/saved-store",
      label: "Saved stores",
      show: true,
    },
    {
      icon: <Heart3LineIcon size={22} />,
      href: "/stores/liked-product",
      label: "Liked products",
      show: true,
    },
    {
      icon: <PercentLineIcon size={22} />,
      href: "/stores/discount-product",
      label: "Discount",
      show: true,
    },
    {
      icon: <EyeLineIcon size={22} />,
      href: "/stores/viewed-product",
      label: "Viewed products",
      show: true,
    },
    {
      icon: <Wallet2LineIcon size={22} />,
      href: "/wallet-history",
      label: "Wallet history",
      show: Object.keys(user).length,
    },
    {
      icon: <ImageLineIcon size={22} />,
      href: "/blog",
      label: "Blog",
      show: true,
    },
    {
      icon: <UserSettingsLineIcon size={22} />,
      href: "/settings",
      label: "Profile settings",
      show: true,
    },
    {
      icon: <FileListLineIcon size={22} />,
      href: "/order-history",
      label: "Order history",
      show: Object.keys(user).length,
    },
    {
      icon: <StoreLineIcon />,
      label: "Be seller",
      href: "/be-seller",
      show: true,
    },
    {
      icon: <LinksLineIcon />,
      label: "Your invite",
      show: true,
      href: "/invite",
    },
    {
      icon: <LoginCircleLineIcon size={22} />,
      href: "/",
      label: "Log out",
      show: Object.keys(user).length,
    },
  ];

  const handleCLick = (href) => {
    setOpen(false);
    if (href === "/") logOut();
  };
  return (
    <div className="navbar-mobile">
      <div className="navbar">
        <div className="left">
          <div className="burger-btn" onClick={() => setOpen(false)}>
            <span></span>
          </div>
        </div>
        <div className="right">
          {user?.wallet && (
            <div className="wallet">
              <Wallet3LineIcon size={20} />
              <div className="amount">{getPrice(user?.wallet?.price)}</div>
              {/* <QrScanLineIcon
                size={20}
                color="#57B8EE"
                onClick={() => handleContent("transfer-wallet")}
              />
              <AddCircleFillIcon
                color="#61DC00"
                size={24}
                onClick={() => handleContent("add-wallet")}
              /> */}
            </div>
          )}
          {!isEmpty &&
            (user.img ? (
              <div className="user">
                <img
                  className="avatar"
                  src={imgBaseUrl + user.img}
                  alt="Avatar"
                />
              </div>
            ) : (
              <div className="square avatar">{user.firstname?.slice(0, 1)}</div>
            ))}
        </div>
      </div>
      <div className="mobile-select-address">
        <SelectAddress setOpen={setOpen} />
      </div>
      <div className="nav-links">
        {routes
          .filter((item) => item.show)
          .map((route, key) => {
            return (
              <Link key={key} href={route.href}>
                <a className="link" onClick={() => handleCLick(route.href)}>
                  {route.icon}
                  <span>{tl(route.label)}</span>
                  <ArrowRightSLineIcon size={22} className="suffix" />
                </a>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default MobileNav;
