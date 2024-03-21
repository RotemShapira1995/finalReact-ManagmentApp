import { useState, useEffect } from "react";

//import UserProfile from "./";

function EditDetails({ currentUser, onSave, setShowEditDetails }) {
  // Initialize state variables using useState hook
  const [values, setValues] = useState({
    username: currentUser.username,
    password: currentUser.password,
    validpassword: currentUser.validpassword,
    firstname: currentUser.firstname,
    lastname: currentUser.lastname,
    email: currentUser.email,
  });

  const [formErrors, setFormErrors] = useState({}); // State to track form errors
  const [imageSrc, setImageSrc] = useState("");
  const [imageFile, setImageFile] = useState(null);
  // Destructure state variables for easier access
  const { username, password, validpassword, firstname, lastname, email } =
    values;

  // useEffect for validation
  useEffect(() => {
    const errors = {};

    // Simple validation checks
    if (!username) errors.username = "Username is required";
    if (!email.includes("@")) errors.email = "Invalid email format";
    if (password !== validpassword)
      errors.validpassword = "Passwords must match";

    setFormErrors(errors);
  }, [username, password, validpassword, email]); // Run effect when these fields change

  function updateUser(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);

    // Update the user details
    const updatedUser = { ...currentUser, ...formJson, imageSrc };

    // Save the updated user to local storage
    const userLoggedIn = JSON.parse(localStorage.getItem("user")) || null;
    if (userLoggedIn.username !== "admin") {
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
    onSave(updatedUser);
    alert("user updated successfully");
  }

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

  return (
    <div
      style={{
        width: "600px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "gray",
        borderRadius: "20px",
        margin: "10px"
      }}
    >
      <h1>Enter Your Details</h1>
      <form
        onSubmit={updateUser}
        style={{
          gap: "10px",
          maxWidth: "100%",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "center",
        }}
      >
        <div>
          <label htmlFor="username">User Name : </label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
            required
            placeholder="User Name"
          />
        </div>
        <div>
          <label htmlFor="password">Password : </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            // placeholder="*******"
            required
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="validpassword">Password Authentication : </label>
          <input
            type="password"
            name="validpassword"
            id="validpassword"
            // placeholder="******"
            value={validpassword}
            required
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="firstname">First Name : </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={firstname}
            placeholder="first name"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label htmlFor="lastname">Last Name : </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={lastname}
            placeholder="Last name"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            disabled
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <input id="image" type="file" onChange={handleFileInputChange} />
        {formErrors.username && <p className="error">{formErrors.username}</p>}
        {formErrors.email && <p className="error">{formErrors.email}</p>}
        {formErrors.validpassword && (
          <p className="error">{formErrors.validpassword}</p>
        )}
        <div className="actions">
          <button
            type="submit"
            disabled={Object.keys(formErrors).length > 0}
            style={{ backgroundColor: "green", margin: "5px" }}
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => {
              setShowEditDetails(false);
              // if (onBackToProfile) {
              //   onBackToProfile();
              // }
            }}
            style={{ backgroundColor: "red", margin: "5px" }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditDetails;
