import React from "react";
import axiosService from "../../services/axios";
import nookies from "nookies";
const PrivacyPolicy = ({ policyDetail }) => {
  return (
    <>
      <div className="tab-pane">
        <div className="title">
          <div className="title">{policyDetail?.translation?.title}</div>
        </div>
        <div className="termofuse">
          <div
            className="typography"
            dangerouslySetInnerHTML={{
              __html: policyDetail?.translation?.description,
            }}
          ></div>
        </div>
      </div>
    </>
  );
};
export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  const language_id = cookies?.language_id;
  const language_locale = cookies?.language_locale;
  const policy = await axiosService.get(`/api/v1/rest/policy`, {
    params: { language_id, lang: language_locale },
  });

  let policyDetail = policy.data.data;
  return { props: { policyDetail } };
}
export default PrivacyPolicy;
