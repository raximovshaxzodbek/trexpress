import React from "react";
import { useTranslation } from "react-i18next";
import { images } from "../../constants/images";

const AppBanner = () => {
  const { t: tl } = useTranslation();
  return (
    <div className="app-banner">
      <div className="app-banner-laptop">
        <img src={images.AppBanner} alt="app-banner" />
      </div>
      <div className="app-banner-mobile">
        <img src={images.MobileApp} alt="app-banner" />
      </div>
      <div className="banner-content">
        <div className="title">
          {tl("Download")} <br />
          {tl("goshops mobile app")}
        </div>
        <div className="description">{tl("app.banner.description")}</div>
        <div className="play-store">
          <img className="app-store" src={images.AppStore} alt="app store" />
          <img
            className="google-play"
            src={images.GooglePlay}
            alt="google play"
          />
        </div>
      </div>
    </div>
  );
};

export default AppBanner;
