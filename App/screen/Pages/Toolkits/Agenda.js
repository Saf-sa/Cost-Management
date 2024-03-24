
import { StatusBar } from 'expo-status-bar';
import React, { useState,  } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import CalendarPicker from 'react-native-calendar-picker';
import CustomInputSingup from "../../../shared/components/ui/CustomInputSignup";
import CustomButton from "../../../shared/components/ui/CustomButton";
import { SelectList } from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";



async function getDefaultCalendarSource() {
  const calendars = await calendars.getCalendarsAsync(
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

  
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [selectedDuration, setSelectedDuration] = useState('');

  const startDate = selectedStartDate
    ? selectedStartDate.format('YYYY-MM-DD').toString()
    : '';





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
      <CustomButton
        onPress={createCalendar}
        colors={["#f9f295", "#E0AA3E", "#F7EF8A", "#B88A44"]}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 1, y: 3 }}
        buttonText={"add Event"}
      />
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