import React, { useEffect, useState } from "react";
import Slider from "rc-slider";
import { parseCookies } from "nookies";
import useDebounce from "../../../utils/hooks/useDebounce";
import { useTranslation } from "react-i18next";
const ByPrice = ({ handleFilter }) => {
  const { t: tl } = useTranslation();
  const cookies = parseCookies();
  const currency_rate = cookies?.currency_rate;
  const currency_symbol = cookies?.currency_symbol;
  const [range, setRange] = useState(null);
  const [sort, setSort] = useState(null);
  const [showRange, setShowRange] = useState([0, 100000 * currency_rate]);
  const debouncedRange = useDebounce(range, 1000);
  const handleChange = (value) => {
    setRange(value);
    setShowRange(value);
  };
  useEffect(() => {
    if (debouncedRange) {
      handleFilter({ range: range });
    }
  }, [debouncedRange]);
  const handleByPrice = (value) => {
    setSort(value);
    handleFilter({ sort: value });
  };
  return (
    <div className="by-price">
      <div className="title">{tl("Price")}</div>
      <div className="price-type">
        <div
          className={sort === "asc" ? "item selected" : "item"}
          onClick={() => handleByPrice("asc")}
        >
          {tl("By low price")}
        </div>
        <div
          className={sort === "desc" ? "item selected" : "item"}
          onClick={() => handleByPrice("desc")}
        >
          {tl("By high price")}
        </div>
      </div>
      <div className="price-rage">
        <span>{`${currency_symbol} ${showRange ? showRange[0] : 0}`}</span>
        <span>{`${currency_symbol} ${showRange ? showRange[1] : 0}`}</span>
      </div>
      <Slider
        className="slider"
        range
        allowCross={false}
        defaultValue={[1, showRange[1]]}
        min={1}
        max={10000 * currency_rate}
        onChange={(value) => handleChange(value)}
      />
    </div>
  );
};

export default ByPrice;
