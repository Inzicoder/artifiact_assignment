import axios from "axios";
import { API_KEY, IP_ADDRESS, authToken } from "../constants";

export const fetchUserLocation = async () => {
  let userLocation = "";

  await axios
    .get(
      `https://ipgeolocation.abstractapi.com/v1/?api_key=${API_KEY}&ip_address=${IP_ADDRESS}`
    )
    .then((result) => {
      console.log(result.data, "reslt");
      userLocation = result.data;
    })
    .catch((error) => {
      console.log(error, "error");
    });

  return userLocation;
};

export const fetchUserInfo = async () => {
  let userInfo = "";
  await axios
    .get(
      `https://ipgeolocation.abstractapi.com/v1/?api_key=${API_KEY}&ip_address=${IP_ADDRESS}`,
      {
        headers: {
          Authorization: `Bearer${authToken}`,
        },
      }
    )
    .then((result) => {
      console.log(result.data, "reslt");
      userInfo = result.data;
    })
    .catch((error) => {
      console.log(error, "error");
    });

  return userInfo;
};
