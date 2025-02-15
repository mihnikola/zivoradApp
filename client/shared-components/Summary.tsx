import React, { useContext, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ReservationContext from "@/context/ReservationContext";
import { TIME_DATA } from "@/constants";

const Summary = () => {
  const [selectedItem, setSelectedItem] = useState<Object | null>(null); // State for selected item
  const { reservation, updateReservation } = useContext(ReservationContext)!; // Access context  const route = useRoute();

  const handlerPressDate = (data: Object) => {
    console.log("handlerPressDate++", data);
    setSelectedItem(data); // Set the selected item
    updateReservation({...reservation, timeData: data})

  };

  return (
    <ScrollView snapToInterval={50} decelerationRate="normal" horizontal>
      <View style={styles.container}>
        {TIME_DATA.map((item) => (
          <TouchableOpacity
            style={[
              styles.content,
              selectedItem?.label === item.label && styles.selectedContent, // Apply selected style
            ]}
            key={item.label}
            onPress={() => handlerPressDate(item)}
          >
            <Text
              style={[
                styles.time,
                selectedItem?.label === item.label && styles.selectedTime, // Apply selected style
              ]}
            >
              {item.value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-around",
    padding: 10,
  },
  content: {
    width: 100,
    height: 50,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    borderColor: "grey",
    alignItems: "center",
    borderWidth: 1, // Ensure the border is visible
  },
  selectedTime: {
    color: "white",
  },
  selectedContent: {
    backgroundColor: "black", // Green background when selected
    borderColor: "grey", // Darker border when selected
  },
  time: {
    display: "flex",
    fontSize: 16,
    color: "black",
    fontWeight: "800",
  },
});

export default Summary;
