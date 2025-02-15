import {getStorage } from "@/helpers";
import { useEffect, useState } from "react";
import LoginScreen from "../login";
import NotificationComponent from "../NotificationComponent";

export default function TabTwoScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);


  useEffect(() => {
    getStorage()
      .then((res) => {
        if (res) {
          setIsLoggedIn(res);
        } else {
          setIsLoggedIn(null)
        }
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <>{isLoggedIn ? <NotificationComponent /> : <LoginScreen />}</>
   
  );
}
