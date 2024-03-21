import { useState, useEffect } from "react";
import "./register.css";

function Register({ onBackToLogin, registerUserMain }) {
  // Initialize state variables
  const [values, setValues] = useState({
    username: "",
    password: "",
    validpassword: "",
    firstname: "",
    lastname: "",
    birthDate: "",
    city: "",
    street: "",
    num: "",
    image: "",
    email: "",
  });

  const [formErrors, setFormErrors] = useState({}); // State to track form errors
  const [imageSrc, setImageSrc] = useState('');
  const [imageFile, setImageFile] = useState(null);

  // Destructure state variables for easier access
  const {
    username,
    password,
    validpassword,
    firstname,
    lastname,
    birthDate,
    city,
    street,
    num,
    image,
    email,
  } = values;

  useEffect(() => {
    // Retrieve users from local storage when component mounts
    const users = JSON.parse(localStorage.getItem("users")) || [];
    console.log("Users:", users);
  }, []);

  const cities = [
    { label: "זכרון יעקב", value: "זכרון יעקב" },
    { label: "גבעת עדה", value: "גבעת עדה" },
    { label: "עתלית", value: "עתלית" },
    { label: "חיפה", value: "חיפה" },
    { label: "עפולה", value: "עפולה" },
    { label: "עכו", value: "עכו" },
    { label: "קריית שמונה", value: "קריית שמונה" },
    { label: "קריית ביאליק", value: "קריית ביאליק" },
    { label: "מצפה עדי", value: "מצפה עדי" },
    { label: "תל אביב", value: "תל אביב" },
    { label: "הרצליה", value: "הרצליה" },
    { label: "הוד השרון", value: "הוד השרון" },
    { label: " רמת השרון", value: "רמת השרון" },
    { label: "כפר סבא", value: "כפר סבא" },
    { label: "סביון", value: "סביון" },
    { label: "פתח תקווה", value: "תפח תקווה" },
    { label: "כפר שמריהו", value: "כפר שמריהו" },
    { label: "מודיעין", value: "מודיעין" },
    { label: "ראש פינה", value: "ראש פינה" },
    { label: "ראש העין", value: "ראש העין" },
    { label: "נצרת", value: "נצרת" },
    { label: "ירושליים", value: "ירושליים" },
    { label: "נתניה", value: "נתניה" },
    { label: "אבן יהודה", value: "אבן יהודה" },
    { label: "כפר יונה", value: "כפר יונה" },
  ];

  //Preparation for validation checks
  //Mini functions to use in the password validation func
  const isUppercase = (c) => c >= "A" && c <= "Z";
  const isLowercase = (c) => c >= "a" && c <= "z";
  const isIncludeNum = (c) => c >= "0" && c <= "9";
  const isSpecialChar = (c) => "!@#$%^&*(){}[]-._".includes(c);

  //Object of validate functions to each input
  const validators = {
    //username validation
    username: (username) => {
      let userNameErrorString = undefined;

      if (!username || username.length == 0) {
        userNameErrorString = "Username is required";
      } else {
        for (let i = 0; i < username.length; i++) {
          const c = username[i];

          if (
            !(
              isLowercase(c) ||
              isUppercase(c) ||
              isIncludeNum(c) ||
              isSpecialChar(c)
            )
          ) {
            userNameErrorString =
              "Username - Only foreign letters. Must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
          }
        }

        if (username.length >= 60) {
          userNameErrorString += " (60 characters max)";
        }
      }
      setFormErrors({ ...formErrors, username: userNameErrorString });
    },

    firstname: (firstname) => {
      let errorMessage = undefined;
      if (!firstname || firstname.length == 0) {
        errorMessage = "First name is required";
      } else {
        // english and hebrew only
        if (!/^[\u0590-\u05FFa-zA-Z\s]*$/.test(firstname)) {
          errorMessage =
            "First name must contain only letters (Hebrew/English)"; // error
        }
      }
      setFormErrors({ ...formErrors, firstname: errorMessage });
    },
    lastname: (lastname) => {
      let errorMessage = undefined;
      if (!lastname || firstname.length == 0) {
        errorMessage = "Last name is required";
      } else {
        // english and hebrew only
        if (!/^[\u0590-\u05FFa-zA-Z\s]*$/.test(lastname)) {
          errorMessage = "Last name must contain only letters (Hebrew/English)"; // error
        }
      }
      setFormErrors({ ...formErrors, lastname: errorMessage });
    },

    password: (value) => {
      let errorMessage = undefined;

      if (!value || value.length == 0) {
        errorMessage = "Password is required";
      } else {
        if (value.length < 7 || value.length > 12) {
          errorMessage = "Password must be between 7 and 12 letters";
        } else {
          let foundLetter = false,
            foundNum = false,
            foundSpecial;
          for (let i = 0; i < value.length; i++) {
            const c = value[i];
            if (isUppercase(c)) foundLetter = true;
            if (isIncludeNum(c)) foundNum = true;
            if (isSpecialChar(c)) foundSpecial = true;
          }
          if (!foundLetter || !foundNum || !foundSpecial) {
            errorMessage =
              "The password must contain at least one capital letter, a number and a special character";
          }
        }
      }

      setFormErrors({ ...formErrors, password: errorMessage });
    },

    //validate that the passwords match
    validpassword: (value) => {
      let errorMessage = undefined;
      if (value != password) {
        errorMessage = "Passwords do not match. Passwords must match";
      }
      setFormErrors({ ...formErrors, validpassword: errorMessage });
    },
    image: (value) => {
      console.log("image", value);
      let errorMessage = undefined;
      if (
        !(
          value.toLowerCase().endsWith("jpg") ||
          value.toLowerCase().endsWith("jpeg")
        )
      ) {
        errorMessage = "image must be in jpg or jpeg format";
      }
      setFormErrors({ ...formErrors, validpassword: errorMessage });
    },
    birthDate: (value) => {
      let errorMessage = undefined;

      const selectedDate = new Date(value);
      const currentDate = new Date();
      if (selectedDate > currentDate) {
        errorMessage = "Birth date cannot be in the future";
      } else {
        const age = currentDate.getFullYear() - selectedDate.getFullYear();
        if (age < 18 || age > 120) {
          errorMessage = "Age must be between 18 and 120 years old";
        }
      }

      setFormErrors({ ...formErrors, city: errorMessage });
    },
    city: (value) => {
      let errorMessage = undefined;
      if (!cities.find((c) => c.value == value)) {
        errorMessage = "city must be from the list";
      }
      setFormErrors({ ...formErrors, city: errorMessage });
    },
    street: (value) => {
      let errorMessage = undefined;
      if (!value || value.trim().length == 0) {
        errorMessage = "Street is required";
      } else {
        // hebrew only
        if (!/^[\u0590-\u05FF\s]*$/.test(value)) {
          errorMessage = "Street must contain only letters (Hebrew)"; // error
        }
      }
      setFormErrors({ ...formErrors, street: errorMessage });
    },
    num: (value) => {
      let errorMessage = undefined;

      if (!value || value.trim().length == 0) {
        errorMessage = "House number is required";
      } else {
        if (isNaN(value)) {
          errorMessage = "House number must be a number";
        } else if (parseInt(value) < 0) {
          errorMessage = "House number must be a positive number";
        }
      }
      setFormErrors({ ...formErrors, num: errorMessage });
    },
    email: (value) => {
      let errorMessage = undefined;
      if (!value || value.length == 0) {
        errorMessage = "email is required";
      } else {
        const regex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!value.match(regex) || value.match(regex).length == 0) {
          errorMessage = "email is malformed";
        }
      }
      setFormErrors({ ...formErrors, email: errorMessage });
    },
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setImageSrc(event.target.result);
    };

    if (file) {
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  //Function that invokes only if all fileds valid
  //Function to Register user-Insert new user to users list and saves the user in local storage
  function registerUser(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();
    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    
    console.log(formJson);
    registerUserMain({...formJson, imageSrc}); //dendthe newUser to Main component to finish registration - save to local
  }

  //Get back to Main without registrating
  const handleBackToLoginClick = () => {
    onBackToLogin(); // This calls the function passed from the parent component to Go back to main page
  };

  const handleChange = (e) => {
    if (e.target.id === "image") {
      handleFileInputChange(e)
      const newValues = { ...values, [e.target.id]: e.target.files[0].name };
      setValues(newValues);

      validators[e.target.id](e.target.files[0].name);
    } else {
      const newValues = { ...values, [e.target.name]: e.target.value };
      setValues(newValues);
      console.log("username: " + username)
      console.log("user in: " + e.target.name)
      if (username !== "admin") {
        console.log("send to validation")
        validators[e.target.name](e.target.value);
      }
      else {
        setFormErrors({...formErrors, ["password"]: "" });

        if (e.target.name !== "password") {
          console.log("send to validation")
          validators[e.target.name](e.target.value);
        }
      }
    }
  };

  //Function to handle onChage from data list - to the city input
  //const handleCityChange = (selectedCity) => {
  // Validate if the input contains only Hebrew letters
  //const isValidHebrew = /^[\u0590-\u05FF\s]+$/u.test(selectedCity);

  // Update the city value
  //if (isValidHebrew)
  // setValues((selectedCity) => ({
  //    ...prevValues,
  //   city: selectedCity,
  // }));

  // Call the corresponding validator function
  // validators["city"](selectedCity);
  // };

  //**The Return **//
  return (
    <div
      style={{
        //maxWidth: "456px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <h1>Enter Your Details</h1>
      <form
        onSubmit={registerUser}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "center",
          maxWidth: "100%",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          backgroundColor: "gray",
        }}
      >
        <div className="inputClass">
          <label htmlFor="username">User Name : </label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={handleChange}
            maxLength="60"
            required
            placeholder="User Name"
          />
          {formErrors.username && (
            <p className="error">{formErrors.username}</p>
          )}
        </div>

        <div className="inputClass">
          <label htmlFor="password">Password : </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="enter password"
            required
            value={password}
            onChange={handleChange}
          />
          {formErrors.password && (
            <p className="error">{formErrors.password}</p>
          )}
        </div>

        <div className="inputClass">
          <label htmlFor="validpassword">Password Authentication : </label>
          <input
            type="password"
            name="validpassword"
            id="validpassword"
            placeholder="enter the password again"
            value={validpassword}
            required
            onChange={handleChange}
          />
          {formErrors.validpassword && (
            <p className="error">{formErrors.validpassword}</p>
          )}
        </div>

        <div className="inputClass">
          <label htmlFor="firstname">First Name : </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={firstname}
            placeholder="first name"
            onChange={handleChange}
            required
          />
          {formErrors.firstname && (
            <p className="error">{formErrors.firstname}</p>
          )}
        </div>

        <div className="inputClass">
          <label htmlFor="lastname">Last Name : </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={lastname}
            placeholder="Last name"
            onChange={handleChange}
            required
          />
          {formErrors.lastname && (
            <p className="error">{formErrors.lastname}</p>
          )}
        </div>

        <div className="inputClass">
          <label htmlFor="image">image : </label>
          <input type="file" id="image" onChange={handleChange} />
          {formErrors.image && <p className="error">{formErrors.image}</p>},
        </div>

        <div className="inputClass">
          <label htmlFor="email">Email : </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={handleChange}
          />
          {formErrors.email && <p className="error">{formErrors.email}</p>}
        </div>

        <div className="inputClass">
          <label htmlFor="birthDate">Birthdate : </label>
          <input
            name="birthDate"
            type="date"
            id="birthDate"
            placeholder="MM/DD/YYYY"
            value={birthDate}
            onChange={handleChange}
          />
          {formErrors.birthDate && (
            <p className="error">{formErrors.birthDate}</p>
          )}
        </div>

        <div className="inputClass">
          <label htmlFor="city">City : </label>
          <input
            id="city"
            name="city"
            type="text"
            list="inputList"
            value={city}
            required
            onChange={handleChange}
          />
          <datalist id="inputList">
            {cities.map((option) => (
              <option key={option.value} value={option.value}></option>
            ))}
          </datalist>
          {formErrors.city && <p className="error">{formErrors.city}</p>}
        </div>

        <div className="inputClass">
          <label htmlFor="birthDate">Street : </label>
          <input
            name="street"
            type="street"
            id="street"
            //   placeholder="MM/DD/YYYY"
            //   value={birthDate}
            onChange={handleChange}
          />
          {formErrors.street && <p className="error">{formErrors.street}</p>}
        </div>

        <div className="inputClass">
          <label htmlFor="birthDate">street number : </label>
          <input
            name="num"
            type="text"
            id="num"
            placeholder="0"
            value={num}
            onChange={handleChange}
          />
          {formErrors.num && <p className="error">{formErrors.num}</p>}
        </div>
        <button
          type="submit"
          disabled={!Object.values(formErrors).includes(undefined)}
          style={{ alignSelf: "center", marginTop: "10px" }}
        >
          Register
        </button>
      </form>
      <button onClick={handleBackToLoginClick}>Back to home page</button>
    </div>
  );
}

export default Register;
