import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { FreeMode } from "swiper";

const HomeBanner = ({ bannerList }) => {
  return (
    <>
      <Swiper freeMode={false} modules={[FreeMode]} pagination={true}>
        {bannerList?.length > 0 ? (
          bannerList.map((el, index) => (
            <SwiperSlide key={index}>
              <div className="home-banner">
                <img src={`https://api.trexpress.uz/storage/images/` + el.img} />
              </div>
            </SwiperSlide>
          ))
        ) : (
          <div className="home-banner"></div>
        )}
      </Swiper>
    </>
  );
};

export default HomeBanner;
