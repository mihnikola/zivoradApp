import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Platform,
  Button,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  TouchableHighlight,
} from "react-native";
import * as Notifications from "expo-notifications";
import {
  getExpoPushTokenAsync,
  requestPermissionsAsync,
} from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import { createOpenLink } from "react-native-open-maps";
import FlatButton from "@/shared-components/Button";
import AboutUsInfo from "@/components/AboutUsInfo";
import ListAboutUs from "@/components/ListAboutUs";
import OnboardingComponent from "@/components/OnboardingComponent";
import Storage from "expo-storage";
import { getStorage, removeStorage } from "@/helpers";

// Handle background notifications using Expo's background handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

Notifications.addNotificationReceivedListener((notification) => {
  console.log("Background notification received:", notification);
  // Handle the background notification
});

const yosemite = { latitude: 43.724943, longitude: 20.6952 };

export default function HomeScreen() {
  const navigation = useNavigation();
  const openYosemite = createOpenLink(yosemite);
  const openYosemiteZoomedOut = createOpenLink({ ...openYosemite, zoom: 300 });

  const nextPage = () => {
    console.log("Next page clicked");
    navigation.navigate("(tabs)", { screen: "services" });
  };

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [message, setMessage] = useState("");



  // useEffect(() => {
  //   const getPushToken = async () => {
  //     // Request permission for notifications
  //     const { status } = await requestPermissionsAsync();

  //     if (status === "granted") {

  //       // Get the Expo Push Token (which is equivalent to FCM Token in this case)
  //       const token = await getExpoPushTokenAsync();
  //       setExpoPushToken(token.data);
  //       console.log("Expo Push Token:", token.data);

  //       // Optionally, send this token to your backend (Node.js)
  //       sendTokenToServer(token.data);

  //     }
  //   };

  //   getPushToken();

  //   const notificationListener = Notifications.addNotificationReceivedListener(notification => {

  //     console.log("object",notification)
  //     setNotification(notification);
  //   });

  //   const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
  //     console.log(response);
  //     setNotification(notification);

  //   });

  //   // Clean up the listeners when the component is unmounted
  //   return () => {
  //     notificationListener.remove();
  //     responseListener.remove();
  //   };
  // }, []);

  // Send the push token to your server (Node.js backend)
  // const sendTokenToServer = async (token) => {
  //   try {
  //     await fetch("http://192.168.8.121:5000/api/save-token", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ token }),
  //     });
  //     console.log("sendTokenToServer");
  //   } catch (error) {
  //     console.error("Error sending token to server:", error);
  //   }
  // };

  // Function to send the notification
  //  const sendNotificationHandler = async () => {
  //   try {
  //     // Make a POST request to your API
  //     const response = await fetch('http://192.168.8.121:5000/api/send-notification', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ message: message }), // Sending the message as JSON
  //     });

  //     if (response.ok) {
  //       console.log('Notification sent successfully');
  //       alert('Notification sent successfully');
  //     } else {
  //       console.error('Failed to send notification');
  //       alert('Failed to send notification');
  //     }
  //   } catch (error) {
  //     console.error('Error sending notification:', error);
  //     alert('Error sending notification');
  //   }
  // };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("@/assets/images/logoImage.png")}
        style={styles.reactLogo}
      />
      <View style={styles.contentBtn}>
        <FlatButton text="rezerviši" onPress={nextPage} />
      </View>
      <AboutUsInfo />
      <View style={styles.content}>
        <ListAboutUs />
      </View>
      <View style={styles.reviewContent}>
        <Text style={styles.reviewCapture}> Recenzije </Text>
        <OnboardingComponent />
      </View>

      <View style={styles.content}>
        <Text style={styles.reviewCapture}>Poseti nas</Text>
        <Text style={styles.text}>Ponedeljak - Petak (09:00 - 18:00)</Text>
        <Text style={styles.text}>Subotom (10:00 - 17:00)</Text>
        <Text style={styles.text}>Nedeljom Ne Radimo</Text>
      </View>

      <View style={styles.mapContainer}>
        <Text style={styles.mapCapture}> Lokacija </Text>
        <TouchableHighlight onPress={openYosemiteZoomedOut}>
          <Image
            source={require("../../assets/images/mapimage.jpg")}
            style={styles.mapImage}
          />
        </TouchableHighlight>
      </View>
      {/* 
    <View
      style={{
        marginTop: 200,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white" }}>
        Your Expo Push Token (FCM Token): {expoPushToken}
      </Text>
      <Button onPress={sendNotificationHandler} title="SEND A NOTIFICATION" />
      <TextInput
        style={styles.input}
        placeholder="Enter your message"
        value={message}
        onChangeText={setMessage}
      />
      {notification ? (
        <Text style={{ color: "white" }}>
          {" "}
          {notification.request.content.body}
        </Text>
      ) : (
        <Text style={{ marginTop: 200, color: "white" }}>alooo</Text>
      )}
    </View>
*/}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: "white",
    color: "black",
  },
  mapImage: {
    width: 400,
    height: 200,
  },
  mapContainer: {
    flex: 3,
  },
  map: {
    width: 500,
    height: 200,
    marginBottom: 20,
    marginTop: 10,
  },
  reactLogo: {
    height: 300,
    width: 320,
    margin: "auto",
    marginTop: 40,
  },
  reviewContent: {
    margin: 0,
  },
  mapCapture: {
    color: "#ffffff",
    fontSize: 40,
    marginBottom: 10,
    marginTop: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    fontSize: 20,
    color: "#ffff",
    margin: 5,
  },
  reviewCapture: {
    color: "#ffffff",
    fontSize: 40,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  aboutUs: {
    flexGrow: 1,
  },
  item: {
    backgroundColor: "#f9c2ff",
    color: "#ffff",
  },
  itemText: {
    backgroundColor: "#f9c2ff",
    color: "#ffff",
  },
  content: {
    flexGrow: 2,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    backgroundColor: "black",
  },
  contentBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#000000",
  },
  container: {
    flex: 1,
  },
});
