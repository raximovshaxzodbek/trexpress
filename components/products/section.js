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

  const handleFilter = ({ brand_id, category_id, range = [], sort }) => {
    const id = router.query.id;
    const prevBrandId = router.query.brand_id;
    const prevCategoryId = router.query.category_id;
    const prevFrom = router.query.price_from;
    const prevTo = router.query.price_to;
    const prevSort = router.query.sort;
    const str = QueryString.stringify({
      brand_id:
        brand_id == prevBrandId ? undefined : brand_id ? brand_id : prevBrandId,
      category_id: category_id ? category_id : prevCategoryId,
      price_from: range[0] ? range[0] : prevFrom,
      price_to: range[1] ? range[1] : prevTo,
      sort: sort ? sort : prevSort,
      column_price: sort || prevSort ? "price" : undefined,
    });
    if (router.pathname === "/all-product") {
      router.push(`/${routeHref[routeHref.length - 1]}?${str}`);
    } else if (!id) {
      router.push(`/stores/${routeHref[routeHref.length - 1]}?${str}`);
    } else {
      router.push(`/stores/${id}/${routeHref[routeHref.length - 1]}?${str}`);
    }
  };

  const handleByPrice = (value) => {
    setSort(value);
    handleFilter({ sort: value });
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
        {filter && (
          <VerticalFilter handleFilter={handleFilter} brandList={brandList} />
        )}
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
                  {/* <Select
                    defaultValue={"Sort by"}
                    options={[
                      {
                        value: "described",
                        label: "Described",
                      },
                      {
                        value: "lowerPrice",

                        label: (
                          <button
                            onSelect={() => {
                              handleByPrice("asc");
                              alert("work");
                            }}
                          >
                            "Lower price"
                          </button>
                        ),
                      },
                      {
                        value: "The highest price",
                        label: "The highest price",
                      },
                      {
                        value: "The newest",
                        label: "The newest",
                      },
                      // {
                      //   value: "Most sold",
                      //   label: "Most sold",
                      // },
                      {
                        value: "Highest rated",
                        label: "Highest rated",
                      },
                      // {
                      //   value: "",
                      //   label: (
                      //     <Link
                      //       href={{
                      //         pathname: `/all-product`,
                      //         query: {
                      //           category_id: el.id,
                      //         },
                      //       }}
                      //       key={index}
                      //     >
                      //       label to link high rated e.g.
                      //     </Link>
                      //   ),
                      // },
                    ]}
                  /> */}
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
