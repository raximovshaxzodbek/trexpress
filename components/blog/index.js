import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BlogApi } from "../../api/main/blog";
import { images } from "../../constants/images";
import Empty from "../empty-data";
import StoreLoader from "../loader/store";
import BlogCard from "./card";
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { FreeMode, Navigation, Mousewheel } from "swiper";

const Blog = () => {
  const { t: tl } = useTranslation();
  /*   const [blogList, setBlogList] = useState(null);
  const getBlogs = () => {
    BlogApi.get({ type: "blog", perPage: 3 })
      .then((res) => {
        setBlogList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getBlogs();
  }, []); */
  return (
    <div className="blog-wrapper">
      <div className="blog">
        {/* <div className="title">{tl("Stories")}</div> */}
        <div className="blog-items">
          {true ? (
            <div className="storiesList">
              <Swiper
                className="swiperStoriesList"
                freeMode={false}
                modules={[Mousewheel, FreeMode, Navigation]}
                pagination={true}
                slidesPerView={5}
                spaceBetween={50}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
                  (el) => (
                    <SwiperSlide>
                      <div className="eachVideo">
                        {/* <div
                          style={{
                            width: 287,
                            height: 270,
                            background: "red",
                            margin: 10,
                            border: "3px solid green ",
                          }}
                        /> */}
                        <Video
                          controls={[
                            "PlayPause",
                            "Seek",
                            "Time",
                            "Volume",
                            "Fullscreen",
                          ]}
                          style={{
                            height: 270,
                            width: 287,
                            borderRadius: 10,
                            margin: " 0 10px",
                          }}
                          key={el}
                        >
                          <source
                            // src="/tiktok.mp4"
                            type="video/webm"
                          />
                        </Video>
                        <div className="underVideo">
                          <p>
                            Lorem ipsum dolor sit amet consectetur. Volutpat
                            arcu tortor integer urna quis dictum rutrum.
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                )}
              </Swiper>
            </div>
          ) : (
            <>
              <StoreLoader />
              <StoreLoader />
              <StoreLoader />
              <StoreLoader />
            </>
          )}
        </div>
        {/* {blogList?.length === 0 && (
          <Empty image={images.ViewedProduct} text1="There are no stroies" />
        )} */}
      </div>
    </div>
  );
};

export default Blog;
