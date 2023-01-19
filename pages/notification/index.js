import Link from "next/link";
import React, { useContext } from "react";
import CategoryLoader from "../../components/loader/category";
import { MainContext } from "../../utils/contexts/MainContext";
import { useTranslation } from "react-i18next";
import SEO from "../../components/seo";

const Notification = () => {
  const { notificationList } = useContext(MainContext);
  const { t: tl } = useTranslation();
  return (
    <>
      <SEO />
      <div className="notification mobile">
        <div className="header">
          <div className="title">{tl("Notification")}</div>
          <div className="mark-all">{tl("Mark all")}</div>
        </div>
        {!notificationList?.length ? (
          <>
            <CategoryLoader />
            <CategoryLoader />
            <CategoryLoader />
          </>
        ) : (
          notificationList?.map((item, key) => {
            return (
              <Link href={`/notification/${item.uuid}`}>
                <div key={key} className="item">
                  <div className="header">
                    <div className="title">{item.translation.title}</div>
                    <div className="time">{item.published_at}</div>
                  </div>
                  <div className="content">{item?.translation?.short_desc}</div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </>
  );
};

export default Notification;
