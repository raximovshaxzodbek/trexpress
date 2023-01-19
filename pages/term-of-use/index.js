import React from "react";
import nookies from "nookies";
import axiosService from "../../services/axios";
const Termofuse = ({ termDetail }) => {
  return (
    <div className="tab-pane">
      <div className="title">
        <div className="title">{termDetail?.translation?.title}</div>
      </div>
      <div className="termofuse">
        <div
          className="typography"
          dangerouslySetInnerHTML={{
            __html: termDetail?.translation?.description,
          }}
        ></div>
      </div>
    </div>
  );
};
export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  const language_locale = cookies?.language_locale;
  const term = await axiosService.get(`/api/v1/rest/term`, {
    params: { lang: language_locale },
  });

  let termDetail = term.data.data;
  return { props: { termDetail } };
}
export default Termofuse;
