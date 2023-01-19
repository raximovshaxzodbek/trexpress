import React, { useState } from "react";
import nookies from "nookies";
import Accordion from "../../components/accordion";
import AccordionDetails from "../../components/accordion/accordion-details";
import AccordionSummary from "../../components/accordion/accordion-summary";
import SEO from "../../components/seo";
import axiosService from "../../services/axios";

const Faq = ({ faqDetail }) => {
  const [idList, setIdList] = useState([]);
  const handleClick = (key) => {
    const includes = idList.includes(key);
    if (includes) {
      setIdList(idList.filter((item) => item !== key));
    } else {
      setIdList([...idList, key]);
    }
  };
  return (
    <>
      <SEO />
      <div className="tab-pane">
        <div className="title">FAQ</div>
        <div className="faq">
          {faqDetail?.map((item, id) => {
            return (
              <Accordion key={id} idList={idList} id={id}>
                <AccordionSummary
                  handleClick={handleClick}
                  idList={idList}
                  id={id}
                >
                  {item.translation?.question}
                </AccordionSummary>
                <AccordionDetails>
                  <div className="typography">
                    <p>{item.translation?.answer}</p>
                  </div>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      </div>
    </>
  );
};
export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  const language_id = cookies?.language_id;
  const language_locale = cookies?.language_locale;
  const faq = await axiosService.get(`/api/v1/rest/faqs/paginate`, {
    params: { language_id, lang: language_locale },
  });

  let faqDetail = faq.data.data;
  return { props: { faqDetail } };
}
export default Faq;
