import React from "react";
import "./input.css";

const Input = ({
  label,
  name,
  type = "text",
  id,
  placeholder,
  register,
  error,
  options,
  accept,
  onChange,
  validation,
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      {type === "select" ? (
        <Select
          name={name}
          id={id}
          options={options}
          onChange={onChange}
          className="form-select"
        />
      ) : type === "file" ? (
        <div>
          <input
            type={type}
            name={name}
            id={id}
            accept={accept}
            onChange={onChange}
          />
          {error && <p>{error}</p>}
        </div>
      ) : (
        <TextInput
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          onChange={onChange}
        />
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Input;

const TextInput = ({ type, name, id, placeholder, onChange }) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      onChange={(e) => onChange(name, e.target.value)}
    />
  );
};

const Select = ({ name, id, onChange, placeholder, options, validation }) => {
  return (
    <>
      <input
        type="text"
        list="inputList"
        onChange={(e) => onChange(name, e.target.value)}
      />
      <datalist id="inputList">
        {options.map((option) => (
          <option key={option.value} value={option.value}></option>
        ))}
      </datalist>
      {/* <select
      name={name}
      id={id}
      ref={register} // Register select input with React Hook Form
      className="form-select" // Add any additional styling classes as needed
    >
      <option value="" disabled hidden>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select> */}
    </>
  );
};
