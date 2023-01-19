import React, { useContext } from "react";
import ArrowDownSLineIcon from "remixicon-react/ArrowDownSLineIcon";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import AddLineIcon from "remixicon-react/AddLineIcon";
import { MainContext } from "../../utils/contexts/MainContext";
const CustomSelect = ({
  options = [],
  label = "",
  placeholder = "",
  value,
  onChange,
  error,
  name,
  required,
  type = "",
}) => {
  const { t: tl } = useTranslation();
  let selected = options?.find((item) => item.id == value);
  const [active, setActive] = useState(false);
  const { setCheckoutAddress } = useContext(MainContext);
  return (
    <div
      className={
        error
          ? `form-item interface invalid ${active && "active"}`
          : `form-item interface ${active && "active"}`
      }
      onClick={() => setActive(!active)}
    >
      <div className="label">{tl(label)}</div>
      <div className="placeholder">
        {selected ? selected.value : tl(placeholder)}
      </div>
      <ArrowDownSLineIcon className="suffix" size={20} />
      <div className="option">
        {options?.map((item, key) => (
          <div key={key} className="option-item" onClick={() => onChange(item)}>
            <div className="status">
              <input
                onChange={() => {}}
                required={required}
                type="radio"
                id="option"
                name={name}
                value={selected?.value}
                checked={selected?.value === item.value}
              />
            </div>
            <label htmlFor="#option" className="label">
              {item.value}
            </label>
          </div>
        ))}
        {options?.length === 0 && type === "address" && (
          <button
            className="btn btn-dark"
            onClick={() => setCheckoutAddress(true)}
          >
            <AddLineIcon size={20} />
            <span>{tl("Add new address")}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
/* <div className="flag">
            <img src={images.Flag} />
          </div> */
