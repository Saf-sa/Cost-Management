
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect,  } from 'react';
import { StyleSheet, Text, View, TextInput ,   ScrollView, } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import  {Calendar} from 'expo-calendar';
import AuthHeader from "../../../shared/components/AuthHeader";
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

export default function Agenda() {
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


  return (
    
    <View style={styles.container}>
    
        <CalendarPicker onDateChange={setSelectedStartDate} />
      <StatusBar style="auto" />
         <CustomInputSingup
        onChangeText={setcontractNameText}
        value={contractNameText}
        placeholder="           Enter the name of your Contract"
        style={styles.input}
      />
          <CustomInputSingup
        onChangeText={setSelectedStartDate}
        value={selectedStartDate}
        placeholder="           Enter new contract start date"
        style={styles.input}
      />
       <CustomInputSingup
        onChangeText={setSelectedEndDate}
        value={selectedEndDate}
        placeholder="           Enter new contract expire date"

        style={styles.input}
      />

          <CustomInputSingup
        onChangeText={setSelectedEmail}
        value={selectedEmail}
        placeholder="           Enter email of your Contract"

        style={styles.input}
      />
  
              <CustomButton
          onPress={createCalendar
          }
          style={styles.button}
          colors={["#f9f295", "#E0AA3E", "#F7EF8A", "#B88A44"]}
          start={{ x: 0.1, y: 0.1 }}
          end={{ x: 1, y: 3 }}
          buttonText={"add Event"}
        />
      
     
      
{/*         <Text style={styles.dateText}>contract Start: {startDate}</Text>
        <Text style={styles.endText}>contract End: {selectedEndDate}</Text>
        <Text style={styles.emailText}>contract Email: {selectedEmail}</Text> */}
    
       

     
    </View>
  
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 20,
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