import { useContext, useEffect, useState } from "react";
import HomeBanner from "../components/banner/home";
import AppBanner from "../components/stores/app-banner";
import { useDispatch, useSelector } from "react-redux";
import { getBanners } from "../redux/slices/banner";
import { images } from "../constants/images";
import Empty from "../components/empty-data";
import SEO from "../components/seo";
import LoginCircleLineIcon from "remixicon-react/LoginCircleLineIcon";
import MegaSale from "../components/banner/mega-sale";
import { ProductApi } from "../api/main/product";
import ProductSection from "../components/products/section";
import ProductCard from "../components/products/card";
import ServiceBanner from "../components/banner/service";
import CategoryByChild from "../components/category/category-by-child";
import CategoryByParent from "../components/category/category-by-parent";
import BeSeller from "../components/banner/be-seller";
import Blog from "../components/blog";
import { BrandList } from "../components/navbar/BrandList";
import { Col, Row } from "antd";
import StoreLoader from "../components/loader/store";
import { LoaderStore } from "../components/LoaderStore/LoaderStore";
import ProductLoader from "../components/loader/product";
import SkeletonInput from "../components/skelton/Skeleton-Input";
import axios from "axios";
function Home() {
  const [discountList, setDiscountList] = useState(null);
  const [mostSales, setMostSales] = useState(null);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.banners.data.data);
  const bannerList = data ? [...data] : [];
  bannerList && bannerList?.length > 0 && bannerList?.shift();
  const getDiscountProduct = (perPage = 4, page = 1) => {
    ProductApi.getDiscount({ perPage, page })
      .then((response) => {
        setDiscountList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getMostSales = (perPage = 4, page = 1) => {
    ProductApi.getMostSales({ perPage, page })
      .then((response) => {
        setMostSales(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    dispatch(
      getBanners({
        params: { perPage: 8, page: 1, active: 1, type: "banner" },
      })
    );
    getDiscountProduct();
    getMostSales();
  }, []);

  const [arr, setArr] = useState(() => {
    (async () => {
      axios
        .get(`https://admin.rentinn.uz/api/v1/rest/brands/paginate`)
        .then((res) => setArr(res.data.data))
        .catch((err) => console.log(err));
    })();
  });

  const [shops, setShops] = useState(() => {
    (async () => {
      axios
        .get(`https://admin.rentinn.uz/api/v1/rest/shops/paginate`)
        .then((res) => setShops(res.data.data))
        .catch((err) => console.log(err));
    })();
  });

  console.log(shops);

  return (
    <>
      <SEO />
      <BrandList />
      <HomeBanner bannerList={bannerList} />
      <Row id="row">
        {shops?.length > 0
          ? shops
              .slice(0, 3)
              .map((el, index) => (
                <StoreTemplate
                  shopTitle={el.translation.title}
                  key={index}
                  uuid={el.uuid}
                  backImg={el.background_img}
                />
              ))
          : [1, 2, 3].map((el) => (
              <Col span={8} offset={100} id="col">
                <div className="mainBlock">
                  <div className="rightPart">
                    <LoaderStore />
                  </div>
                  <div className="titleUnder">
                    <SkeletonInput />
                  </div>
                </div>
              </Col>
            ))}
      </Row>
      {/*  <CategoryByChild />
      <CategoryByParent /> */}
      {/*   <MegaSale /> */}
      <ProductSection icon={true} title="Super discounts of the week">
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
      <ProductSection title="Most Sales">
        {mostSales ? (
          mostSales.map((product, key) => (
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
            text1="There are no items in the most sale products"
          />
        )}
      </ProductSection>
      <BeSeller />
      <Row id="row">
        {arr?.length > 0
          ? arr.map((el, index) => (
              <StoreTemplates key={index} title={el.title} image={el.img} />
            ))
          : [1, 2, 3, 4, 5, 6].map((el) => (
              <Col span={8} id="col">
                <div className="mainBlock">
                  <div className="rightPart">
                    <LoaderStore />
                  </div>
                  <div className="titleUnder">
                    <SkeletonInput />
                  </div>
                </div>
              </Col>
            ))}
      </Row>
      {/*  <ServiceBanner /> */}
      {/* <Blog />
      <AppBanner /> */}
    </>
  );
}

export default Home;

export const StoreTemplate = ({ uuid, backImg, shopTitle }) => {
  const wid = useWindowSize();

  return (
    <Col
      span={wid.width >= 900 ? 8 : 24}
      sm={wid.width < 900 ? 12 : wid.width < 600 && 24}
      id="col"
    >
      <div className="mainBlock">
        <div className="shopBanner">
          <img
            src={`https://admin.rentinn.uz/storage/images/` + backImg}
            className="shopImage"
            width={wid.width < 900 ? 100 : 250}
            height={wid.width < 900 ? 100 : 250}
          />
        </div>
        <div className="shopInner">
          <h3>{shopTitle}</h3>

          <a
            href={`/stores/${uuid}`}
            style={{
              color: "black",
              textDecoration: "none",
            }}
          >
            {" "}
            <LoginCircleLineIcon size={20} />{" "}
          </a>

          {/* <img
            src={`https://admin.rentinn.uz/storage/images/` + logo}
            alt=""
            width={30}
            height={30}
            style={{ borderRadius: "50%" }}
          /> */}
        </div>
      </div>
    </Col>
  );
};

export const StoreTemplates = ({ title, image }) => {
  const wid = useWindowSize();

  return (
    <Col
      span={wid.width >= 900 ? 8 : 24}
      sm={wid.width < 900 ? 12 : wid.width < 600 && 24}
      id="col"
    >
      <div className="mainBlock">
        <div className="rightPart">
          <img
            src={`https://admin.rentinn.uz/storage/images/` + image}
            className="rightPartImage"
            width={wid.width < 900 ? 100 : 250}
            height={wid.width < 900 ? 100 : 250}
          />
        </div>
        <div className="titleUnder">
          <h3>{title}</h3>
        </div>
      </div>
    </Col>
  );
};

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
