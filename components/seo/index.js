import Head from "next/head";
import { useSelector } from "react-redux";
import { imgBaseUrl } from "../../constants";

export default function SEO({ title, description, image, keywords }) {
  const settings = useSelector((state) => state.settings.data);
  const currentURL = window.location.href;
  return (
    <Head>
      <title>
        {title ? title : settings.title ? settings.title : "Site title"}
      </title>
      <meta data-n-head="ssr" charSet="utf-8" />
      <meta
        data-n-head="ssr"
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
      <meta
        data-n-head="ssr"
        name="robots"
        data-hid="robots"
        content="index, follow"
      />
      <meta
        data-n-head="ssr"
        name="googlebot"
        data-hid="googlebot"
        content="index, follow"
      />
      <meta data-n-head="ssr" name="description" content={description} />
      <meta data-n-head="ssr" name="keywords" content={keywords} />
      <meta data-n-head="ssr" data-hid="name" name="itemprop" content="" />
      <meta
        data-n-head="ssr"
        data-hid="og:url"
        property="og:url"
        content={currentURL}
      />
      <meta data-n-head="ssr" property="og:type" content="website" />
      <meta
        data-n-head="ssr"
        property="og:title"
        content={currentURL}
        key="ogtitle"
      />
      <meta
        data-n-head="ssr"
        property="og:description"
        content={description}
        key="ogdesc"
      />
      <meta
        data-n-head="ssr"
        data-hid="og:site_name"
        property="og:site_name"
        content={currentURL}
      />
      <meta
        property="og:image"
        content={image || imgBaseUrl + settings["favicon"]}
        key="ogimage"
      />
      <meta
        data-n-head="ssr"
        data-hid="twitter:url"
        name="twitter:url"
        content={currentURL}
      />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:title"
        content={
          title ? `${title}` : settings.title ? settings.title : "Site title"
        }
      />
      <meta name="twitter:description" content={description} />
      <meta
        data-n-head="ssr"
        data-hid="twitter:creator"
        name="twitter:creator"
        content={`@${currentURL}`}
      />
      <meta
        data-n-head="ssr"
        data-hid="twitter:site"
        name="twitter:site"
        content={`@${currentURL}`}
      />
      <meta
        data-n-head="ssr"
        name="twitter:image"
        content={image || imgBaseUrl + settings["favicon"]}
      />
      <link rel="icon" href={imgBaseUrl + settings["favicon"]} />
    </Head>
  );
}
