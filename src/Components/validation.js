//User Name validation
export const userNameValidation = {
  name: "username",
  label: "User Name:",
  type: "text",
  id: "username",
  placeholder: "Write your username...",
  validation: {
    required: {
      value: true,
      message: "Required",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
    pattern: {
      value: /^[a-zA-Z0-9_.-]{1,60}$/,
      message:
        "Username must be 1-60 characters, letters, numbers, and special signs: _ . -",
    },
  },
};

//First Name validation

export const firstName_validation = {
  name: "firstname",
  label: "First Name",
  type: "text",
  id: "firstname",
  placeholder: "write your first name ...",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
    pattern: { value: /^[a-zA-Z ]*$/, message: "only text" },
  },
};

// Last name validation

export const lastName_validation = {
  name: "lastname",
  label: "Last Name",
  type: "text",
  id: "lastname",
  placeholder: "write your last name ...",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
    pattern: { value: /^[a-zA-Z ]*$/, message: "only text" },
  },
};

//Birthdate validation - age validation

export const birthDate_validation = {
  name: "birthDate",
  label: "Birth Date",
  type: "date",
  id: "birthDate",
  placeholder: "MM/DD/YYYY",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    validate: {
      validDate: (value) => {
        const selectedDate = new Date(value);
        const currentDate = new Date();
        if (selectedDate > currentDate) {
          return "Birth date cannot be in the future";
        }
        return true;
      },
      validAge: (value) => {
        const selectedDate = new Date(value);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - selectedDate.getFullYear();
        if (age < 18 || age > 120) {
          return "Age must be between 18 and 120 years old";
        }
        return true;
      },
    },
  },
};

//Password validation
export const password_validation = {
  name: "password",
  label: "Password",
  type: "password",
  id: "password",
  placeholder: "type password ...",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    minLength: {
      value: 7,
      message: "min 7 characters",
    },
    maxLength: { value: 12, message: "max 12 characters" },
    pattern: {
      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{7,12}$/,
      message:
        "Password must be 7-12 characters with at least one uppercase letter, number, and special character.",
    },
  },
};

//Valitade matching password
export const validPassword_validation = {
  name: "validpassword",
  label: "Validate Password",
  type: "password",
  id: "validpassword",
  placeholder: "type password ...",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    minLength: {
      value: 7,
      message: "min 7 characters",
    },
    maxLength: { value: 12, message: "max 12 characters" },
    pattern: {
      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{7,12}$/,
      message:
        "Password must be 7-12 characters with at least one uppercase letter, number, and special character.",
    },
  },
};

//House number validation
export const num_validation = {
  name: "num",
  label: "Number",
  type: "number",
  id: "num",
  placeholder: "number of the house in the street",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    validate: (value) => {
      if (value <= 0) {
        return "House number must be a positive number";
      }
      return true; // Return true if validation passes
    },
  },
};

// street validation
export const street_validation = {
  name: "street",
  label: "Street Name",
  type: "text",
  id: "street",
  placeholder: "street name only Hebrew letters",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    pattern: {
      value: /^[\u0590-\u05FF\s]*$/,
      message: "Hebrew only",
    },
  },
};

//Email validation
export const email_validation = {
  name: "email",
  label: "Email Address",
  type: "email",
  id: "email",
  placeholder: "write an email address",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "not valid",
    },
  },
};

// City validation
export const city_validation = {
  name: "city",
  label: "City",
  type: "text",
  id: "city",
  placeholder: "Select a city...",
  validation: {
    required: {
      value: true,
      message: "Please select a city",
    },
    pattern: {
      value: /^[\u0590-\u05FF\s]*$/,
      message: "City name must contain only Hebrew characters",
    },
  },
};

// Image validation
export const image_validation = {
  name: "image",
  label: "Add Image",
  type: "file",
  id: "image",
  validation: {
    required: {
      value: true,
      message: "required",
    },
  },
};

