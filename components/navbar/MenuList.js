import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FlashlightFillIcon from "remixicon-react/FlashlightFillIcon";
import { CheeseLineIcon } from "../../constants/images";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { FreeMode, Navigation, Mousewheel } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import SkeletonInput from "../skelton/Skeleton-Input";
import { useRouter } from "next/router";
import { useContext } from "react";
import { MainContext } from "../../utils/contexts/MainContext";
import { imgBaseUrl } from "../../constants";

export const MenuList = () => {
  const { t: tl } = useTranslation();
  const [changeScroll, ssetChangeScroll] = useState("none");
  const [display, setDisplay] = useState("none");
  const [num, setNum] = useState(0);
  const [quality, setQuality] = useState(4);
  const { isOpen, setIsOpen, shop } = useContext(MainContext);


  const [arr, setArr] = useState(() => {
    (async () => {
      axios
        .get(`https://api.safin24.uz/api/v1/rest/categories/paginate`)
        .then((res) => setArr(res.data.data))
        .catch((err) => console.log(err));
    })();
  });

  console.log(arr);

  const someArr = new Array(10)
    .fill("Lorem ipsum")
    .map((el, index) => <p key={index}>{el}</p>);

  const allArr = new Array(6).fill(someArr).map((el, index) => (
    <div className="eachColHover" key={index}>
      <h1>Lorem</h1>
      {el}
    </div>
  ));

  const { ref, inView } = useInView();
  useEffect(() => {
    const prev = document.getElementsByClassName("swiper-button-prev")[0];
    inView ? (prev.style = "opacity:0") : (prev.style = "opacity:1");
  }, [inView]);

  const wids = useWindowSize();
  const wid = wids.width;

  const router = useRouter()

  return (
    <div className="menuListWrapper">
      <div className="menuListContainer">
        <div className="categoriesList">
          <Swiper
            mousewheel={true}
            scrollbar={true}
            slidesPerView={wid > 1400 ? 8 : wid > 900 ? 5 : wid < 675 && 3}
            spaceBetween={30}
            freeMode={true}
            navigation={true}
            modules={[Mousewheel, FreeMode, Navigation]}
            className="swiperCategoriesList"
          >
            {arr?.length > 0
              ? arr.map((category, index) => (
                  <SwiperSlide
                    key={category.uuid}
                    onMouseLeave={() => setDisplay("none")}
                    onMouseOver={() => setDisplay("grid")}
                    onClick={() => setNum(index)}
                  >
                    <Link href={`/all-product?category_id=${category.id}`}>
                      <p ref={index === 0 ? ref : ""}>
                        {category.translation?.title}
                      </p>
                    </Link>
                  </SwiperSlide>
                ))
              : [1, 2, 3, 4, 6, 7, 8, 9].map((item, index) => (
                  <SwiperSlide
                    key={index}
                    onMouseLeave={() => setDisplay("none")}
                    onMouseOver={() => setDisplay("grid")}
                    onClick={() => setNum(index)}
                  >
                    <SkeletonInput />
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>

        <div className="sideBtns">
          <Link href="/stores/often-buy">
            <div className="btn sideBtn link">
              <div className="label">
                <FlashlightFillIcon size={32} color="#61DC00" />
                <p>{tl("Often buy")}</p>
              </div>
            </div>
          </Link>
          <Link href="/stores/profitable">
            <div className="btn sideBtn link">
              <div className="label">
                <CheeseLineIcon />
                <p>{tl("Advantageous")}</p>
              </div>
              {/* <div className="suffix">
                <ArrowRigthIcon />
              </div> */}
            </div>
          </Link>
          {router.pathname === "/products/[id]"  && (
            <Link href={`/stores/${shop.uuid}`}>
              <a className="current-store">
                <div className="logo">
                  <img src={imgBaseUrl + shop?.logo_img} alt="Logo" />
                </div>
                <div className="data">
                  <div className="name">{shop?.translation?.title}</div>
                  <div className="type">{tl("Store")}</div>
                </div>
              </a>
            </Link>
          )}
        </div>
      </div>
      <div
        onMouseOver={() => setDisplay("grid")}
        onMouseLeave={() => setDisplay("none")}
        className="skeletonBetween"
      ></div>
      <div
        onMouseOver={() => setDisplay("grid")}
        onMouseLeave={() => setDisplay("none")}
        className="menuHover"
        style={{ display: `${display}` }}
      >
        {arr?.length > 0 &&
          arr.map(({ translation: { title }, children }, index) => (
            <div>
              <Link href={`/all-product?category_id=${title.id}`} key={index}>
                <p>{title}</p>
              </Link>

              <div>
                {children?.map((el, index) => (
                  <p key={index}>{el.keywords}</p>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

//dry
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
