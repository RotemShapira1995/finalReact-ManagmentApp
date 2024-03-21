import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Select from "react-select";
import {
  userNameValidation,
  firstName_validation,
  lastName_validation,
  birthDate_validation,
  password_validation,
  validPassword_validation,
  num_validation,
  street_validation,
  email_validation,
  city_validation,
  image_validation,
  fields,
} from "./validation"; // Import validation objects

function Form({ onBackToLogin, registerUser }) {
  const [user, setUser] = useState({username: "",  firstname: "",lastname: "", birthDate: "", password:"", validpassword:"", city:"",num:"", street:"", email:"", image:"" });
  const [error, setError] = useState({});

  const updateUser = (fieldName, value) => {
    console.log('filedname:',fieldName,"value:",value)
    const updatedUser = { ...user, [fieldName]: value };
    setUser(updatedUser);
    validateField(fieldName, value);
  };

  const validateField = (fieldName, value) => {
    console.log('filedname:',fieldName,"value:",value)
    const fieldValidationData = fields[fieldName].validation;
    if (!fieldValidationData) return;

    Object.keys(fieldValidationData).forEach((key) => {
      
      if (key == "required") {
        if (fieldValidationData[key].value == true){
          if(value.length == 0) {

            setError({ ...error, [fieldName]: fieldValidationData[key].message });
          }else{
            setError({ ...error, [fieldName]: undefined });
          }
        }        
      }
      if(key=="pattern")
      {
        if(fieldValidationData[key].value)
        {
          setError({ ...error, [fieldName]: fieldValidationData[key].message });
        }
        else
        setError({ ...error, [fieldName]: undefined });
      }
      //if(key=="minLength")
  //    if(key=="maxLength")
    });
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const cities = [
    { label: "זכרון יעקב", value: "זכרון יעקב" },
    { label: "גבעת עדה", value: "גבעת עדה" },
    // more cities
  ];
  // Watch input changes for real-time validation
  const watchedInputs = watch();

  const onSubmit = (data) => {
    registerUser(data);
    onBackToLogin(); // Redirect back to login after registration
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container">
      <div className="grid gap-5 md:grid-cols-2">
        {/* <Input
          {...userNameValidation}
          register={register}
          errors={errors[userNameValidation.name]}
        />
        <Input
          {...firstName_validation}
          register={register}
          errors={errors[firstName_validation.name]}
        />
        <Input
          {...lastName_validation}
          register={register}
          errors={errors[lastName_validation.name]}
        />
        <Input
          {...birthDate_validation}
          register={register}
          errors={errors[birthDate_validation.name]}
        />
        <Input
          {...password_validation}
          register={register}
          errors={errors[password_validation.name]}
        />
        <Input
          {...validPassword_validation}
          register={register}
          errors={errors[validPassword_validation.name]}
        />
        <Input
          {...num_validation}
          register={register}
          errors={errors[num_validation.name]}
        /> */}
        <Input
        label={"Street"}
        name="street"
       // type='text'
        //id={street_validation.id}
          validation={street_validation.validation}
          register={register}
          onChange={updateUser}
          placeholder={street_validation.placeholder}           
          error={error[street_validation.name]}
          errors={errors[street_validation.name]}
        />
        <Input
          type="email"
          register={register}
          placeholder={}
          {...email_validation}
          onChange={updateUser}
          errors={errors[email_validation.name]}
        />

        <div>
          <label htmlFor={city_validation.name}>{city_validation.label}</label>
          <Input type="select" options={cities} onChange={updateUser} />

          {/* <Select
            id={city_validation.id}
            name={city_validation.name}
            options={cities}
            ref={register(city_validation.validation)} // Register validation rules
            classNamePrefix="react-select" // Optional: Apply custom styling
          /> */}
          {errors[city_validation.name] && (
            <p>{errors[city_validation.name].message}</p>
          )}
        </div>
        <Input
          {...image_validation}
          onChange={updateUser}
          accept="image/jpeg, image/jpg" 
          errors={errors[image_validation.name]}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
