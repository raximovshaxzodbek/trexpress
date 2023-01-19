import React, { useEffect, useState } from "react";
import nookies from "nookies";
import LgBanner from "../../../components/banner/banner-lg";
import SmBanner from "../../../components/banner/banner-sm";
import ProductSection from "../../../components/products/section";
import ProductCard from "../../../components/products/card";
import BrandCard from "../../../components/brands/card";
import CustomDrawer from "../../../components/drawer";
import StoreRate from "../../../components/stores/rate";
import DeliveryTime from "../../../components/stores/delivery-time";
import StoreInfo from "../../../components/stores/store-info";
import { BrandApi } from "../../../api/main/brand";
import axiosService from "../../../services/axios";
import { useSelector } from "react-redux";
import Empty from "../../../components/empty-data";
import { images } from "../../../constants/images";
import { ProductApi } from "../../../api/main/product";
import ProductLoader from "../../../components/loader/product";
import HorizontalCard from "../../../components/products/horizontal";
import SEO from "../../../components/seo";
import MegaSale from "../../../components/banner/mega-sale";
import LookCard from "../../../components/looks/card";
import { BannerApi } from "../../../api/main/banner";
import LookBanner from "../../../components/banner/look";

const Store = ({ storeDetail }) => {
  const [open, setOpen] = useState(null);
  const [content, setContent] = useState(null);
  const [brandList, setBrandList] = useState(null);
  const [lookProduct, setLookProduct] = useState(null);
  const [discountList, setDiscountList] = useState(null);
  const [mostSales, setMostSales] = useState(null);
  const [news, setNews] = useState(null);
  const viewedProduct = useSelector(
    (state) => state.viewedProduct.viewedProductList
  );

  const handleContent = (key) => {
    setContent(key);
    setOpen(true);
  };
  const getBrand = (perPage = 6, page = 1) => {
    BrandApi.get({ perPage, page, shop_id: storeDetail.id })
      .then((response) => {
        setBrandList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getBanner = (perPage = 4, page = 1) => {
    BannerApi.get({ perPage, page, shop_id: storeDetail.id, type: "look" })
      .then((response) => {
        setLookProduct(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getDiscountProduct = (perPage = 4, page = 1) => {
    ProductApi.getDiscount({ perPage, page, shop_id: storeDetail.id })
      .then((response) => {
        setDiscountList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getMostSales = (perPage = 4, page = 1) => {
    ProductApi.getMostSales({ perPage, page, shop_id: storeDetail.id })
      .then((response) => {
        setMostSales(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getNews = (perPage = 3, page = 1) => {
    ProductApi.get({
      perPage,
      page,
      shop_id: storeDetail.id,
      sort: "desc",
      column: "created_at",
    })
      .then((response) => {
        setNews(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getBrand();
    getDiscountProduct();
    getMostSales();
    getNews();
    getBanner();
  }, []);
  return (
    <>
      <SEO
        title={storeDetail?.translation?.title}
        description={storeDetail?.translation?.description}
        keywords={storeDetail?.translation?.description}
      />
      <div className="store">
        <LgBanner handleContent={handleContent} data={storeDetail} />
        <SmBanner />
        <ProductSection
          title="New products"
          href={`/stores/${storeDetail.id}/news`}
        >
          {news ? (
            news.map((product, key) => (
              <HorizontalCard key={key} product={product} />
            ))
          ) : (
            <>
              <ProductLoader />
              <ProductLoader />
            </>
          )}
          {news?.length === 0 && (
            <Empty
              image={images.ViewedProduct}
              text1="There are no items in the news products"
            />
          )}
        </ProductSection>
        <MegaSale />
        <ProductSection
          title="Top sales"
          href={`/stores/${storeDetail.id}/top-sales`}
        >
          {mostSales ? (
            mostSales
              .slice(0, 8)
              .map((product, key) => (
                <ProductCard key={key} product={product} />
              ))
          ) : (
            <>
              <ProductLoader />
              <ProductLoader />
            </>
          )}
          {mostSales?.length === 0 && (
            <Empty
              image={images.ViewedProduct}
              text1="There are no items in the viewed products"
              text2="To select items, go to the stores"
            />
          )}
        </ProductSection>
        <ProductSection
          icon={true}
          title="Discount"
          href={`/stores/${storeDetail.id}/sales`}
        >
          {discountList ? (
            discountList.map((product, key) => (
              <ProductCard key={key} product={product} />
            ))
          ) : (
            <>
              <ProductLoader />
              <ProductLoader />
            </>
          )}
          {discountList?.length === 0 && (
            <Empty
              image={images.ViewedProduct}
              text1="There are no items in the sale products"
            />
          )}
        </ProductSection>

        <ProductSection
          title="Lookbooks"
          href={`/stores/${storeDetail.id}/look-product`}
          className="look-product-section"
        >
          <LookBanner />
          {lookProduct?.length > 0 ? (
            lookProduct.map((product, key) => (
              <LookCard key={key} product={product} />
            ))
          ) : (
            <Empty
              image={images.ViewedProduct}
              text1="There are no items in the look products"
              text2="To select items, go to the stores"
            />
          )}
        </ProductSection>
        <ProductSection title="Viewed products" href="/stores/viewed-product">
          {viewedProduct.length > 0 ? (
            viewedProduct
              .slice(0, 4)
              .map((product, key) => (
                <ProductCard key={key} product={product} />
              ))
          ) : (
            <Empty
              image={images.ViewedProduct}
              text1="There are no items in the viewed products"
              text2="To select items, go to the stores"
            />
          )}
        </ProductSection>
        <ProductSection icon={false} title="Brands" href="/stores/all-brand">
          {brandList
            ? brandList.map((brand, key) => {
                return <BrandCard key={key} brand={brand} />;
              })
            : ""}
          {brandList?.length === 0 && (
            <Empty
              image={images.ViewedProduct}
              text1="There are no items in the brand"
            />
          )}
        </ProductSection>
        <CustomDrawer title="Rating store" open={open} setOpen={setOpen}>
          {content === "store-rate" && <StoreRate />}
          {content === "delivery-time" && (
            <DeliveryTime storeDetail={storeDetail} />
          )}
          {content === "store-info" && <StoreInfo />}
        </CustomDrawer>
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
export default Store;
