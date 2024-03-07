import React, { useState } from 'react';

const GenericForm = ({ fields, onSubmit, title, buttonText }) => {
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
    <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                    <div className="card-body p-5 text-center">
                        <div className="mb-md-5 mt-md-4 pb-5">
                            {title && <h2 className="fw-bold mb-2 text-">{title}</h2>}
                            <form onSubmit={handleSubmit}>
                            {Object.keys(fields).map((fieldName) => (
                                <div key={fieldName} className="form-outline form-white mb-4">
                                <label htmlFor={fieldName} className="form-label">{fieldName}</label>
                                <input
                                    type="text"
                                    id={fieldName}
                                    name={fieldName}
                                    value={formValues[fieldName]}
                                    onChange={handleChange}
                                    className="form-control form-control-lg"
                                />
                                </div>
                            ))}
                            <button type="submit" className="btn btn-outline-light btn-lg px-5">{buttonText || 'Submit'}</button>
                            </form>            
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  );
};

export default GenericForm;
