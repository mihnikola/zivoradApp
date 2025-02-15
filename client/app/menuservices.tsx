// app/menuservices.tsx
import { useRoute } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import {
  ScrollView,
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ReservationContext from "@/context/ReservationContext";
import { SERVICES_DATA } from "@/constants";

const MenuServices = () => {
  const navigation = useNavigation();
  const { updateReservation } = useContext(ReservationContext)!;  // Access context  const route = useRoute();
  const route = useRoute();
  const { item } = route.params;


  const funcDateTimeReservation = (value: any) => {
    const requestData = {
      employer: item,
      service: value,
    }
    updateReservation(requestData);
    navigation.navigate("datereservation")

  };

  useEffect(()=> {
    fetchAllServices()
  },[]);

  const fetchAllServices = async () => {
    // try {
    //   await axios.get("http://localhost:5000/services",{
        
    //     headers: {
    //       "Content-Type": "application/json",
    //       },


    //   });
    //   const data = await response.json();
    //   return data;
    //   } catch (error) {
    //     console.error(error);
    //     }

  }

  return (
    <ScrollView  style={styles.container}>
      <Image
        source={require("@/assets/images/coverImage.jpg")}
        style={styles.coverImage}
      />
      <Text style={styles.capture}>Usluge & Cenovnik</Text>
      <View style={{ display: "flex" }}>
        {SERVICES_DATA.map((value) => {
          return (
            <TouchableOpacity
              key={value.id}
              onPress={()=>funcDateTimeReservation(value)}
              style={styles.wrapper}
            >
              <View style={styles.content}>
                <Image source={value.image} style={styles.image} />
                <View style={styles.data}>
                  <Text style={styles.title}>{value.title}</Text>
                  <Text style={styles.duration}>
                    Trajanje: {value.duration} minuta
                  </Text>
                  <Text style={styles.price}>Cena: {value.price} RSD</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default MenuServices;

const styles = StyleSheet.create({

  container: {
    flex: 0,
    padding: 5,
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

  wrapper: {
    display: "flex",
    width: "100%",
    borderRadius: 20,
    padding: 10,
    overflowY:'scroll'
  },

  image: {
    width: 70,
    height: 70,
    overflow: "hidden",
    backgroundColor: "white",
    display: "flex",
  },
  content: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    borderRadius: 20,
    padding: 10,
    gap: 20,
  },
  data: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: 18,
    fontWeight: "900",
  },
  duration: {
    fontSize: 18,
  },
  price: {
    fontSize: 18,
  },
});
