import React, { useContext, useState } from "react";
import nookies from "nookies";
import BrandBanner from "../../../components/brands/banner";
import ProductCard from "../../../components/products/card";
import HorizontalCard from "../../../components/products/horizontal";
import ProductSection from "../../../components/products/section";
import { MainContext } from "../../../utils/contexts/MainContext";
import axiosService from "../../../services/axios";
import { ProductApi } from "../../../api/main/product";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import SEO from "../../../components/seo";

const BrandDetail = ({ setLoader, brand, products }) => {
  const { t: tl } = useTranslation();
  const { layout } = useContext(MainContext);
  const router = useRouter();
  const [productList, setProductList] = useState(products.data);
  const [page, setPage] = useState(2);
  const [total, setTotal] = useState(products.meta.total);

  const getProduct = (perPage = 4, page = 1) => {
    ProductApi.get({ perPage, page, brand_id: router.query.id })
      .then((response) => {
        setTotal(response.meta.total);
        setProductList([...productList, ...response.data]);
        setLoader(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handlePaginate = () => {
    setLoader(true);
    getProduct(4, page);
    setPage(page + 1);
  };
  console.log(brand);
  return (
    <>
      <SEO title={brand?.data?.title} image={brand?.data?.img} />
      <div className="brand-detail">
        <BrandBanner brand={brand} />
        <ProductSection
          total={products.meta.total}
          title="BRand - laCOste"
          sort={true}
        >
          {layout === "vertical" &&
            productList.map((product, key) => {
              return <ProductCard key={key} product={product} />;
            })}
          {layout === "horizontal" &&
            productList.map((product, key) => {
              return <HorizontalCard key={key} product={product} />;
            })}
        </ProductSection>
        {total / 4 >= page && (
          <div onClick={() => handlePaginate(page)} className="see-more">
            {tl("Load more")}
          </div>
        )}
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
  const brandRes = await axiosService.get(`/api/v1/rest/brands/${query.id}`, {
    params: { language_id, lang: language_locale },
  });
  const productRes = await axiosService.get(`/api/v1/rest/products/paginate`, {
    params: {
      perPage: 4,
      brand_id: query.id,
      currency_id,
      language_id,
      lang: language_locale,
    },
  });
  const brand = await brandRes.data;
  const products = await productRes.data;
  return { props: { brand, products } };
}
export default BrandDetail;
