import { getStorage } from "@/helpers";
import { useEffect, useState } from "react";
import CalendarComponent from "../CalendarComponent";
import LoginScreen from "../login";

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
    <>{isLoggedIn ? <CalendarComponent /> : <LoginScreen />}</>
  );
}
