import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageSourcePropType,
} from "react-native";

interface DetailsEmployerProps {
  data: {
    image: ImageSourcePropType;
    name: string;
    position: string;
  };
}

const DetailsEmployer: React.FC<DetailsEmployerProps> = ({ data }) => {
  const { image, name, position } = data;
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={image} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.position}>{position}</Text>
      </View>
    </View>
  );
};

export default DetailsEmployer;

const styles = StyleSheet.create({
  info: {
    display: "flex",
    padding: 10,
  },
  container: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 20,
  },
  name: {
    fontSize: 16,
    color: "#ffffff",
  },
  position: {
    fontSize: 16,
    color: "grey",
    fontStyle: "italic",
  },
});
