
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,} from "react-native";
import CalendarPicker from 'react-native-calendar-picker';
import CustomInputSingup from "../../../shared/components/ui/CustomInputSignup";
import CustomButton from "../../../shared/components/ui/CustomButton";
import { SelectList } from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import Calendar from 'expo-calendar';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

const isValidDate = (date) => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
  return regex.test(date);
};

const isValidName = (name) => {
  return name !== '';
};

const isValidPlace = (place) => {
  return place !== '';
};

const isValidDuration = (duration) => {
  return !isNaN(duration);
};

async function getDefaultCalendarSource() {
  const calendars = await Calendar.getCalendarsAsync(
    calendars.EntityTypes.EVENT
  );
  const defaultCalendars = calendars.filter(
    (each) => each.source.name === 'Default'
  );
  return defaultCalendars.length
    ? defaultCalendars[0].source
    : calendars[0].source;
}

async function createCalendar() {
  const defaultCalendarSource =
    Platform.OS === 'ios'
      ? await getDefaultCalendarSource()
      : { isLocalAccount: true, name: 'My Calendar' };
  const newCalendarID = await Calendar.createCalendarAsync({
    title: 'My Calendar',
    color: 'blue',
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource,
    name: 'internalCalendarName',
    ownerAccount: 'personal',
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  });
/*   console.log(`Your new calendar ID is: ${newCalendarID}`); */
  return newCalendarID;
}




export default function Agenda() {
  const navigation = useNavigation();
  const [formErrors, setFormErrors] = useState({});
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [selectedDuration, setSelectedDuration] = useState('');
  const startDate = selectedStartDate
    ? selectedStartDate.format('YYYY-MM-DD').toString()
    : '';


  const handleSubmit = async () => {
    
    const formData = {

      date: selectedStartDate,
      name: selectedName,
      place: selectedPlace,
      duration: selectedDuration,
     
    };
 

    // Validation des champs
    if (!isValidDate(formData.date)) {
      updateError(
        "date",
        !isValidDate(formData.date) ? "Please enter a valid date" : null
      );
    }

    if (!isValidName(formData.name)) {
      updateError(
        "name",
        !isValidName(formData.name)
          ? "Please choose a valid name"
          : null
      );
    }

    if (!isValidPlace(formData.place)) {
      updateError(
        "place",
        !isValidLabel(formData.place)
          ? "Please enter a place"
          : null
      );
    }

    if (!isValidDuration(formData.duration)) {
      updateError(
        "duration",
        !isValidDuration(formData.duration)
          ? "Please enter a valid duration"
          : null
      );
    }

   /*  console.log("formData", formData); */
  try {
        // Récupérer les données de l'utilisateur à partir de AsyncStorage
      const user = JSON.parse(await AsyncStorage.getItem("@storage_Key"));
      // await AsyncStorage.setItem("@storage_Key", jsonValue);

/*       console.log("149 get user Token from storage_Key ", user); */
      /*  console.log("150 response.data", user.id); */
      const response = await axios.post(
        `http://localhost:5555/api/agenda`,
        formData,
        {
          headers: {
            authorization: `Bearer ${user.token}` 
          },
        } 
      );

     
     /*  console.log('data send to BE',response.data); */
      
      
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "agenda created successfully",
        visibilityTime: 3000,
        autoHide: true,
      });
      setTimeout(() => {
        navigation.navigate("Agenda");
      }, 3000);
    } catch (err) {
   /*    console.log("Test Agenda", err.response.data); */
      Toast.show({
        type: "error",
        position: "bottom",
        text1: err.response.data.message,
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };

  const updateError = (type, errorMessage) => {
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      [type]: errorMessage,
    }));
  };



  return (
    <View style={styles.container}>
      <CalendarPicker onDateChange={setSelectedStartDate} />
      <StatusBar style="auto" />
          <CustomInputSingup
        value={startDate} // use startDate here
        placeholder=" date of your appointmernt"
        style={styles.input}
      />
      <CustomInputSingup
        onChangeText={setSelectedName}
        value={selectedName}
        placeholder="  name of your appointmernt"
        style={styles.input}
      />
  
      <CustomInputSingup
        onChangeText={setSelectedPlace}
        value={selectedPlace}
        placeholder="  place of your appointmernt"
        style={styles.input}
      />
      <CustomInputSingup
        onChangeText={setSelectedDuration}
        value={selectedDuration}
        placeholder=" enter appointment duration"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} // Button to add a new expense
     
     onPress={() => navigation.navigate("AddAgenda")}>
        <Text style={styles.textButton}>Add new Rdv</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
     backgroundColor: "#F8F4D7",
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },

  input: {
    height: 50,
    margin: 12,
    width: 300,
    borderWidth: 1,
    borderRadius: 10,
  },
  dateText: {
    margin: 16,
  },

});