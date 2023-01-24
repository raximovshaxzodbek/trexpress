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
import MyDrawer from "./MyDrawer";
import { ar } from "date-fns/locale";

export const MenuList = () => {
  const { t: tl } = useTranslation();
  const [changeScroll, ssetChangeScroll] = useState("none");
  const [display, setDisplay] = useState("none");
  const [num, setNum] = useState(0);
  const [quality, setQuality] = useState(4);
  const [open, setOpen] = useState(false);

  const [arr, setArr] = useState(() => {
    (async () => {
      axios
        .get(`https://api.safin24.uz/api/v1/rest/categories/paginate`)
        .then((res) => setArr(res.data.data))
        .catch((err) => console.log(err));
    })();
  });

  return (
    <div className="myDrawer-wrapper">
      <MyDrawer arr={arr} />
    </div>
  );
};
