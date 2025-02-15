import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import ReservationContext from "@/context/ReservationContext";
import Button from "@/shared-components/Button";
import Details from "@/shared-components/Details";
import Note from "@/shared-components/Note";
import { useNavigation } from "@react-navigation/native";
import SuccessModal from "@/shared-components/SuccessScreen";

const Reservation = () => {
  const { reservation } = useContext(ReservationContext);
  console.log("reservation", reservation);
  const navigation = useNavigation();
  const { dateData, timeData, service } = reservation;
  //   const [loading,setLoading] = useState(false);
  const [dialogMessage, setDialogMessage] = useState(false);
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

  function addMinutesToTime(inputTime, minutesToAdd) {
    // Parsiraj ulazno vreme (format je hh:mm)
    const [hours, minutes] = inputTime?.split(":").map(Number);

    // Kreiraj datum sa tim vremenom
    let date = new Date();
    date.setHours(hours, minutes, 0, 0); // Postavi vreme

    // Dodaj traženi broj minuta
    date.setMinutes(date.getMinutes() + minutesToAdd);

    // Formatiraj rezultat
    let updatedHours = String(date.getHours()).padStart(2, "0");
    let updatedMinutes = String(date.getMinutes()).padStart(2, "0");

    return `${updatedHours}:${updatedMinutes}`;
  }

  const submitReservationHandler = () => {
    navigation.navigate("makereservation"); 
   
  };
    return (
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/coverImage.jpg")}
          style={styles.coverImage}
        />
        <View style={styles.coverContent}>
          <Text style={styles.timeData}>
            {timeData?.value} -{" "}
            {addMinutesToTime(timeData?.value, service.duration)}
          </Text>
          <Text style={styles.dateData}>
            {convertDate(dateData.selectedDate)}
          </Text>
          <Text style={styles.dateData}>Frizerski Studio - Gentleman</Text>
        </View>
        <View style={{ display: "flex",padding:10 }}>
          <View>
            {/* <Image source={employer.image} style={styles.image} /> */}
            {reservation && <Details data={reservation} />}
            <Note />

            <View style={styles.reservation}>
              <Button text="Rezerviši" onPress={submitReservationHandler} />
            </View>
          </View>
        </View>
      </View>
    );
};

export default Reservation;

const styles = StyleSheet.create({
  reservation: {
    display: "flex",
    flexDirection: "column",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  timeData: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  position: {
    fontSize: 16,
    color: "grey",
    fontStyle: "italic",
    padding: 12,
  },
  coverContent: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: 'center',
    top: 80,
    left: 50,
    padding: 20,
  },
  dateData: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
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
    height: 200,
    opacity: 0.2,
  },
  capture: {
    fontSize: 32,
    color: "grey",
    fontWeight: "900",
    textAlign: "center",
    fontStyle: "italic",
    position: "absolute",
    top: 150,
    left: 50,
  },
});
