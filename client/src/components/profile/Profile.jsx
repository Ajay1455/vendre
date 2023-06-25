import React, { useState, useEffect, useContext } from "react";
import "./Profile.css";
import { logout } from "../../authContext/ApiCalls";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";

const Profile = () => {
  const location = useLocation();
  const { user,dispatch } = useContext(AuthContext);

  const [editMode, setEditMode] = useState(false);
  const [newAvatar, setNewAvatar] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [newAddress, setNewAddress] = useState("");

  useEffect(() => {
    setNewAvatar(user.avatar);
    setNewPhoneNumber(user.phoneNumber);
    setNewAddress(user.address);
  }, [user]);

  const handleLogout = () => {
    location.pathname = "/register";
    logout(dispatch);
  };

  console.log(user)

  const updateUserProfile = async () => {
    try {
      const updatedUser = {
        ...user,
        avatar: newAvatar,
        phoneNumber: newPhoneNumber,
        address: newAddress,
      };

      const response = await fetch(`/users/${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const updatedUserData = await response.json();
        dispatch({ type: "UPDATE_USER", payload: updatedUserData });
        setEditMode(false);
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ height: "100%" }}>
      <div className="bg-image"></div>
      <div className="profile-page">
        <h1>Profile Page</h1>
        <div className="profile-info">
          <div className="avatarContainer">
            <div className="profile-avatar">
              <img src={newAvatar} alt="User Avatar" height={200} />
            </div>
            {editMode ? (
              <div className="UpdateAvatar">
                <input
                  type="text"
                  placeholder="Enter new avatar URL"
                  value={newAvatar}
                  onChange={(e) => setNewAvatar(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Enter new phone number"
                  value={newPhoneNumber}
                  onChange={(e) => setNewPhoneNumber(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Enter new address"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                />
                <button className="profilebtn" onClick={updateUserProfile}>
                  Update Profile
                </button>
              </div>
            ) : (
              <button className="profilebtn" onClick={() => setEditMode(true)}>
                Edit
              </button>
            )}
          </div>
          <div className="profile-details">
            <h2>
              {user.firstName.toUpperCase()} {user.lastName.toUpperCase()}
            </h2>
            <p style={{ color: "dodgerblue" }}>
              <u>{user.isSeller ? "Seller & Buyer" : "Buyer Only"}</u>
            </p>
            <p>Email Address: {user.email}</p>
            <p>Phone Number: {user.phoneNumber ? user.phoneNumber:"Null"}</p>
            <p>Address: {user.address ? user.address: "Null"}</p>
            <p>
              Account created on : {user.created.slice(0, 10)} At{" "}
              {user.created.slice(11, 19)}
            </p>
            <p>
              Account Last Updated on : {user.updatedAt.slice(0, 10)} At{" "}
              {user.updatedAt.slice(11, 19)}
            </p>
          </div>
        </div>
        <div className="order-history">
          <h2>Order History</h2>
          <ul>
            {/* {user.products.map((order, index) => (
              <li key={index}>{order}</li>
            ))} */}
            No orders yet
          </ul>
        </div>
        <hr />
        <button className="profilebtn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
