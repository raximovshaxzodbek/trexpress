import i18n from "i18next";

i18n.init({
  resources: {},
  backend: {
    loadPath: "../public/locales{{lang}}/translation.json",
  },
  ns: "translation",
  supportedLngs: ["ru", "en", "uz", "fr"],
  detection: {
    order: ["cookie", "localStorage", "htmlTag", "path", "subdomain"],
  },
  defaultNS: "translation",
  fallbackLng: "ru",
  debug: false,
  react: {
    wait: true,
  },
});

export default i18n;
