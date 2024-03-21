import { useState } from "react";
//import UserProfile from "../FComponents/UserProfile";
//import SystemAdmin from "./SystemAdmin";

function LogIn({ onBackToMain, setCurrentUser, setShowLogIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isAdmin, setIsAdmin] = useState(false);

  const handleBackToMain = () => {
    onBackToMain(); // Call the onBackToMain function passed as a prop
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const usersData = JSON.parse(localStorage.getItem("users"));
    if (usersData) {
      const user = usersData.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        sessionStorage.setItem("isLoggedIn", true);
        let stringifiedUser = JSON.stringify(user);
        sessionStorage.setItem("userData", stringifiedUser);
        setCurrentUser(user);
        setShowLogIn(false);

        // if (user.name === "admin" && user.password === "ad12343211ad") {

        //}
      } else {
        alert("Invalid username or password");
      }
    } else {
      alert("No users data found in Local"); // Handle the case where no user data is found
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <br />
        <button
          style={{ backgroundColor: "blue", color: "white", padding: "10px" }}
          type="submit"
        >
          Login
        </button>
      </form>
      <br />
      <button onClick={handleBackToMain}>Back to Main</button>
    </div>
  );
}

export default LogIn;
