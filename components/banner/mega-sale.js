import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import { images } from "../../constants/images";
import useWindowSize from "../../utils/hooks/useWindowSize";

const MegaSale = () => {
  const { t: tl } = useTranslation();
  const windowSize = useWindowSize();
  return (
    <>
      {windowSize.width > 412 ? (
        <div className="mega-sale">
          <div className="title">
            {tl("Mega sale")}
            <br /> {tl("for woman shoes")}
          </div>
          <Link href="/stores/discount-product">
            <div className="go-to-sale">{tl("Go to sale")}</div>
          </Link>
          <img src={images.megaSale} />
        </div>
      ) : (
        <div className="mega-sale-mobile">
          <div className="content">
            <div className="title">
              {tl("Mega sale")}
              <br /> {tl("for woman shoes")}
            </div>
            <Link href="/stores/discount-product">
              <div className="go-to-sale">{tl("Go to sale")}</div>
            </Link>
          </div>
          <img src={images.megaSaleMobile} />
        </div>
      )}
    </>
  );
};

export default MegaSale;
