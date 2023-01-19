import React from "react";
import { useTranslation } from "react-i18next";

const InputDate = ({
  label,
  value,
  name,
  onChange = () => {},
  error,
  required,
}) => {
  const { t: tl } = useTranslation();
  return (
    <div className={error ? "form-item invalid" : "form-item"}>
      <div className="label">{tl(label)}</div>
      <input
        required={required}
        onChange={(e) => onChange(e)}
        name={name}
        value={value}
        type="date"
      />
    </div>
  );
};

export default InputDate;
