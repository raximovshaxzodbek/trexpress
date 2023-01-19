import "react-toastify/dist/ReactToastify.css";
import "rc-slider/assets/index.css";
import "../styles/index.scss";
import "swiper/css";
import "rc-pagination/assets/index.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import Providers from "../components/provider";
import Layout from "../layouts";
import Loader from "../components/loader";
import PushNotification from "../components/push-notification";
import RippleButton from "../components/loader/ripple-btn";
import CustomDrawer from "../components/drawer";
import Chat from "../components/chat/chat";
import useWindowSize from "../utils/hooks/useWindowSize";
import "../services/i18next";
import informationService from "../services/informationService";
import i18n from "../services/i18next";
import { parseCookies } from "nookies";
import { I18nextProvider } from "react-i18next";
const WithOutLayout = [
  "/settings",
  "/order-history",
  "/checkout",
  "/auth/sign-in",
  "/auth/sign-up",
  "/be-seller",
  "/invite",
  "/payment",
  "/forget-password",
];
if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}
function MyApp({ Component, pageProps }) {
  const cookie = parseCookies();
  const { pathname } = useRouter();
  const router = useRouter();
  const windowSize = useWindowSize();
  const [loader, setLoader] = useState(null);
  const [openChat, setOpenChat] = useState(false);
  Router.events.on("routeChangeStart", () => setLoader(true));
  Router.events.on("routeChangeComplete", () => setLoader(false));
  Router.events.on("routeChangeError", () => setLoader(false));
  const isWithOutLayout = WithOutLayout.find((item) =>
    router.pathname.includes(item)
  );
  function fetchTranslations() {
    const lang = cookie.language_locale || "en";
    const params = {
      lang,
    };
    setLoader(true);
    informationService
      .translations(params)
      .then(({ data }) => {
        i18n.addResourceBundle(lang, "translation", data.data);
        i18n.changeLanguage(lang);
      })
      .finally(() => setLoader(false));
  }

  useEffect(() => {
    fetchTranslations();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <I18nextProvider i18n={i18n}>
      <Providers setLoader={setLoader}>
        {cookie.access_token && <PushNotification />}
        {loader && <Loader />}
        {!isWithOutLayout ? (
          <Layout>
            <Component setLoader={setLoader} {...pageProps} />
          </Layout>
        ) : (
          <Component
            setOpenChat={setOpenChat}
            setLoader={setLoader}
            {...pageProps}
          />
        )}
        <RippleButton onClick={setOpenChat} />
        <CustomDrawer
          header={windowSize.width > 768 ? false : true}
          size={windowSize.width > 768 ? 400 : null}
          direction={windowSize.width > 768 ? "right" : "bottom"}
          open={openChat}
          setOpen={setOpenChat}
          className="chat-drawer"
          title={false}
        >
          {openChat && <Chat windowSize={windowSize} />}
        </CustomDrawer>
      </Providers>
    </I18nextProvider>
  );
}

export default MyApp;
