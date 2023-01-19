import Link from "next/link";
import React, { useContext, useState } from "react";
import { DiscountIcon } from "../../constants/images";
import Filter3LineIcon from "remixicon-react/Filter3LineIcon";
import PauseFillIcon from "remixicon-react/PauseFillIcon";
import VerticalFilter from "../search-filter/vertical";
import CustomDrawer from "../drawer";
import { MainContext } from "../../utils/contexts/MainContext";
import { useTranslation } from "react-i18next";
import { Select } from "antd";

const ProductSection = ({
  children,
  title = "",
  href = null,
  icon,
  sort = false,
  filter = false,
  total = 0,
  brandList,
  className = "",
}) => {
  const { t: tl } = useTranslation();
  const [open, setOpen] = useState(null);
  const { layout, setLayout, setDrawerTitle } = useContext(MainContext);

  const click = () => {
    setOpen(true);
    setDrawerTitle("Filter");
  };

  return (
    <div className="product-section">
      <div className="section-header">
        <div className="title">
          {icon && (
            <div className="icon">
              <DiscountIcon />
            </div>
          )}
          {tl(title)}
        </div>
        {href && (
          <Link href={href}>
            <a className="see-all">{tl("See all")}</a>
          </Link>
        )}
      </div>
      <div className={`section-content-wrapper ${className}`}>
        {filter && <VerticalFilter brandList={brandList} />}
        <div className="container-full">
          {sort && (
            <div className="sort-header">
              <div className="total-count">{`${total} ${tl("products")}`}</div>
              <div className="sort-box">
                <div className="filter-mobile" onClick={click}>
                  <Filter3LineIcon size={16} />
                  <span>{tl("Filter")}</span>
                </div>
                {/* <div className="layout-type">
                  <span
                    onClick={() => setLayout("vertical")}
                    className={layout === "vertical" && "active"}
                  >
                    <PauseFillIcon />
                  </span>
                  <span
                    onClick={() => setLayout("horizontal")}
                    className={
                      layout === "horizontal"
                        ? "horizontal active"
                        : "horizontal"
                    }
                  >
                    <PauseFillIcon />
                  </span>
                </div> */}
                <div className="all-products-sort">
                  <Select
                    defaultValue={"Sort by"}
                    options={[
                      {
                        value: "described",
                        label: "Described",
                      },
                      {
                        value: "lowerPrice",
                        label: "Lower price",
                      },
                      {
                        value: "The highest price",
                        label: "The highest price",
                      },
                      {
                        value: "The newest",
                        label: "The newest",
                      },
                      {
                        value: "Most sold",
                        label: "Most sold",
                      },
                      {
                        value: "Highest rated",
                        label: "Highest rated",
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          )}
          <div className="section-content">{children}</div>
        </div>
      </div>
      <CustomDrawer header={true} open={open} setOpen={setOpen}>
        <VerticalFilter brandList={brandList} className="mobile-filter" />
      </CustomDrawer>
    </div>
  );
};

export default ProductSection;
