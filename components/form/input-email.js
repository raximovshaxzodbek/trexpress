import React from "react";
import { useTranslation } from "react-i18next";

const InputEmail = ({ label, placeholder, name, value, onChange }) => {
  const { t: tl } = useTranslation();
  return (
    <div className="form-item">
      <div className="label">{tl(label)}</div>
      <input
        onChange={(e) => onChange(e)}
        name={name}
        value={value}
        type="email"
        placeholder={tl(placeholder)}
        autoComplete="off"
        id="email"
      />
    </div>
  );
};

export default InputEmail;
