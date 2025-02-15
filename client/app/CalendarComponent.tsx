import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import { addMinutesToTime, convertToDay, convertToMonthName } from '@/helpers'
import ReservationContext from '@/context/ReservationContext';

const CalendarComponent = () => {
    const [check, setCheck] = useState(false);

    const { reservation } = useContext(ReservationContext);


    const checkReservationHandler = () => {
        setCheck(!check);
      };
    
  return (
    <ScrollView style={styles.container}>
          <Image
            source={require("@/assets/images/coverImage.jpg")}
            style={styles.coverImage}
          />
          <View style={styles.containerCapture}>
            <Text
              style={[styles.capture, !check && styles.active]}
              onPress={checkReservationHandler}
            >
              Budući
            </Text>
            <Text
              style={[styles.capture, check && styles.active]}
              onPress={checkReservationHandler}
            >
              Prošli
            </Text>
          </View>
          <View style={styles.greyLine} />
    
          <View style={{ display: "flex" }}>
            {!check && reservation ? (
              <CardFutureReservation reservation={reservation} />
            ) : (
              <CardPastReservation />
            )}
          </View>
        </ScrollView>
  )
}

export default CalendarComponent



const styles = StyleSheet.create({
    active: {
      color: "#fff",
      fontWeight: "bold",
    },
    container: {
      flex: 1,
    },
    headerImage: {
      color: "#808080",
      bottom: -90,
      left: -35,
      position: "absolute",
    },
    titleContainer: {
      flexDirection: "row",
      gap: 8,
    },
    containerCapture: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: 250,
      left: 100,
      gap: 30,
    },
    wrapper: {
      display: "flex",
      width: "100%",
      borderRadius: 20,
      padding: 10,
      overflowY: "scroll",
    },
    greyLine: {
      width: "100%",
      height: 4, // Adjust the height for the thickness of the line
      backgroundColor: "grey", // Set the line color to white
      marginTop: -1, // Optional: You can adjust this to fine-tune the position
    },
    coverImage: {
      width: "100%",
      height: 300,
      opacity: 0.2,
    },
    content: {
      backgroundColor: "white",
      display: "flex",
      flexDirection: "row",
      borderRadius: 20,
      padding: 10,
      gap: 20,
    },
    capture: {
      fontSize: 32,
      color: "grey",
      fontWeight: "900",
      textAlign: "center",
      fontStyle: "italic",
    },
  
    cardReservation: {
      backgroundColor: "white",
      display: "flex",
      flexDirection: "row",
      width: "100%",
      marginTop: 20,
      borderRadius: 20,
      padding: 10,
      gap: 20,
      height: 100,
    },
    dateContainer: {
      borderWidth: 1,
      borderColor: "#000",
      borderLeftWidth: 5,
      borderLeftColor: "green",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    captureDate: {
      fontSize: 18,
      color: "grey",
      textAlign: "center",
      fontWeight: "500",
    },
    captureDateBold: {
      fontSize: 20,
      color: "black",
      fontWeight: "900",
    },
    infoContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    cardReservationPast: {
      marginTop: 20,
      padding: 10,
      flex: 1,
    },
    noReservation: {
      fontSize: 24,
      textAlign: "center",
      padding: 10,
      fontWeight: "900",
      color: "white",
    },
    description: {
      fontSize: 18,
      color: "grey",
      textAlign: "center",
    },
  });
  
  const CardFutureReservation = ({ reservation }) => {
    const { dateData, timeData, service } = reservation;
  
    console.log("first", convertToMonthName(dateData.selectedDate));
    return (
      <View style={styles.cardReservation}>
        <View style={styles.dateContainer}>
          <Text style={styles.captureDate}>
            {convertToMonthName(dateData.selectedDate)}
          </Text>
          <Text style={styles.captureDateBold}>
            {convertToDay(dateData.selectedDate)}
          </Text>
          <Text style={styles.captureDate}>{timeData.value}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.captureDateBold}>{service.title}</Text>
          <Text style={styles.captureDate}>
            {timeData.value} -{" "}
            {addMinutesToTime(timeData.value, service.duration)}
          </Text>
          <Text style={styles.captureDateBold}>Cara Lazara 85 a</Text>
        </View>
      </View>
    );
  };
  
  const CardPastReservation = () => {
    return (
      <View style={styles.cardReservationPast}>
        <Text style={styles.noReservation}> Trenutno nemate rezervacija </Text>
        <Text style={styles.description}>
          Samo nekoliko klikova Vas deli od Vašeg termina.
        </Text>
      </View>
    );
  };
  