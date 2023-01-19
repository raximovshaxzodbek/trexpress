import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { imgBaseUrl } from "../../constants";

const CategoryByChild = () => {
  const { t: tl } = useTranslation();
  const categoryList = useSelector((state) => state.category.categoryList);
  return (
    <div className="category-by-child">
      {categoryList
        ?.filter((item) => item.children.length)
        ?.slice(0, 4)
        ?.map((category, key) => (
          <div key={key} className="category-by-child-item">
            <div className="section-header">
              <div className="title">{category?.translation?.title}</div>
              <Link href={`/all-product?category_id=${category.id}`}>
                <a className="see-all">{tl("See all")}</a>
              </Link>
            </div>
            <div className="section-content">
              {category?.children
                ?.slice(0, key == 0 ? 2 : key == 1 ? 6 : 4)
                .map((item) => (
                  <Link
                    key={item.id}
                    href={`/all-product?category_id=${item.id}`}
                  >
                    <div className="category-item">
                      <div className="img">
                        <img src={imgBaseUrl + item?.img} />
                      </div>
                      <div className="title">{item.translation?.title}</div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default CategoryByChild;
