import {
    ScrollView,
    Image,
    StyleSheet,
    View,
    TouchableOpacity,
  } from "react-native";
  import React from "react";
  import { Text } from "react-native";
  import { IconSymbol } from "@/components/ui/IconSymbol";
  import { useNavigation } from "@react-navigation/native";
import { EMPLOYEES_DATA } from "@/constants";
  
  const Services = () => {
    const navigation = useNavigation();
    return (
      <ScrollView style={styles.container}>
        <Image
          source={require("@/assets/images/coverImage.jpg")}
          style={styles.coverImage}
        />
        <Text style={styles.capture}>Odaberite frizera</Text>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          {EMPLOYEES_DATA.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => navigation.navigate("menuservices", { item })}
              style={styles.wrapper}
            >
              <View style={styles.content}>
                <Image source={item.image} style={styles.image} />
                <View style={styles.data}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.position}>{item.position}</Text>
                </View>
                <View style={{display: "flex", justifyContent: 'center'}}>
                  <IconSymbol size={28} name="arrow.right" color="#000" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  };
  
  export default Services;
  
  const styles = StyleSheet.create({
    wrapper: {
      display: "flex",
      width: "100%",
      borderRadius: 20,
      padding: 15,
      overflowY: "scroll",
    },
    coverImage: {
      width: "100%",
      height: 200,
      opacity: 0.2,
    },
    data: {
      display: "flex",
      justifyContent: "center",
      width: '55%',
    },
    image: {
      width: 70,
      height: 70,
      borderRadius: 70 / 2,
      overflow: "hidden",
  
  
    },
    name: {
      fontSize: 18,
    },
    position: {
      fontSize: 14,
      fontStyle: "italic",
      textAlign: 'left'
    },
    content: {
      backgroundColor: "white",
      display: "flex",
      flexDirection: "row",
      width: '100%',
      borderRadius: 20,
      padding: 10,
      gap: 20,
    },
    capture: {
      fontSize: 32,
      color: "grey",
      fontWeight: "900",
      textAlign: "center",
      margin: 5,
      fontStyle: "italic",
      position: "absolute",
      top: 150,
      left:60
    },
    container: {
      flex: 1,
    },
  });
  