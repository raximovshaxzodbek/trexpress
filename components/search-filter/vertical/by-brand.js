import React, { useState } from "react";
import CheckboxBlankLineIcon from "remixicon-react/CheckboxBlankLineIcon";
import CheckboxFillIcon from "remixicon-react/CheckboxFillIcon";
import { useRouter } from "next/router";
import CategoryLoader from "../../loader/category";
import { useTranslation } from "react-i18next";
const ByBrand = ({ brandList, handleFilter }) => {
  const { t: tl } = useTranslation();
  const router = useRouter();
  const brand_id = router?.query?.brand_id;
  const [count, setCount] = useState(10);
  const loadMore = () => {
    setCount((prev) => prev + 10);
  };
  return (
    <>
      {!brandList?.length ? (
        <CategoryLoader />
      ) : (
        <div className="by-brand">
          {brandList?.slice(0, count)?.map((item) => {
            return (
              <div
                key={item.uuid}
                className="item"
                onClick={() => handleFilter({ brand_id: item.id })}
              >
                <div className="name">
                  {brand_id == item.id ? (
                    <CheckboxFillIcon />
                  ) : (
                    <CheckboxBlankLineIcon />
                  )}
                  <span>{item.title}</span>
                </div>
              </div>
            );
          })}
          {brandList?.length > 10 && (
            <div className="load-more" onClick={loadMore}>
              {tl("Load more")}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ByBrand;
