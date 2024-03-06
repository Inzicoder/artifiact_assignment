import React, { useState, useEffect } from "react";
import profile1 from "../data/ProfileData.json";
import "./UserForm.css";
import { fetchUserInfo, fetchUserLocation } from "../API/HelperFunctions";

const UserForm = () => {
  const [userData, setUserData] = useState(profile1);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSave = () => {
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  const getUserLocation = async () => {
    const locationData = await fetchUserLocation();
    setUserData({
      ...userData,
      location: locationData.city,
      country: locationData.country,
    });
  };

  const getUserInfo = async()=>{
    const userInfo = await fetchUserInfo()
    setUserData(userInfo?.profile)

  }

  const loadLocalStorageData = async () => {
    const data = localStorage.getItem("userData");
    if (data) {
      setUserData(JSON.parse(data));
    } else {
      await getUserInfo()
      await getUserLocation();
      await delay(1000);
    }
  };


  useEffect(() => {
    loadLocalStorageData();
  }, []);

  const handleChange = (e, field) => {
    setUserData({ ...userData, [field]: e.target.value });
  };

  return (
    <div className="user-form-container">
  
      <form className="label-input-column">
        <div className="img-container">
          <img src={userData.avatarUri} className="avatar-img" alt="avatar" />
        </div>

        <label>
          Name:
          <input
            className="input-field"
            type="text"
            value={userData?.name}
            onChange={(e) => handleChange(e, "name")}
          />
        </label>

        <label>
          Username:
          <input
            type="text"
            className="input-field"
            value={userData?.username}
            onChange={(e) => handleChange(e, "username")}
          />
        </label>
        <label>
          Display Name:
          <input
            type="text"
            className="input-field"
            value={userData?.displayName}
            onChange={(e) => handleChange(e, "displayName")}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            className="input-field"
            value={userData?.age}
            onChange={(e) => handleChange(e, "age")}
          />
        </label>
        <label>
          Gender:
          <input
            type="text"
            className="input-field"
            value={userData?.gender}
            onChange={(e) => handleChange(e, "gender")}
          />
        </label>

        <label>
          Interest 1:
          <input
            type="text"
            className="input-field"
            value={userData?.interests[0]}
            onChange={(e) => handleChange(e, "interests[0]")}
          />
        </label>
        <label>
          Interest 2:
          <input
            type="text"
            className="input-field"
            value={userData?.interests[1]}
            onChange={(e) => handleChange(e, "interests[1]")}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            className="input-field"
            value={userData?.email}
            onChange={(e) => handleChange(e, "email")}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            className="input-field"
            value={userData?.location}
            onChange={(e) => handleChange(e, "location")}
          />
        </label>
      </form>

      <button className="save-button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default UserForm;
