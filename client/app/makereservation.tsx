import { View, Text, StyleSheet, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ReservationContext from "@/context/ReservationContext";
import Button from "@/shared-components/Button";
import { useNavigation } from "@react-navigation/native";
import CustomCheckbox from "@/shared-components/CustomCheckbox";
import * as Notifications from 'expo-notifications';
import { addMinutesToTime } from "@/helpers";

const makereservation = () => {
  const { reservation } = useContext(ReservationContext);
  const [isCheckedHour, setIsCheckedHour] = useState(false);
  const [isCheckedDay, setIsCheckedDay] = useState(false);

  const handleCheckboxHourChange = (newValue: boolean) => {
    setIsCheckedHour(newValue);
  };
  const handleCheckboxDayChange = (newValue: boolean) => {
    setIsCheckedDay(newValue);
  };
  const navigation = useNavigation();
  const { dateData, timeData, service } = reservation;
  //   const [loading,setLoading] = useState(false);
  const convertDate = (item) => {
    const date = new Date(item);
    const weekdays = [
      "Nedelja",
      "Ponedeljak",
      "Utorak",
      "Sreda",
      "Četvrtak",
      "Petak",
      "Subota",
    ];

    // Get the day of the week in Croatian
    const dayOfWeek = weekdays[date.getDay()];

    // Format the date to day-month-year
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    // Combine everything into the desired format
    return `${dayOfWeek} ${day}-${month}-${year}`;
  };


  const [expoPushToken, setExpoPushToken] = useState(null);
  const getFcmToken = async () => {
    const token = await messaging().getToken();
    console.log("FCM Token:", token);
    // Send this token to your backend server
  };
  useEffect(() => {
    getFcmToken();

    const getPushNotificationToken = async () => {
      try {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status === 'granted') {
          const token = await Notifications.getExpoPushTokenAsync();
          setExpoPushToken(token.data);
          console.log('Expo Push Token:', token.data);
        } else {
          console.log('Notification permission not granted');
        }
      } catch (error) {
        console.error('Error getting Expo push token:', error);
      }
    };
    getPushNotificationToken();

  }, []);



  
  const submitReservationHandler =  async () => {
    if (!expoPushToken) {
      console.log("No push token available");
      return;
    }

    // Send the token to your backend for saving
    const response = await fetch('http://localhost:5000/reserve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerName: 'John Doe',
        date: '2025-02-01',
        time: '10:00 AM',
        token: expoPushToken,
      }),
    });

    const data = await response.json();
    console.log(data);
    navigation.navigate("(tabs)", { screen: "explore" });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/coverImage.jpg")}
        style={styles.coverImage}
      />
      <Image
        source={require("@/assets/images/logoImage.png")}
        style={styles.coverLogo}
      />
      <View style={styles.coverContent}>
        <Text style={styles.timeData}>
          {timeData.value} -{" "}
          {addMinutesToTime(timeData.value, service.duration)}
        </Text>
        <Text style={styles.dateData}>
          {convertDate(dateData.selectedDate)}
        </Text>
      </View>
      <View style={styles.whiteLine} />

      <View style={{ display: "flex", flexDirection: "column" }}>
        <View style={{ display: "flex" }}>
          <Text style={styles.message}>Termin je uspešno rezervisan!</Text>
        </View>

        <View style={{ display: "flex" }}>
          <Text>Podsetnik dan pre</Text>
          <CustomCheckbox
            label="Podsetnik 60 minuta pre"
            value={isCheckedHour}
            onChange={handleCheckboxHourChange}
          />
          <CustomCheckbox
            label="Podsetnik dan pre"
            value={isCheckedDay}
            onChange={handleCheckboxDayChange}
          />
        </View>

          <View style={styles.reservation}>
            <Button
              text="Dodaj podsetnike"
              onPress={submitReservationHandler}
            />
        </View>
      </View>
    </View>
  );
};

export default makereservation;

const styles = StyleSheet.create({
  coverLogo: {
    position: "absolute",
    width: 200,
    height: 180,
    left: "25%",
    top: "5%",
  },
  checkbox: {
    marginRight: 10, // Space between checkbox and label
  },
  message: {
    fontSize: 30,
    padding: 20,
    color: "#fff",
    textAlign: "center",
    fontWeight: "900",
  },

  reservation: {
    display: "flex",
    flexDirection: "column",
    height: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  timeData: {
    fontSize: 30,

    color: "#fff",
    fontWeight: "900",
    display: "flex",
    justifyContent: "center",
  },
  position: {
    fontSize: 20,
    color: "grey",
    fontStyle: "italic",
    padding: 12,
  },
  coverContent: {
    position: "absolute",
    alignItems: "center",
    top: "30%",
    left: "25%",
  },
  dateData: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "700",
  },
  data: {
    display: "flex",
    flexDirection: "column",
  },
  container: {
    flex: 1,
  },
  coverImage: {
    width: "100%",
    height: 350,
    opacity: 0.25,
  },
  capture: {
    color: "grey",
    fontWeight: "900",
    textAlign: "center",
    fontStyle: "italic",
    position: "absolute",
    top: 150,
    left: 50,
  },
  whiteLine: {
    width: "100%",
    height: 4, // Adjust the height for the thickness of the line
    backgroundColor: "#fff", // Set the line color to white
    marginTop: -1, // Optional: You can adjust this to fine-tune the position
  },
});

















