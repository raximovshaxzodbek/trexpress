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
const VerticalFilter = ({ className, brandList, handleFilter }) => {
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
