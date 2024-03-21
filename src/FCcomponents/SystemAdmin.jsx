import React, { useState, useEffect } from "react";
import EditDetails from "./EditDetails";
import "./usersForAdmin.css";
function SystemAdmin({ showEditDetails, setShowEditDetails, onSave }) {
  const [selectedUser, setSelectedUser] = useState(null);
  // Retrieve admin profile from sessionStorage

  const storedUserData = localStorage.getItem("users");
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    if (storedUserData) {
      const usersFromLocal = JSON.parse(storedUserData);
      if (usersFromLocal) {
        // Filter out the admin's own profile from the list
        const filteredUsers = usersFromLocal.filter(
          (user) => user.username !== "admin"
        );
        setUsersList(filteredUsers);
      }
    }
  }, [storedUserData]);

  const handleLogout = () => {
    // Reset the session
    sessionStorage.clear();
    // Redirect to a different page
    window.location.href = "/";
  };

  // const handleBackToProfile = () => {
  //   setSelectedUser(null);
  // };
  const deleteUserByEmail = (emailToDelete) => {
    // Get the users array from local storage

    // Filter out the user with the matching email
    const fillteredUsers = usersList.filter((user) => {
      if (user.username !== "admin") {
        return user.email !== emailToDelete;
      }
    });

    // Set the updated users array back in local storage
    localStorage.setItem("users", JSON.stringify(fillteredUsers));
    setUsersList(fillteredUsers);
  };

  return (
    <div>
      <h1>System Admin</h1>
      {selectedUser && showEditDetails ? (
        <EditDetails
          currentUser={selectedUser}
          onSave={onSave}
          setShowEditDetails={setShowEditDetails}
          // onBackToProfile={handleBackToProfile}
        />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2>User Profiles</h2>
          <ul
            style={{
              listStyleType: "none",
              padding: 0,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            {usersList.length > 0 ? (
              usersList.map((user) => (
                <li key={user.username} className="user-item">
                  <h2>Username: {user.username}</h2>
                  <img
                    src={user.imageSrc}
                    alt="img"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <p>First Name: {user.firstname}</p>
                  <p>Last Name: {user.lastname}</p>
                  <p>Password: {user.password}</p>
                  <p>Email: {user.email}</p>
                  <p>Street: {user.street}</p>
                  <p>City: {user.city}</p>
                  <p>BirthDate: {user.birthDate}</p>
                  <p>Num: {user.num}</p>
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setShowEditDetails(true);
                    }}
                  >
                    Edit Details
                  </button>
                  <button
                    onClick={() => {
                      deleteUserByEmail(user.email);
                    }}
                  >
                    delete user
                  </button>
                </li>
              ))
            ) : (
              <p>No other users found.</p>
            )}
          </ul>
        </div>
      )}
      <button
        style={{
          backgroundColor: "red",
        }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default SystemAdmin;