export const fields = {
  username: {
    name: "username",
    label: "User Name:",
    type: "text",
    id: "username",
    placeholder: "Write your username...",
    validation: {
      required: {
        value: true,
        message: "Required",
      },
      maxLength: {
        value: 30,
        message: "30 characters max",
      },
      pattern: {
        value: /^[a-zA-Z0-9_.-]{1,60}$/,
        message:
          "Username must be 1-60 characters, letters, numbers, and special signs: _ . -",
      },
    },
  },
  firstname: {
    name: "firstname",
    label: "First Name",
    type: "text",
    id: "firstname",
    placeholder: "write your first name ...",
    validation: {
      required: {
        value: true,
        message: "required",
      },
      maxLength: {
        value: 30,
        message: "30 characters max",
      },
      pattern: { value: /^[a-zA-Z ]*$/, message: "only text" },
    },
  },
  lastname: {
    name: "lastname",
    label: "Last Name",
    type: "text",
    id: "lastname",
    placeholder: "write your last name ...",
    validation: {
      required: {
        value: true,
        message: "required",
      },
      maxLength: {
        value: 30,
        message: "30 characters max",
      },
      pattern: { value: /^[a-zA-Z ]*$/, message: "only text" },
    },
  },
  birthDate: {
    name: "birthDate",
    label: "Birth Date",
    type: "date",
    id: "birthDate",
    placeholder: "MM/DD/YYYY",
    validation: {
      required: {
        value: true,
        message: "required",
      },
      validate: {
        validDate: (value) => {
          const selectedDate = new Date(value);
          const currentDate = new Date();
          if (selectedDate > currentDate) {
            return "Birth date cannot be in the future";
          }
          return true;
        },
        validAge: (value) => {
          const selectedDate = new Date(value);
          const currentDate = new Date();
          const age = currentDate.getFullYear() - selectedDate.getFullYear();
          if (age < 18 || age > 120) {
            return "Age must be between 18 and 120 years old";
          }
          return true;
        },
      },
    },
  },
  password: {
    name: "password",
    label: "Password",
    type: "password",
    id: "password",
    placeholder: "type password ...",
    validation: {
      required: {
        value: true,
        message: "required",
      },
      minLength: {
        value: 7,
        message: "min 7 characters",
      },
      maxLength: { value: 12, message: "max 12 characters" },
      pattern: {
        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{7,12}$/,
        message:
          "Password must be 7-12 characters with at least one uppercase letter, number, and special character.",
      },
    },
  },
  validpassword: {
    name: "validpassword",
    label: "Validate Password",
    type: "password",
    id: "validpassword",
    placeholder: "type password ...",
    validation: {
      required: {
        value: true,
        message: "required",
      },
      minLength: {
        value: 7,
        message: "min 7 characters",
      },
      maxLength: { value: 12, message: "max 12 characters" },
      pattern: {
        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{7,12}$/,
        message:
          "Password must be 7-12 characters with at least one uppercase letter, number, and special character.",
      },
    },
  },
  num: {
    name: "num",
    label: "Number",
    type: "number",
    id: "num",
    placeholder: "number of the house in the street",
    validation: {
      required: {
        value: true,
        message: "required",
      },
      validate: (value) => {
        if (value <= 0) {
          return "House number must be a positive number";
        }
        return true; // Return true if validation passes
      },
    },
  },
  city: {
    name: "city",
    label: "City",
    type: "text",
    id: "city",
    placeholder: "Select a city...",
    validation: {
      required: {
        value: true,
        message: "Please select a city",
      },
      pattern: {
        value: /^[\u0590-\u05FF\s]*$/,
        message: "City name must contain only Hebrew characters",
      },
    },
  },
  street: {
    name: "street",
    label: "Street Name",
    type: "text",
    id: "street",
    placeholder: "street name only Hebrew letters",
    validation: {
      required: {
        value: true,
        message: "required",
      },
      pattern: {
        value: /^[\u0590-\u05FF\s]*$/,
        message: "Hebrew only",
      },
    },
  },
  email: {
    name: "email",
    label: "Email Address",
    type: "email",
    id: "email",
    placeholder: "write an email address",
    validation: {
      required: {
        value: true,
        message: "required",
      },
      pattern: {
        value:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "not valid",
      },
    },
  },
  image: {
    name: "image",
    label: "Add Image",
    type: "file",
    id: "image",
    validation: {
      required: {
        value: true,
        message: "required",
      },
    },
  },
};
