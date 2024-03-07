import React, { useState } from 'react';

const GenericForm = ({ fields, onSubmit }) => {
  const [formValues, setFormValues] = useState(fields);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(fields).map((fieldName) => (
        <div key={fieldName}>
          <label htmlFor={fieldName}>{fieldName}</label>
          <input
            type="text"
            id={fieldName}
            name={fieldName}
            value={formValues[fieldName]}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default GenericForm;
