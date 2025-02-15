import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { CONTACT_DATA } from "@/constants/index";

const ListAboutUs = () => {
  return (
    <>
      {CONTACT_DATA.map((item) => (
        <View key={item.id} style={styles.contactItem}>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20, // optional padding around the content
  },
  contactItem: {
    marginBottom: 20,
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  title: {
    fontSize: 20,
    color: "#ffffff",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});

export default ListAboutUs;
