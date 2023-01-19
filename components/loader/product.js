import React from "react";
import ContentLoader from "react-content-loader";

const ProductLoader = (props) => (
  <ContentLoader
    width={320}
    height={450}
    viewBox="0 0 320 450"
    backgroundColor="#f0f0f0"
    foregroundColor="#dedede"
    {...props}
  >
    <rect x="43" y="400" rx="4" ry="4" width="271" height="9" />
    <rect x="44" y="420" rx="3" ry="3" width="119" height="6" />
    <rect x="42" y="77" rx="10" ry="10" width="270" height="310" />
  </ContentLoader>
);

export default ProductLoader;
