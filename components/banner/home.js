import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { imgBaseUrl } from "../../constants";
import { Pagination } from "swiper";
import "swiper/css/pagination";

const HomeBanner = ({ bannerList }) => {
  return (
    <Swiper pagination={true} modules={[Pagination]}>
      <SwiperSlide>
        <div className="home-banner">
          <img
            src={`https://ld-prestashop.template-help.com/prestashop_21250/modules/jxmegalayout/extracontent/v0R8aJNxhr8HEg65.jpg`}
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HomeBanner;
