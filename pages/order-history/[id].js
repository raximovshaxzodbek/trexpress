import React, { useContext, useEffect, useState } from "react";
import Breadcrumb from "../../components/breadcrumb";
import Chat1FillIcon from "remixicon-react/Chat1FillIcon";
import CheckboxBlankCircleLineIcon from "remixicon-react/CheckboxBlankCircleLineIcon";
import RecordCircleLineIcon from "remixicon-react/RecordCircleLineIcon";
import FileDownloadLineIcon from "remixicon-react/FileDownloadLineIcon";
import BankCardLineIcon from "remixicon-react/BankCardLineIcon";
import { useTranslation } from "react-i18next";
import { OrderApi } from "../../api/main/order";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { imgBaseUrl } from "../../constants";
import OrderHistoryProduct from "../../components/order/product";
import DiscordLoader from "../../components/loader/discord-loader";
import CustomDrawer from "../../components/drawer";
import OrderReview from "../../components/order/add-review";
import { MainContext } from "../../utils/contexts/MainContext";
import { toast } from "react-toastify";
import SEO from "../../components/seo";
import { UserApi } from "../../api/main/user";
import PayLater from "../../components/order/pay-later";
const SingleOrderHistory = ({ setLoader, setOpenChat }) => {
  const { setDrawerTitle } = useContext(MainContext);
  const { t: tl } = useTranslation();
  const router = useRouter();
  const status = [
    { id: "new", value: "New" },
    { id: "accepted", value: "Accepted" },
    { id: "ready", value: "Ready" },
    { id: "on_a_way", value: "On a way" },
    { id: "delivered", value: "Delivered" },
  ];
  const [open, setOpen] = useState(null);
  const [data, setData] = useState([]);
  const [currentShop, setCurrentShop] = useState("");
  const [drawerContent, setDrawerContent] = useState(null);
  const showData = data?.details?.find(
    (item) => item.shop.id === currentShop?.id
  );
  const index = status.findIndex((item) => item.id === showData?.status);
  const getOrderDetail = () => {
    setLoader(true);
    if (router.query.id) {
      OrderApi.getId(router.query.id)
        .then((res) => {
          setData(res.data);
          setCurrentShop(res.data.details[0].shop);
          setLoader(false);
        })
        .catch((error) => {
          console.log(error);
          setLoader(false);
        });
    }
  };
  const handleShopClick = (shop) => {
    setCurrentShop(shop);
  };
  const cancelOrder = () => {
    OrderApi.statusChange(showData.id)
      .then(() => {
        toast.success("Status changed");
        getOrderDetail();
      })
      .catch((error) => {
        console.log(error);
        toast.success(error?.response?.data.message);
      });
  };
  useEffect(() => {
    getOrderDetail();
  }, [router.query.id]);

  const getFinnalyCheck = () => {
    let totalDiscount = showData?.order_stocks.reduce(
      (total, item) => (total += item.discount),
      0
    );
    let total_price = showData?.price;
    let productTax = showData?.order_stocks.reduce(
      (total, item) => (total += item.tax),
      0
    );
    let shopTax = showData?.tax;
    let totalTax = productTax;
    return { totalDiscount, total_price, totalTax, shopTax };
  };
  const { totalDiscount, total_price, totalTax, shopTax } = getFinnalyCheck();
  const click = () => {
    setOpen(true);
    setDrawerContent(null);
    setDrawerTitle("Rating and feedback");
  };
  const getInvoiceFile = (id) => {
    UserApi.export(id).then((res) => {
      const blob = new Blob([res], {
        type: "application/pdf",
      });
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };
  const payLater = () => {
    setDrawerContent("payment");
    setOpen(true);
    setDrawerTitle("Pay");
  };
  return (
    <>
      <SEO />
      <div className="container">
        <Breadcrumb data={data} />
        <div className="delivery-type-wrapper">
          <div className="delivery-type">
            <div className="type-items">
              <Swiper
                slidesPerView={4}
                spaceBetween={17}
                navigation={true}
                modules={[Navigation]}
                breakpoints={{
                  0: {
                    slidesPerView: 1.5,
                  },
                  450: {
                    slidesPerView: 1.2,
                  },
                  550: {
                    slidesPerView: 1.5,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  945: { slidesPerView: 4 },
                  1140: { slidesPerView: 5 },
                }}
              >
                {data?.details?.map((detail, key) => {
                  return (
                    <SwiperSlide key={key}>
                      <div
                        className="type-item"
                        onClick={() => handleShopClick(detail.shop)}
                      >
                        {detail.shop.id === currentShop?.id ? (
                          <RecordCircleLineIcon color="#61DC00" size={20} />
                        ) : (
                          <CheckboxBlankCircleLineIcon size={20} />
                        )}
                        <div className="logo">
                          <img src={imgBaseUrl + detail.shop.logo_img} />
                        </div>
                        <div className="data">
                          <div className="name">
                            {detail.shop.translation?.title}
                          </div>
                          <div className="type">{tl("Store")}</div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
        <div className="mobile-order-data">
          <div className="id">{`Order_${data?.id}`}</div>
          <span></span>
          <div className="date">{showData?.created_at.slice(0, 16)}</div>
        </div>
        <div className="tab-pane">
          <div className="tab-pane-header">
            <div className="title">{tl("Order status")}</div>
            <div className="row">
              {data?.details?.[0]?.transaction?.status !== "paid" &&
                data?.details?.[0]?.status !== "canceled" && (
                  <button className="btn-success" onClick={payLater}>
                    <BankCardLineIcon /> {tl("Pay")}
                  </button>
                )}
              <button
                className="btn-success"
                onClick={() => getInvoiceFile(data.id)}
              >
                <FileDownloadLineIcon /> {tl("Download")}
              </button>
            </div>
          </div>
          <div className="order-status">
            {showData ? (
              <>
                <div className="main-data">
                  <div className="method-item">
                    <div className="shipping-type">
                      <div className="type">
                        <span>
                          {showData?.delivery_type?.translation?.title}
                        </span>
                      </div>
                      <div className="price">
                        {`${
                          data?.currency?.symbol
                        } ${showData?.delivery_type?.price?.toFixed(2)}`}
                      </div>
                    </div>
                    <div className="delivery-time">
                      {`${showData?.delivery_type?.times[0]} - ${showData?.delivery_type?.times[1]} days`}
                    </div>
                  </div>
                  {showData?.transaction && (
                    <div className="method-item">
                      <div className="shipping-type">
                        <div className="type">
                          <span>
                            {showData?.transaction?.payment_system?.tag}
                          </span>
                        </div>
                        <div className="price">
                          {`${
                            data?.currency?.symbol
                          } ${showData?.transaction?.price?.toFixed(2)}`}
                        </div>
                      </div>
                      <div className="delivery-time">
                        {
                          showData?.transaction?.payment_system?.translation
                            ?.title
                        }
                      </div>
                    </div>
                  )}
                  {showData?.delivery_address && (
                    <div className="method-item">
                      <div className="shipping-type">
                        <div className="type">
                          <span>{tl("Delivery address")}</span>
                        </div>
                      </div>
                      <div className="delivery-time">
                        {showData?.delivery_address?.address}
                      </div>
                    </div>
                  )}
                  <div className="total-amoun-wrapper">
                    <div className="total-amount">
                      <div className="amount-item">
                        <div className="key">{tl("Total product price")}</div>
                        <div className="value">
                          {`${data?.currency?.symbol}  ${(
                            total_price -
                            totalTax +
                            totalDiscount +
                            (showData?.coupon?.price
                              ? showData?.coupon?.price
                              : 0)
                          ).toFixed(2)}`}
                        </div>
                      </div>
                      <div className="amount-item">
                        <div className="key">{tl("Discount")}</div>
                        <div className="value">{`${
                          data?.currency?.symbol
                        } ${totalDiscount.toFixed(2)}`}</div>
                      </div>
                      <div className="amount-item">
                        <div className="key">{tl("Delivery")}</div>
                        <div className="value">{`${
                          data?.currency?.symbol
                        } ${showData?.delivery_fee?.toFixed(2)}`}</div>
                      </div>
                      <div className="amount-item">
                        <div className="key">{tl("VAT Tax")}</div>
                        <div className="value">{`${
                          data?.currency?.symbol
                        } ${totalTax.toFixed(2)}`}</div>
                      </div>
                      <div className="amount-item">
                        <div className="key">{tl("Shop Tax")}</div>
                        <div className="value">{`${
                          data?.currency?.symbol
                        } ${shopTax.toFixed(2)}`}</div>
                      </div>
                      {showData?.coupon?.price && (
                        <div className="amount-item">
                          <div className="key">{tl("Coupon")}</div>
                          <div className="value">{`${data?.currency?.symbol} ${showData?.coupon?.price}`}</div>
                        </div>
                      )}
                      <span></span>
                      <div className="amount-item">
                        <div className="key">{tl("Total amount")}</div>
                        <div className="value">{`${data?.currency?.symbol} ${(
                          showData?.delivery_fee +
                          total_price +
                          shopTax
                        ).toFixed(2)}`}</div>
                        <div
                          className={`payment-status ${showData?.transaction?.status}`}
                        >
                          {showData?.transaction?.status}
                        </div>
                      </div>
                    </div>
                    <div className="btn-group">
                      <button
                        disabled={
                          !(
                            showData.status === "accepted" ||
                            showData?.status === "new"
                          )
                        }
                        className="btn-danger"
                        onClick={cancelOrder}
                      >
                        {tl("Cancel order")}
                      </button>
                      <button className="btn-dark" onClick={click}>
                        {tl("Leave feedback")}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <DiscordLoader />
            )}
            {showData ? (
              <div className="suppliers">
                <div className="supplier-item">
                  <div className="supplier-header">
                    {showData?.status !== "canceled" ? (
                      <div className="status">
                        {status.map((item, key) => {
                          return (
                            <div key={key} className="item">
                              {item.id !== "delivered" && (
                                <div
                                  className={
                                    key <= index - 1 ? "line active" : "line"
                                  }
                                />
                              )}
                              <span
                                className={key <= index ? "dot active" : "dot"}
                              />
                              <label>{tl(item.value)}</label>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="status d-block">
                        <div className="item">
                          <span className="dot active" />
                          <label>{showData?.status}</label>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="ordered-products">
                    {showData?.order_stocks?.map((item, key) => {
                      return (
                        <OrderHistoryProduct
                          key={key}
                          orderedProduct={item.stock.product}
                          extras={item.stock.extras}
                          stock={item}
                          currency={data?.currency}
                        />
                      );
                    })}
                  </div>
                  <div className="add-review">
                    {showData?.deliveryman && (
                      <div className="delivery-boy">
                        <div className="avatar">
                          {showData?.deliveryman?.img ? (
                            <img
                              src={imgBaseUrl + showData?.deliveryman?.img}
                            />
                          ) : (
                            <div className="circle">
                              {showData?.deliveryman?.firstname.slice(0, 1)}
                            </div>
                          )}
                        </div>
                        <div className="data">
                          <div className="name">{`${showData?.deliveryman?.firstname} ${showData?.deliveryman?.lastname}`}</div>
                          <div className="position">
                            {showData?.deliveryman?.role}
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="action-btn">
                      <div
                        className="online-chat"
                        onClick={() => setOpenChat(true)}
                      >
                        <div className="icon">
                          <Chat1FillIcon size={20} />
                        </div>
                        <span>{tl("Online chat")}</span>
                      </div>
                      {/* <div className="view-on-map">View on map</div> */}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <DiscordLoader />
            )}
          </div>
        </div>
        <CustomDrawer open={open} setOpen={setOpen}>
          {drawerContent === "payment" ? (
            <PayLater
              getOrderDetail={getOrderDetail}
              data={data}
              setOpen={setOpen}
              open={open}
            />
          ) : (
            <OrderReview data={showData} setOpen={setOpen} />
          )}
        </CustomDrawer>
      </div>
    </>
  );
};

export default SingleOrderHistory;
