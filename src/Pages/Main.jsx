import UserProfile from "../FCcomponents/UserProfile";
import LogIn from "../FCcomponents/LogIn";

import React, { useEffect, useState } from "react";
import SystemAdmin from "../FCcomponents/SystemAdmin";
import EditDetails from "../FCcomponents/EditDetails";
//import Form from "../Components/Form";
import Register from "../FCcomponents/Register";
import "./Main.css";

export function Main() {
  // const isLoggedIn = sessionStorage.getItem("isLoggedIn"); //Get the state of user Log In from session storage
  // Initialize the showRegister state variable to false
  const [showRegister, setShowRegister] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);
  const [showEditDetails, setShowEditDetails] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [header, setHeader] = useState("Welcome !");

  useEffect(() => {
    // Load users from localStorage on initial load
    const loadedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(loadedUsers);

    // Check if there is a logged-in user in sessionStorage
    const loggedInUser = sessionStorage.getItem("userData");
    if (loggedInUser) {
      setCurrentUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleRegisterClick = () => {
    console.log("Register button clicked"); // Debugging
    setShowRegister(true);
    setShowLogIn(false);
    setShowEditDetails(false);
    setHeader("");
  };

  const handleBackToMain = () => {
    setShowLogIn(false);
    setHeader("Welcome !");
  };

  const handleLogInClick = () => {
    setShowLogIn(true);
    setShowRegister(false);
    setShowEditDetails(false); // Hide EditDetails when showing Login
    setHeader("");
  };

  const registerUserMain = (newUser) => {
    // Retrieve existing users from local storage or initialize to an empty array
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    console.log(newUser);
    // Append the new user to the existing users array
    const updatedUsers = [...existingUsers, newUser];

    // const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // After registration, go back to main page with buttons
    setShowRegister(false);
    setShowLogIn(false);
    setHeader("Welcome !");
  };

  const handleEditDetailsClick = () => {
    setShowLogIn(false);
    setShowRegister(false);
    setShowEditDetails(true);
    // Hide other components when showing EditDetails
  };

  const handleSaveEditDetails = (editedUser) => {
    console.log("first save");
    const usersFromStorage = JSON.parse(localStorage.getItem("users")) || [];

    // Find the index of the user with the matching email
    const userIndex = usersFromStorage.findIndex(
      (user) => user.email === editedUser.email
    );

    // If the user with the email is found, update the user at that index
    if (userIndex !== -1) {
      usersFromStorage[userIndex] = editedUser;

      // Update the users array in local storage
      localStorage.setItem("users", JSON.stringify(usersFromStorage));
      console.log("users updated");
    } else {
      console.log("User not found with the given email.");
    }

    setUsers(usersFromStorage);
    if (currentUser.username !== "admin") {
      setCurrentUser(editedUser);
    }
    setShowEditDetails(false);
  };

  // const handleCancelEditDetails = () => {
  //   setShowEditDetails(false);
  // };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1 className="headerMain">{header}</h1>
      {!currentUser && showRegister && (
        <Register
          onBackToLogin={() => {
            setShowRegister(false);
            setHeader("Welcome !");
          }}
          registerUserMain={registerUserMain}
        />
      )}
      {!currentUser && !showLogIn && !showRegister && (
        <>
          <button style={{ margin: "5px" }} onClick={handleRegisterClick}>
            Register
          </button>

          <button style={{ margin: "5px" }} onClick={handleLogInClick}>
            Log In
          </button>
        </>
      )}
      {showLogIn && !currentUser && (
        <LogIn
          onBackToMain={handleBackToMain}
          setCurrentUser={setCurrentUser}
          setShowLogIn={setShowLogIn}
        />
      )}
      {/* {showEditDetails && (
        <EditDetails
          currentUser={currentUser}
          onSave={handleSaveEditDetails}
          onCancel={handleCancelEditDetails}
        />
      )} */}
      {currentUser &&
        (currentUser.username === "admin" &&
        currentUser.password === "ad12343211ad" ? (
          <SystemAdmin
            showEditDetails={showEditDetails}
            setShowEditDetails={setShowEditDetails}
            onSave={handleSaveEditDetails}
          />
        ) : (
          <>
            <UserProfile
              currentUser={currentUser}
              handleEditDetailsClick={handleEditDetailsClick}
            />

            {showEditDetails && (
              <EditDetails
                currentUser={currentUser}
                onSave={handleSaveEditDetails}
                setShowEditDetails={setShowEditDetails}
              />
            )}
          </>
        ))}
    </div>
  );
}
