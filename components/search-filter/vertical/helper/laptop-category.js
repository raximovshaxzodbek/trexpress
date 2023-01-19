import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { MainContext } from "../../../../utils/contexts/MainContext";
import ArrowRightSLineIcon from "remixicon-react/ArrowRightSLineIcon";
const LaptopCategory = () => {
  const router = useRouter();
  const [currentId, setCurrentId] = useState(0);
  const category = useSelector((state) => state.category.categoryList);
  const { setIsOpenDropdown } = useContext(MainContext);

  const handleHover = (id) => {
    setCurrentId(id);
  };
  const handleLink = (id) => {
    setIsOpenDropdown(false);
    router.push(`/all-product?category_id=${id}`);
  };
  return (
    <>
      <div className="parent-category">
        <ul>
          {category?.map((item, key) => {
            return (
              <li
                className={`${key === currentId && "active"}`}
                onMouseOver={() => handleHover(key)}
              >
                <label>{item?.translation?.title}</label>
                <ArrowRightSLineIcon size={20} />
              </li>
            );
          })}
        </ul>
      </div>
      <div className="child-category">
        <div className="title">{category[currentId]?.translation?.title}</div>
        <div className="category-items">
          {category[currentId]?.children.map((item) => {
            if (item?.children?.length) {
              return (
                <div className="item">
                  <div
                    className="item-title"
                    onClick={() => handleLink(item.id)}
                  >
                    {item?.translation?.title}
                  </div>
                  <ul>
                    {item?.children?.map((item) => {
                      return (
                        <li onClick={() => handleLink(item.id)}>
                          {item?.translation?.title}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            } else {
              return (
                <div className="item single">
                  <ul>
                    <li onClick={() => handleLink(item.id)}>
                      {item?.translation?.title}
                    </li>
                  </ul>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default LaptopCategory;
