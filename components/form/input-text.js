import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const InputText = ({
  label = "",
  placeholder = "",
  className = "",
  onChange = () => {},
  onBlur = () => {},
  name = "",
  value,
  suffix,
  required,
  type = "text",
  disabled = false,
}) => {
  const { t: tl } = useTranslation();
  
  return (
    <div className={`form-item ${className}`}>
      <div className="label">{tl(label)}</div>
      <input
        type={type}
        required={required}
        onBlur={(e) => onBlur(e)}
        value={value}
        name={name}
        onChange={(e) => onChange(e)}
        placeholder={tl(placeholder)}
        autoComplete="off"
        disabled={disabled}
      />
      <div className="suffix">{suffix}</div>
    </div>
  );
};

export default InputText;
