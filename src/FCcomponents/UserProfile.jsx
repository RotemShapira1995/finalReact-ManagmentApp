import { useState, useEffect } from "react";
import "./userProfile.css";
function UserProfile({ currentUser, handleEditDetailsClick }) {
  //const storedUserData = localStorage.getItem("users");
  //if (storedUserData) {
  //   const users = JSON.parse(storedUserData);
  //   const userProfile = users.find((user) => user.username === username);
  //   if (userProfile) {
  //     setUserData(userProfile);}}

  const handleEditDetails = () => {
    if (typeof onEditDetails === "function") {
      onEditDetails();
    }
  };
  const handleLogout = () => {
    // Reset the session
    sessionStorage.clear();
    // Redirect to a different page
    window.location.href = "/";
  };

  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      <div className="profile-info">
        <div className="user-details">
          <h2>Username: {currentUser.username}</h2>
          <p>First Name: {currentUser.firstname}</p>
          <p>Last Name: {currentUser.lastname}</p>
          <p>Email: {currentUser.email}</p>
        </div>
        <img src={currentUser.imageSrc} alt="User Avatar" className="avatar" />
      </div>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
      <button
        className="edit-btn"
        onClick={handleEditDetailsClick}
        style={{ backgroundColor: "blue", margin: "5px"}}
      >
        Edit Details
      </button>
    </div>
  );
}

export default UserProfile;
