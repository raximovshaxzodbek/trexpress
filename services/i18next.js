import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    // en: {
    //   translation: {
    //     learn: "Learn React!",
    //   },
    // },
  },
  //   backend: {
  //     loadPath: "../public/locales{{lang}}/common.json",
  //   },
  //   defaultNS: "common",
  supportedLngs: ["ru", "en"],
  detection: {
    order: ["cookie", "localStorage", "htmlTag", "path", "subdomain"],
  },
  //   fallbackLng: "ru",
  debug: true,
  react: {
    wait: true,
  },
  //   loadPath: "../public/locales{lang}/common.json",
});

export default i18n;

// import i18n from "i18next";

// i18n.init({
//   resources: {},
//   ns: "translation",
//   defaultNS: "translation",
//   fallbackLng: "en",
//   debug: false,
//   react: {
//     wait: true,
//   },
// });

// export default i18n;
