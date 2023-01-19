import React from "react";
import { useTranslation } from "react-i18next";
import { images } from "../../constants/images";
import Empty from "../empty-data";
import ProductCard from "../products/card";
import ProductSection from "../products/section";

const SerachResult = ({
  isSearching,
  searchResult,
  setSearchTerm,
  setIsOpen,
}) => {
  const { t: tl } = useTranslation();
  const suggestionList = searchResult?.data?.map(
    (item) => item.translation.title
  );
  return (
    <div className="search-result-wrapper">
      {isSearching ? (
        `${tl("searching")}...`
      ) : !searchResult?.data?.length ? (
        <Empty image={images.SearchEmpty} text1="No search results" />
      ) : (
        <>
          <div className="product-box">
            <ProductSection title="Products">
              {searchResult?.data?.map((product, key) => (
                <ProductCard
                  setIsOpen={setIsOpen}
                  key={key}
                  product={product}
                />
              ))}
            </ProductSection>
          </div>
          <div className="suggestion">
            <div className="title">{tl("Suggestions")}</div>
            <div className="suggestion-item">
              <ul>
                {suggestionList?.map((suggestion, key) => {
                  return (
                    <li key={key} onClick={() => setSearchTerm(suggestion)}>
                      {suggestion}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SerachResult;
