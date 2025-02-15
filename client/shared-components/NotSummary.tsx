import { Text, View } from "react-native";

const NotSummary = () => {
  return (
    <View style={{ borderWidth: 20 }}>
      <Text
        style={{
          fontSize: 20,
          color: "white",
          textAlign: "center",
          padding: 20,
          borderColor: "grey",
          borderWidth: 1,
          borderRadius: 20,
        }}
      >
        Rezervišite Vaš termin
      </Text>
    </View>
  );
};

export default NotSummary;
