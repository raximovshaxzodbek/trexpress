import React, { useState } from "react";
import Accordion from "../../accordion";
import AccordionDetails from "../../accordion/accordion-details";
import AccordionSummary from "../../accordion/accordion-summary";
import ByCategory from "./by-category";
import ByBrand from "./by-brand";
import ByPrice from "./by-price";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import QueryString from "qs";
import { useTranslation } from "react-i18next";
const VerticalFilter = ({ className, brandList }) => {
  const { t: tl } = useTranslation();
  const router = useRouter();
  const [idList, setIdList] = useState(["category", "size", "color", "brand"]);
  const category = useSelector((state) => state.category.categoryList);
  const routeHref = router.route.split("/");

  const handleClick = (key) => {
    const includes = idList.includes(key);
    if (includes) {
      setIdList(idList.filter((item) => item !== key));
    } else {
      setIdList([...idList, key]);
    }
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
  return (
    <div className={`filter-vertical ${className}`}>
      <Accordion idList={idList} id="category">
        <AccordionSummary
          handleClick={handleClick}
          idList={idList}
          id="category"
        >
          {tl("Categories")}
        </AccordionSummary>
        <AccordionDetails>
          <ByCategory handleFilter={handleFilter} category={category} />
        </AccordionDetails>
      </Accordion>
      <Accordion idList={idList} id="brand">
        <AccordionSummary handleClick={handleClick} idList={idList} id="brand">
          {tl("Brand")}
        </AccordionSummary>
        <AccordionDetails>
          <ByBrand handleFilter={handleFilter} brandList={brandList} />
        </AccordionDetails>
      </Accordion>
      <ByPrice handleFilter={handleFilter} />
    </div>
  );
};

export default VerticalFilter;
