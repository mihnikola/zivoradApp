import React from "react";
import { View } from "react-native";
import DetailsServices from "./DetailsServices";
import DetailsEmployer from "./DetailsEmployer";

// Define the types for employer and service objects
interface Employer {
  // Define properties of employer here (example)
  name: string;
  position: string;
}

interface Service {
  // Define properties of service here (example)
  serviceName: string;
  description: string;
}

// Define the props for the Details component
interface DetailsProp {
  data: {
    employer: Employer;
    service: Service;
  };
}

const Details: React.FC<DetailsProp> = ({ data }) => {
  const { employer, service } = data;

  return (
    <View style={{ display: "flex", flexDirection: "column" }}>
      <DetailsEmployer data={employer} />
      <DetailsServices data={service} />
    </View>
  );
};

export default Details;
