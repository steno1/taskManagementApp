// Import the React library to use React components

import React from 'react';

// Define a functional component named FormRowSelect, which takes multiple props
const FormRowSelect = ({list, handleChange, labelText, value, name}) => {
  // The component returns JSX (React syntax for defining UI elements)
  return (
    <div className='form-row'> {/* A container div for the form row */}
      <label htmlFor={name} className='form-label'>
        {labelText || name} {/* Display the label text or the prop 'name' */}
      </label>
      {/* Select element for the form */}
      <select 
        name={name}
        value={value}
        onChange={handleChange} 
        className='form-select'>
        {/* Loop through the 'list' array and generate <option> elements */}
        {list.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue} {/* Display the option's value */}
            </option>
          );
        })}
      </select>
    </div> 
  ); // End of the component's return statement
};

// Export the FormRowSelect component to be used in other files
export default FormRowSelect;
