import React from "react";
import ProductCard from "../../components/products/card";
import ProductSection from "../../components/products/section";
import { useSelector } from "react-redux";
import Empty from "../../components/empty-data";
import { images } from "../../constants/images";
import SEO from "../../components/seo";
const LikedProduct = () => {
  const savedProduct = useSelector(
    (state) => state.savedProduct.savedProductList
  );
  return (
    <>
      <SEO />
      <div className="liked-product">
        <ProductSection filter={false} title="Liked product" sort={false}>
          {savedProduct.length > 0 ? (
            savedProduct.map((product, key) => (
              <ProductCard key={key} product={product} />
            ))
          ) : (
            <Empty
              image={images.Heart}
              text1="There are no items in the liked products"
              text2="To select items, go to the product"
            />
          )}
        </ProductSection>
      </div>
    </>
  );
};

export default LikedProduct;
