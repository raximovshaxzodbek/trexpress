import React, { useContext, useEffect, useState } from "react";
import nookies from "nookies";
import Empty from "../../components/empty-data";
import ProductCard from "../../components/products/card";
import ProductSection from "../../components/products/section";
import Banner from "../../components/seller/banner";
import { images } from "../../constants/images";
import { ProductApi } from "../../api/main/product";
import ProductLoader from "../../components/loader/product";
import axiosService from "../../services/axios";
import { MainContext } from "../../utils/contexts/MainContext";
import HorizontalCard from "../../components/products/horizontal";
import SEO from "../../components/seo";

const Seller = ({ storeDetail }) => {
  const [productList, setProductList] = useState(null);
  const { layout, brandList } = useContext(MainContext);

  const getProduct = (perPage = 6, page = 1) => {
    ProductApi.get({ perPage, page, shop_id: storeDetail.id })
      .then((response) => {
        setProductList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getProduct();
  }, []);
  console.log(storeDetail);
  return (
    <>
      <SEO
        title={storeDetail?.translation?.title}
        description={storeDetail?.translation?.description}
        keywords={storeDetail?.translation?.description}
      />
      <div className="seller">
        <Banner storeDetail={storeDetail} />
        <ProductSection
          filter={false}
          title={storeDetail?.translation?.title}
          sort={productList?.length > 0 ? true : false}
          brandList={brandList}
          total={productList?.length}
        >
          {productList ? (
            productList?.map((product, key) =>
              layout === "vertical" ? (
                <ProductCard key={key} product={product} />
              ) : (
                <HorizontalCard key={key} product={product} />
              )
            )
          ) : (
            <>
              <ProductLoader />
              <ProductLoader />
              <ProductLoader />
              <ProductLoader />
            </>
          )}
          {productList?.length === 0 && (
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
export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const cookies = nookies.get(ctx);
  const currency_id = cookies?.currency_id;
  const language_id = cookies?.language_id;
  const language_locale = cookies?.language_locale;
  const resStore = await axiosService.get(`/api/v1/rest/shops/${query.id}`, {
    params: {
      perPage: 0,
      page: 1,
      currency_id,
      language_id,
      lang: language_locale,
    },
  });

  let storeDetail = resStore.data.data;
  return { props: { storeDetail } };
}
export default Seller;
