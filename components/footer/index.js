import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useWindowSize from "../../utils/hooks/useWindowSize";
import Accordion from "../accordion";
import AccordionDetails from "../accordion/accordion-details";
import AccordionSummary from "../accordion/accordion-summary";
import CategoryLoader from "../loader/category";
import { UpFooter } from "./UpFooter";
import playMarketLogo from "../../public/assets/icons/playMarket.png";
import appleLogo from "../../public/assets/icons/appleStoreLogo.png";
import Image from "next/image";

const Footer = () => {
  const { t: tl } = useTranslation();
  const windowSize = useWindowSize();
  const settings = useSelector((state) => state.settings.data);
  const [idList, setIdList] = useState([]);
  const handleClick = (key) => {
    const includes = idList.includes(key);
    if (includes) {
      setIdList(idList.filter((item) => item !== key));
    } else {
      setIdList([...idList, key]);
    }
  };

  const accordion = [];

  new Array(6).fill("Lorem ipsum").forEach((el, index) =>
    accordion.push(
      <AccordionDetails>
        <a key={index} href={settings[""]} target="_blank">
          {el}
        </a>
      </AccordionDetails>
    )
  );

  const makeColumns = (num) => {
    return new Array(num).fill("Lorem").map((el, index) => (
      <li key={index}>
        <a href="/" target="_blank">
          {el}
        </a>
      </li>
    ));
  };

  const firstCol = makeColumns(6);
  const secondCol = makeColumns(4);
  const thirdCol = makeColumns(5);
  const fourCol = makeColumns(4);
  const fifthCol = makeColumns(8);

  return (
    <>
      <div className="footer">
        <UpFooter />
        <div className="allUnderFooter">
        <div className="upperFooter">
          {windowSize.width > 768 ? (
            <div className="footerCols">
              <div>
                <h1 className="title">Safin24</h1>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: 200,
                  }}
                >
                  {firstCol}
                </ul>
              </div>
              <div>
                <h1 className="title">About us</h1>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: 200,
                  }}
                >
                  {secondCol}
                </ul>
              </div>
              <div>
                <h1 className="title">Social Media</h1>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",

                    height: 200,
                  }}
                >
                  {thirdCol}
                </ul>
              </div>
              <div>
                <h1 className="title">Lorem Ipsum</h1>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",

                    height: 200,
                  }}
                >
                  {fourCol}
                </ul>
              </div>
              <div>
                <h1 className="title">Help</h1>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",

                    height: 200,
                  }}
                >
                  {fifthCol}
                </ul>
              </div>
            </div>
          ) : (
            <Accordion id={""}>
              <AccordionSummary>Lorem</AccordionSummary>
              {accordion}
            </Accordion>
          )}
        </div>
        <div className="footerDown">
          <div className="secOne">
            <div className="store">
              <Image
                src={appleLogo}
                alt="Picture of the author"
                width={30}
                height={30}
              />

              <a
                href="https://www.apple.com/ru/app-store/"
                target="_blank"
                className="hrefPlayMarketAppStore"
              >
                Загрузите в <br />
                <strong>App Store</strong>
              </a>
            </div>
            <div className="store">
              <Image
                src={playMarketLogo}
                alt="Picture of the author"
                width={40}
                height={30}
              />

              <a
                href="https://play.google.com/store/games?hl=ru&gl=US&pli=1"
                target="_blank"
                className="hrefPlayMarketAppStore"
              >
                Загрузите в <br />
                <strong>Play Market</strong>
              </a>
            </div>
          </div>
          <div className="secTwo">
            <div>© 2023 Eezy Inc. All rights reserved</div>
            <div>| Terms of Use | Privacy and Policy</div>
          </div>
        </div>
      </div>
        </div>
    </>
  );
};

export default Footer;
