import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/mousewheel";

// import required modules
import { FreeMode, Navigation, Mousewheel } from "swiper";
import { useRouter } from "next/router";
import { MainContext } from "../../utils/contexts/MainContext";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import SkeltonImage from "../skelton/skelton-image";
import SkeletonInput from "../skelton/Skeleton-Input";

export const BrandList = () => {
  const { ref, inView } = useInView();
  const [loading, setLoading] = useState(false);
  const [arr, setArr] = useState(() => {
    (async () => {
      axios
        .get(`https://admin.rentinn.uz/api/v1/rest/brands/paginate`)
        .then((res) => setArr(res.data.data))
        .catch((err) => console.log(err));
    })();
  });

  return (
    <>
      <Swiper
        mousewheel={true}
        slidesPerView={4}
        spaceBetween={1}
        freeMode={false}
        navigation={true}
        modules={[Mousewheel, FreeMode, Navigation]}
        className="swiperBrands"
      >
        {arr?.length > 0
          ? arr.map((el, index) => (
              <SwiperSlide key={el.uuid}>
                <div className="skeletonBrandList">
                  {!loading && <SkeltonImage />}
                  <img
                    width={80}
                    height={80}
                    src={`https://admin.rentinn.uz/storage/images/` + el.img}
                    style={{ display: loading ? "block" : "none" }}
                    onLoad={() => setLoading(true)}
                    alt="404"
                  />

                  <p className="after" ref={index === 0 ? ref : null}>
                    {el.title}
                  </p>
                </div>
              </SwiperSlide>
            ))
          : [1, 2, 3, 4].map((el, index) => (
              <SwiperSlide key={index}>
                <div className="skeletonBrandList">
                  <SkeltonImage />
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
    </>
  );
};
