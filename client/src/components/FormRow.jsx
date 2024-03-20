import React from "react";
const FormRow = ({ type, name, labelText, defaultValue,onChange }) => {
  // console.log("FormRow defaultValue:", defaultValue);
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        className="form-input"
        id={name}
        name={name}
        defaultValue={defaultValue || ""}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default FormRow;
