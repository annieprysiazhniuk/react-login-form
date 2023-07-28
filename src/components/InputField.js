import React from "react";

function InputField({
  value,
  label,
  name,
  type,
  onChange,
  id,
  isFormDisabled,
}) {
  return (
    <>
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <input
        disabled={isFormDisabled}
        value={value}
        onChange={onChange}
        name={name}
        className="form-control"
        id={id}
        size="50"
        type={type}
        required
      />
    </>
  );
}

export default InputField;
