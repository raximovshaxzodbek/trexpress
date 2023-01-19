import React, { useContext, useEffect, useState } from "react";
import nookies from "nookies";
import Empty from "../../components/empty-data";
import ProductCard from "../../components/products/card";
import ProductSection from "../../components/products/section";
import { images } from "../../constants/images";
import ProductLoader from "../../components/loader/product";
import axiosService from "../../services/axios";
import BannerDetail from "../../components/banner/detail";
import { MainContext } from "../../utils/contexts/MainContext";
import HorizontalCard from "../../components/products/horizontal";
import SEO from "../../components/seo";
const Seller = ({ bannerDetail }) => {
  const [productList, setProductList] = useState(null);
  const { layout } = useContext(MainContext);

  const getProduct = () => {
    axiosService
      .get(`/api/v1/rest/banners/${bannerDetail.id}/products`)
      .then((response) => {
        setProductList(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <SEO />
      <div className="seller">
        <BannerDetail img={bannerDetail.img} />
        <ProductSection
          filter={false}
          title="Banner detail"
          sort={productList?.length > 0 ? true : false}
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
  const cookies = nookies.get(ctx);
  const language_id = cookies?.language_id;
  const language_locale = cookies?.language_locale;
  const { query } = ctx;
  const resStore = await axiosService.get(`/api/v1/rest/banners/${query.id}`, {
    params: {
      perPage: 3,
      page: 1,
      shop_id: query.id,
      brand_id: query?.brand_id,
      category_id: query?.category_id,
      price_to: query?.price_to,
      price_from: query?.price_from,
      sort: query?.sort,
      column_price: query?.column_price,
      language_id,
      lang: language_locale,
    },
  });
  let bannerDetail = resStore.data.data;
  return { props: { bannerDetail } };
}
export default Seller;
