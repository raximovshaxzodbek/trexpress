import React, { useContext, useEffect, useState } from "react";
import nookies from "nookies";
import { ProductApi } from "../../api/main/product";
import Empty from "../../components/empty-data";
import ProductCard from "../../components/products/card";
import HorizontalCard from "../../components/products/horizontal";
import ProductSection from "../../components/products/section";
import { MainContext } from "../../utils/contexts/MainContext";
import { useTranslation } from "react-i18next";
import axiosService from "../../services/axios";
import { images } from "../../constants/images";
import SEO from "../../components/seo";

const AllProduct = ({ Product, setLoader, query }) => {
  const { t: tl } = useTranslation();
  const { layout, brandList, getBrand } = useContext(MainContext);
  const [List, setList] = useState(Product.data);
  const [page, setPage] = useState(2);
  const [total, setTotal] = useState(Product.meta?.total);

  useEffect(() => {
    setList(Product.data);
    if (!brandList) getBrand();
  }, [query.id, Product.data]);

  const getProduct = (perPage = 12, page = 1) => {
    ProductApi.get({ perPage, page, category_id: query?.category_id })
      .then((response) => {
        setTotal(response.meta.total);
        setList([...List, ...response.data]);
        setLoader(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handlePaginate = () => {
    setLoader(true);
    getProduct(12, page);
    setPage(page + 1);
  };
  return (
    <>
      <SEO />
      <div className="discount-product">
        <ProductSection
          icon={false}
          title="All Product"
          sort={true}
          total={List?.length}
          filter={true}
          brandList={brandList}
        >
          {List &&
            List.map((product, key) => {
              return layout === "vertical" ? (
                <ProductCard key={key} product={product} />
              ) : (
                <HorizontalCard key={key} product={product} />
              );
            })}
          {List?.length === 0 && (
            <Empty
              image={images.ViewedProduct}
              text1="There are no items in the sale products"
            />
          )}
        </ProductSection>
        {total > List?.length && (
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
  const resProduct = await axiosService.get(`/api/v1/rest/products/paginate`, {
    params: {
      perPage: 12,
      page: 1,
      brand_id: query?.brand_id,
      category_id: query?.category_id,
      price_to: query?.price_to,
      price_from: query?.price_from,
      sort: query?.sort,
      column_price: query?.column_price,
      currency_id,
      language_id,
      lang: language_locale,
    },
  });

  let Product = resProduct.data;
  return { props: { Product, query } };
}
export default AllProduct;
