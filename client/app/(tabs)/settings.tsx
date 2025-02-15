import { useEffect, useState } from "react";
import { getStorage } from "@/helpers";
import LoginScreen from "../login";
import SettingsComponent from "../SettingsComponent";

export default function Settings() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    getStorage()
      .then((res) => {
        if (res) {
          setIsLoggedIn(res);
        } else {
          setIsLoggedIn(null);
        }
      })
      .catch((error) => console.log("error", error));
  }, []);
  return <>{isLoggedIn ? <SettingsComponent /> : <LoginScreen />}</>;
}
