
import { StatusBar } from 'expo-status-bar';
import React, { useState,  } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import CalendarPicker from 'react-native-calendar-picker';
import DatePicker from 'react-native-date-picker'
import  {Calendar} from 'expo-calendar';
import CustomInputSingup from "../../../shared/components/ui/CustomInputSignup";
import CustomButton from "../../../shared/components/ui/CustomButton";


async function getDefaultCalendarSource() {
  const calendars = await Calendar.getCalendarsAsync(
    Calendar.EntityTypes.EVENT
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
  console.log(`Your new calendar ID is: ${newCalendarID}`);
  return newCalendarID;
}

export default function Reminder() {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedEndtDate, setselectedEndDate] = useState("");
  const [contractNameText, setcontractNameText] = useState('');

  const startDate = selectedStartDate
    ? selectedStartDate.format('YYYY-MM-DD').toString()
    : '';

     const endDate = selectedEndtDate
    ? selectedStartDate.format('YYYY-MM-DD').toString()
    : '';

    const email = selectedEmail;


    const name = contractNameText;

  const navigation = useNavigation();

  return (
    
    <View style={styles.container}>
    
        <CalendarPicker onDateChange={setSelectedStartDate } />
      <StatusBar style="auto" />
      
         <CustomInputSingup
        onChangeText={setSelectedStartDate}
        value={startDate}
        placeholder="Enter the name of your Contract"
        style={styles.input}
      />
          <CustomInputSingup
          onDateChange={setSelectedEndDate}
       
        value={endDate}
        placeholder=" Enter new contract start date"
        style={styles.input}
      />
       <CustomInputSingup
        onChangeText={setSelectedEndDate}
        value={endDate}
        placeholder="Enter new contract expire date"

        style={styles.input}
      />

          <CustomInputSingup style={styles.LastInput}
        onChangeText={setSelectedEmail}
        value={selectedEmail}
        placeholder=" Enter email of your Contract"


      />
  
       <CustomButton
          style={styles.button}
          buttonText={"New Reminder"}
          onPress={() => navigation.navigate("AddReminder")}
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
    padding: 20,
    paddingBottom: 50,
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