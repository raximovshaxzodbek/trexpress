import { useRouter } from "next/router";
import React, { useState } from "react";
import Accordion from "../../../components/accordion";
import AccordionDetails from "../../../components/accordion/accordion-details";
import AccordionSummary from "../../../components/accordion/accordion-summary";
import CategoryLoader from "../../loader/category";
const ByCategory = ({ category, handleFilter }) => {
  const router = useRouter();
  const [idList, setIdList] = useState([]);
  const [subIdList, setSubIdList] = useState([]);
  const currentCategory = category.flatMap((item) => item.children);
  const x = currentCategory.find((item) => item.id == router.query.category_id);
  const px = currentCategory.find(
    (item) => item.parent_id == router.query.category_id
  );
  const y = {};
  const a = {};
  if (x || px) {
    if (x) {
      y = category.find((item) => item.id == x?.parent_id);
    } else {
      y = category.find((item) => item.id == px?.parent_id);
    }
  } else {
    const nextCategory = currentCategory.flatMap((item) => item.children);
    a = nextCategory.find((item) => item?.id == router.query.category_id);
    y = currentCategory.find((item) => item.id == a?.parent_id);
  }
  const handleClick = (key) => {
    const includes = idList.includes(key);
    if (includes) {
      setIdList(idList.filter((item) => item !== key));
    } else {
      setIdList([...idList, key]);
    }
  };
  const handleSubClick = (key) => {
    const includes = subIdList.includes(key);
    if (includes) {
      setSubIdList(subIdList.filter((item) => item !== key));
    } else {
      setSubIdList([...subIdList, key]);
    }
  };
  return (
    <>
      {category.length === 0 ? (
        <CategoryLoader />
      ) : (
        <div className="by-category">
          <Accordion idList={idList}>
            <AccordionSummary
              handleFilter={handleFilter}
              handleClick={handleClick}
              idList={idList}
              y={y}
            >
              {y?.translation?.title}
            </AccordionSummary>
            <AccordionDetails>
              {y?.children?.map((child, key) => {
                if (child?.children?.length) {
                  return (
                    <Accordion idList={subIdList}>
                      <AccordionSummary
                        handleFilter={handleFilter}
                        handleClick={handleSubClick}
                        idList={subIdList}
                        y={child}
                      >
                        {child?.translation?.title}
                      </AccordionSummary>
                      <AccordionDetails>
                        {child?.children?.map((child, key) => {
                          return (
                            <div
                              key={key}
                              className={
                                router?.query?.category_id == child.id
                                  ? "item selected"
                                  : "item"
                              }
                              onClick={() =>
                                handleFilter({ category_id: child.id })
                              }
                            >
                              {child.translation?.title}
                            </div>
                          );
                        })}
                      </AccordionDetails>
                    </Accordion>
                  );
                } else
                  return (
                    <div
                      key={key}
                      className={
                        router?.query?.category_id == child.id
                          ? "item selected"
                          : "item"
                      }
                      onClick={() => handleFilter({ category_id: child.id })}
                    >
                      {child.translation?.title}
                    </div>
                  );
              })}
            </AccordionDetails>
          </Accordion>
        </div>
      )}
    </>
  );
};

export default ByCategory;
