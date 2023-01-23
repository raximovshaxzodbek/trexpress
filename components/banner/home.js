import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { imgBaseUrl } from "../../constants";
import { Pagination } from "swiper";
import "swiper/css/pagination";
import { FreeMode } from "swiper";

const HomeBanner = ({ bannerList }) => {
  return (
    <>
      <Swiper freeMode={false} modules={[FreeMode]} pagination={true}>
        {bannerList?.length > 0 ? (
          bannerList.map((el, index) => (
            <SwiperSlide>
              <div className="home-banner">
                <img
                  src={
                    `https://admin.rentinn.uz/public/storage/images/` + el.img
                  }
                />
              </div>
            </SwiperSlide>
          ))
        ) : (
          <div className="home-banner">
            <img
              src={`https://ld-prestashop.template-help.com/prestashop_21250/modules/jxmegalayout/extracontent/v0R8aJNxhr8HEg65.jpg`}
            />
          </div>
        )}
      </Swiper>
    </>
  );
};

export default HomeBanner;
