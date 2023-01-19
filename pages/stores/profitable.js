import React, { useContext, useState } from "react";
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

const DiscountProduct = ({ discountProduct, setLoader }) => {
  const { t: tl } = useTranslation();
  const { layout } = useContext(MainContext);
  const [discountList, setDiscountList] = useState(discountProduct.data);
  const [page, setPage] = useState(2);
  const [total, setTotal] = useState(discountProduct.meta?.total);

  const getDiscountProduct = (perPage = 12, page = 1) => {
    ProductApi.getDiscount({ perPage, page, profitable: true })
      .then((response) => {
        setTotal(response.meta.total);
        setDiscountList([...discountList, ...response.data]);
        setLoader(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handlePaginate = () => {
    setLoader(true);
    getDiscountProduct(12, page);
    setPage(page + 1);
  };

  return (
    <>
      <SEO />
      <div className="discount-product">
        <ProductSection title="Profitable today">
          {discountList &&
            discountList.map((product, key) => {
              return layout === "vertical" ? (
                <ProductCard key={key} product={product} />
              ) : (
                <HorizontalCard key={key} product={product} />
              );
            })}
          {discountList?.length === 0 && (
            <Empty
              image={images.ViewedProduct}
              text1="There are no items in the sale products"
            />
          )}
        </ProductSection>
        {total > discountList?.length && (
          <div onClick={() => handlePaginate(page)} className="see-more">
            {tl("Load more")}
          </div>
        )}
      </div>
    </>
  );
};
export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  const currency_id = cookies?.currency_id;
  const language_locale = cookies?.language_locale;
  const resProduct = await axiosService.get(`/api/v1/rest/products/discount`, {
    params: {
      perPage: 12,
      page: 1,
      currency_id,
      lang: language_locale,
      profitable: true,
    },
  });

  let discountProduct = resProduct.data;
  return { props: { discountProduct } };
}
export default DiscountProduct;
