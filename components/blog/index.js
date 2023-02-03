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
import axios from "axios";
import { Modal } from "antd";

const Blog = () => {
  const { t: tl } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [arr, setArr] = useState([]);
  useEffect(() => {
    axios
      .get(`https://api.safin24.uz/api/v1/dashboard/user/importVideo`, {
        headers: {
          Authorization: `Bearer 35|ZdkFJw0h36Jg46P4MkZVNDejmSeTCikKdlyA5KK9 `,
        },
      })
      .then((res) => setArr(res.data.data))
      .catch((error) => console.log(error));
  }, []);

  const width = useWindowSize();
  const wid = width.width;

  return (
    <div className="blog-wrapper">
      <div className="blog">
        <div className="blog-items">
          {true ? (
            <div className="storiesList">
              <Swiper
                // direction=""
                // centerInsufficientSlides={true}
                // shortSwipes={false}
                //   centeredSlidesBounds={true}
                //   centeredSlides={true}
                className="swiperStoriesList"
                freeMode={false}
                modules={[Mousewheel, FreeMode, Navigation]}
                pagination={true}
                slidesPerGroup={4}
                slidesPerView={
                  wid > 1500
                    ? 5
                    : wid > 1220
                    ? 4
                    : wid > 1000
                    ? 3
                    : wid > 760
                    ? 2
                    : 1
                }
                spaceBetween={wid > 1400 && 50}
              >
                {arr &&
                  arr.map((el, index) => {
                    let url = `https://api.safin24.uz/storage/images/videos/${el.image_name}`;
                    // let url = "https://www.youtube.com/watch?v=j8S0F-rP9v0"
                    return (
                      <SwiperSlide>
                        <div className="eachVideo">
                          <Video
                            controls={["Volume"]}
                            style={{
                              height: 270,
                              width: 287,
                              borderRadius: 10,
                              margin: "0 10px",
                            }}
                            key={el.id}
                          >
                            <source
                              style={{ backgroundColor: "transparent" }}
                              src={url}
                            />
                          </Video>
                          <div
                            className="underVideo"
                            onClick={() => setModalOpen(true)}
                          >
                            <p>{el.description}</p>
                          </div>
                        </div>
                        {/* <div
                          className="modalVideo"
                          // style={{ display: setModalOpen ? "flex" : "none" }}
                        >
                          <video src={url} className="video" />
                        </div> */}
                        {
                          <Modal
                            maskStyle={{
                              opacity: 0.5,
                              background: "rgba(0,0,0,.3)",
                            }}
                            maskClosable={true}
                            mask={true}
                            style={{
                              background: "transparent",
                              width: "max-content",
                            }}
                            centered={true}
                            open={modalOpen}
                            onCancel={() => setModalOpen(false)}
                            onClick={() => setModalOpen(false)}
                          >
                            <Video
                              key={el.id}
                              controls={["Volume"]}
                              style={{
                                height: 400,
                                width: 300,
                                borderRadius: 10,
                              }}
                            >
                              <source src={url} />
                            </Video>
                          </Modal>
                        }
                      </SwiperSlide>
                    );
                  })}
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
{
  /* <Modal
                            maskStyle={{
                              opacity: 0.5,
                              background: "rgba(0,0,0,.3)",
                            }}
                            maskClosable={true}
                            mask={true}
                            style={{
                              background: "transparent",
                              width: "max-content",
                            }}
                            centered={true}
                            open={modalOpen}
                            onCancel={() => setModalOpen(false)}
                            onClick={() => setModalOpen(false)}
                          >
                            <Video
                              key={el.id}
                              controls={["Volume"]}
                              style={{
                                height: 400,
                                width: 300,
                                borderRadius: 10,
                              }}
                            >
                              <source src={url} />
                            </Video>
                          </Modal> */
}
