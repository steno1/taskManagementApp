import React from 'react';

// The component definition starts here.
// It takes several props as input, such as `type`, `name`, `value`, `handleChange`, `labelText`, and `placeholder`.
// These props will be used to configure the behavior and appearance of the rendered form row.
const FormRow = ({ type, name, value, handleChange, labelText, placeholder }) => {
  return (
    <div className="form-row">
      {/* This label displays the labelText or the name if labelText is not provided. */}
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      {/* This input field receives several attributes, 
      such as type, value, name, onChange, and placeholder. */}
      {/* The value and onChange attributes are used for controlled 
      input behavior. */}
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        className="form-input"
      />
    </div>
  );
};

// The component is exported so it can be imported and used in other files.
export default FormRow;
