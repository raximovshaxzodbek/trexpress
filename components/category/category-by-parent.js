import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { imgBaseUrl } from "../../constants";

const CategoryByParent = () => {
  const categoryList = useSelector((state) => state.category.categoryList);
  return (
    <div className="category-by-parent">
      {categoryList?.slice(4, 10)?.map((category) => (
        <Link
          key={category?.uuid}
          href={`/all-product?category_id=${category.id}`}
        >
          <div className="category-by-parent-item">
            <div className="category-item">
              <div className="img">
                <img src={imgBaseUrl + category?.img} />
              </div>
              <div className="title">{category.translation?.title}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryByParent;
