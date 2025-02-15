import React, { useContext, useEffect, useState } from "react";
import { CalendarList, LocaleConfig, DateData } from "react-native-calendars";
import Summary from "@/shared-components/Summary";
import ReservationContext from "@/context/ReservationContext";
import { View } from "react-native";
import Details from "@/shared-components/Details";
import NotSummary from "@/shared-components/NotSummary";
import FlatButton from "@/shared-components/Button";
import { useNavigation } from "@react-navigation/native";
import { getStorage } from "@/helpers";
import LoginScreen from "./login";

// Set up locale for Serbian language
LocaleConfig.locales["srb"] = {
  monthNames: [
    "Januar",
    "Februar",
    "Mart",
    "April",
    "Maj",
    "Jun",
    "Jul",
    "Avgust",
    "Septembar",
    "Octobar",
    "Novembar",
    "Decembar",
  ],
  dayNames: [
    "Nedelja",
    "Ponedeljak",
    "Utorak",
    "Sreda",
    "Cetvrtak",
    "Petak",
    "Subota",
  ],
  dayNamesShort: ["Ned", "Pon", "Uto", "Sre", "Cet", "Pet", "Sub"],
};
LocaleConfig.defaultLocale = "srb";



const DateReservation: React.FC = () => {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState<number>(1);
  const { reservation, updateReservation } = useContext(ReservationContext)!; // Access context  const route = useRoute();
  const navigation = useNavigation();
  const [tokenStorage,setTokenStorage] = useState(null);
  // Format the current date
  const formattedDate = currentDate.toISOString()?.split("T")[0];

  // Function to check if the date is Sunday
  const isSunday = (date: string): boolean => {
    const dayOfWeek = new Date(date).getDay(); // getDay() returns 0 for Sunday
    return dayOfWeek === 0;
  };

  // Generate markedDates object
  const markedDates: {
    [key: string]: {
      disabled?: boolean;
      selected?: boolean;
      selectedColor?: string;
    };
  } = {};
  const currentMonth = new Date().getMonth() + selectedMonths; // Get the current month
  const currentYear = new Date().getFullYear(); // Get the current year

  // Populate markedDates for the current month (31 days max in a month)
  for (let i = 1; i <= 31; i++) {
    const dateString = `${currentYear}-${
      currentMonth < 10 ? `0${currentMonth}` : currentMonth
    }-${i < 10 ? `0${i}` : i}`;

    if (isSunday(dateString)) {
      markedDates[dateString] = { disabled: true }; // Disable Sundays
    } else if (dateString === selectedDate) {
      markedDates[dateString] = { selected: true, selectedColor: "white" }; // Highlight selected date
    }
  }

  // Handle day press to select a date
  const handleDayPress = (day: DateData): void => {
    if (!isSunday(day.dateString)) {
      setSelectedDate(day.dateString); // Update the selected date
    }
  };

  const reportHandler = () => {
    updateReservation({ ...reservation, dateData: { selectedDate } });
    navigation.navigate("reservation");
  };

  useEffect(() => {
    getStorage()
      .then((res) => {
        if (res) {
          setTokenStorage(res);
        } else {
          navigation.navigate("login");

        }
      })
      .catch((error) => console.log("error", error));
  }, []);

  console.log("tokenStorage",tokenStorage);

  if(tokenStorage){
  return (
    <View style={{ display: "flex", flexDirection: "column" }}>
      <View style={{ display: "flex", width: "auto" }}>
        <CalendarList
          style={{
            borderWidth: 1,
            borderColor: "gray",
            backgroundColor: "transparent",
            display: "flex",
            width: "100%",
          }}
          theme={{
            monthTextColor: "white",
            backgroundColor: "white",
            calendarBackground: "black",
            textSectionTitleColor: "white",
            selectedDayBackgroundColor: "white",
            selectedDayTextColor: "black",
            todayTextColor: "white",
            dayTextColor: "white",
            textMonthFontWeight: "bold",
            textDisabledColor: "grey",
          }}
          onVisibleMonthsChange={(months) => setSelectedMonths(months[0].month)}
          current={formattedDate}
          futureScrollRange={2}
          markedDates={markedDates}
          onDayPress={handleDayPress}
          showScrollIndicator={true}
          pastScrollRange={0}
          horizontal={true}
          pagingEnabled={true}
          minDate={formattedDate}
          hideExtraDays={true}
        />
      </View>
      <View style={{ display: "flex" }}>
        {selectedDate ? <Summary /> : <NotSummary />}
        {reservation && <Details data={reservation} />}
      </View>
      <View style={{ marginTop: 20 }}>
        <FlatButton text="Nastavi" onPress={reportHandler} />
      </View>
    </View>
  );
  }
  if(!tokenStorage){
    <LoginScreen />
  }
};

export default DateReservation;
