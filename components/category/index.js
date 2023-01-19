import React from "react";
import { useContext } from "react";
import { MainContext } from "../../utils/contexts/MainContext";
import OutsideAlerter from "../../utils/hooks/useClickOutside";
import useWindowSize from "../../utils/hooks/useWindowSize";
import LaptopCategory from "../search-filter/vertical/helper/laptop-category";
import MobileCategory from "../search-filter/vertical/helper/mobile-category";
import LayoutGridLineIcon from "remixicon-react/LayoutGridLineIcon";
import { useTranslation } from "react-i18next";
const Category = () => {
  const { t: tl } = useTranslation();
  const windowSize = useWindowSize();
  const { isOpenDropdown, setIsOpenDropdown } = useContext(MainContext);
  return (
    <div className="category-wrapper">
      <button onClick={() => setIsOpenDropdown(true)}>
        <LayoutGridLineIcon size={20} />
        {tl("All")}
      </button>
      <OutsideAlerter>
        <div
          className={`category-content-wrapper ${
            isOpenDropdown ? "visible" : ""
          }`}
        >
          {windowSize?.width > 540 ? <LaptopCategory /> : <MobileCategory />}
        </div>
      </OutsideAlerter>
    </div>
  );
};

export default Category;
