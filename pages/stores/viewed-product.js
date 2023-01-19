import React from "react";
import ProductCard from "../../components/products/card";
import ProductSection from "../../components/products/section";
import { useSelector } from "react-redux";
import Empty from "../../components/empty-data";
import { images } from "../../constants/images";
import SEO from "../../components/seo";

const ViewedProduct = () => {
  const viewedProduct = useSelector(
    (state) => state.viewedProduct.viewedProductList
  );
  return (
    <>
      <SEO />
      <div className="viewed-product">
        <ProductSection filter={false} title="Viewed products">
          {viewedProduct.length > 0 ? (
            viewedProduct.map((product, key) => (
              <ProductCard key={key} product={product} />
            ))
          ) : (
            <Empty
              image={images.ViewedProduct}
              text1="There are no items in the liked products"
              text2="To select items, go to the product"
            />
          )}
        </ProductSection>
      </div>
    </>
  );
};

export default ViewedProduct;
