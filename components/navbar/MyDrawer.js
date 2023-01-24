import { Button, Drawer, Radio, Space } from "antd";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import FlashlightFillIcon from "remixicon-react/FlashlightFillIcon";
import { CheeseLineIcon } from "../../constants/images";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { FreeMode, Navigation, Mousewheel } from "swiper";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { SwiperSlide, Swiper } from "swiper/react";
import SkeletonInput from "../skelton/Skeleton-Input";

const MyDrawer = ({ arr }) => {
  const [placement, setPlacement] = useState("bottom");
  const [modalopen, setModalopen] = useState(false);
  const [onDrawer, setOnDrawer] = useState(false);
  const onClose = () => {
    setModalopen(false);
  };

  const wids = useWindowSize();
  const wid = wids.width;
  const { t: tl } = useTranslation();
  useEffect(() => {
    const prev = document.getElementsByClassName("swiper-button-prev")[0];
    inView ? (prev.style = "opacity:0") : (prev.style = "opacity:1");
  }, [inView]);

  const { ref, inView } = useInView();

  const closeDrawer = () => {
    const timer = setTimeout(() => {
      if (onDrawer) {
        return clearTimeout(timer);
      } else {
        setModalopen(false);
      }
    }, 2000);
  };

  const openDrawer = () => {
    setTimeout(() => {
      setModalopen(true);
    }, 3000);
  };

  return (
    <>
      <div
        className="menuListWrapper"
        onMouseLeave={() => setModalopen(false)}
        onMouseOver={() => setModalopen(true)}
      >
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
                    <SwiperSlide key={category.uuid}>
                      <Link href={`/all-product?category_id=${category.id}`}>
                        <p ref={index === 0 ? ref : ""}>
                          {category.translation?.title}
                        </p>
                      </Link>
                    </SwiperSlide>
                  ))
                : [1, 2, 3, 4, 6, 7, 8, 9].map((_, index) => (
                    <SwiperSlide key={index}>
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
          </div>
        </div>
        <div className="skeletonBetween" />
        <Drawer
          destroyOnClose={true}
          maskClosable={false}
          placement={placement}
          closable={false}
          extra={false}
          mask={false}
          onClose={onClose}
          open={modalopen}
          key={placement}
        >
          {/*  <Drawer
          className="menuHover"
          onMouseLeave={() => setModalopen(false)}
          onMouseOver={() => {
            setModalopen(true);
            setOnDrawer(true);
          }}
        > */}
          <div
            className="menuHover"
            onMouseLeave={() => setModalopen(false)}
            onMouseOver={() => {
              setModalopen(true);
              setOnDrawer(true);
            }}
          >
            {arr?.length > 0
              ? arr.map(({ translation: { title }, children }, index) => (
                  <div>
                    <Link
                      href={`/all-product?category_id=${title.id}`}
                      key={index}
                    >
                      <p>{title}</p>
                    </Link>

                    <div>
                      {children?.map((el, index) => (
                        <p key={index}>{el.keywords}</p>
                      ))}
                    </div>
                  </div>
                ))
              : new Array(24).fill(1).map((item, index) => (
                  <div key={index}>
                    <SkeletonInput />
                  </div>
                ))}
          </div>
        </Drawer>
      </div>
    </>
  );
};
export default MyDrawer;

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
