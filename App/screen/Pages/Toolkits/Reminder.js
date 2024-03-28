
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity,} from "react-native";
import CalendarPicker from 'react-native-calendar-picker';
import CustomInputSingup from "../../../shared/components/ui/CustomInputSignup";
import CustomButton from "../../../shared/components/ui/CustomButton";
import { SelectList } from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import Calendar from 'expo-calendar';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

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


export default function Reminder() {
  const navigation = useNavigation();
  const [formErrors, setFormErrors] = useState({});
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selecteExpireDate, setSelecteExpireDate] = useState(null);
  const [selectedContractName, setSelecteContractName] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedRenewal, setselectedRenewal] = useState([]);
  const startDate = selectedStartDate  ? selectedStartDate.format('YYYY-MM-DD').toString() : '';
  const expireDate = selecteExpireDate ? selecteExpireDate.format('YYYY-MM-DD').toString() : '';
  const [storedReminder, setStoredReminder] = useState([]);// State to store data from AsyncStorage
const [firstDurationValue, setFirstDurationValue] = useState(null);


  
  useEffect(() => {// UseEffect to get data from AsyncStorage
    const getReminder = async () => {
      try {
           const user = JSON.parse(await AsyncStorage.getItem("@storage_Key"));// Get user data from AsyncStorage
         console.log('user token ',user.token);  
        const { data } = await axios.get(
          
         /*  console.log('data ', data) */
          `http://localhost:5555/api/reminder/`,// Get data in DB collection from backend in DB
                 
          {
            headers: {
              Authorization: `Bearer ${user.token}`,// Send token to backend
            },
            
          }
        );
         // Stocker les données récupérées dans AsyncStorage
       await AsyncStorage.setItem('reminders', JSON.stringify(data));// Store data in AsyncStorage
           console.log('data received from Backend ',data); 

        //await AsyncStorage.clear('reminders')

        const reminders = await AsyncStorage.getItem('reminders');// Get data from AsyncStorage
        console.log("Données récupérées d'AsyncStorage :", reminders);
        if (reminders) {
       const parsedReminders = JSON.parse(reminders);// Parse data from AsyncStorage
          setStoredReminder(parsedReminders.reminders); // Send data to the state
            console.log('parsedReminders FrontEnd side ',parsedReminders);  

          parsedReminders.reminders.forEach(reminder => {
       const [firstDurationValue] = reminder.duration;
       firstDurationValue(firstDurationValue);
    console.log(firstDurationValue); // This will log the first value of duration for each reminder
  });
}
      } catch (error) {// Error handling
        console.log(error);// Error handling
      }
    };
    getReminder();// Call the function to get data from AsyncStorage
  }, []);

  const handleSubmit = async () => {
    
    const formData = {

      startDate: selectedStartDate,
      expireDate: selecteExpireDate,
      contractName: selectedName,
      label: selectedLabel,
      email : selectedEmail,
      renewal: selectedRenewal,
    };
 

    // Validation des champs
   

   /*  console.log("formData", formData); */
  try {
        // Récupérer les données de l'utilisateur à partir de AsyncStorage
      const user = JSON.parse(await AsyncStorage.getItem("@storage_Key"));
      // await AsyncStorage.setItem("@storage_Key", jsonValue);

/*       console.log("149 get user Token from storage_Key ", user); */
      /*  console.log("150 response.data", user.id); */
      const response = await axios.get(
        `http://localhost:5555/api/reminder`,
        formData,
        {
          headers: {
            authorization: `Bearer ${user.token}` 
          },
        } 
      );

     
    console.log('data get BE',response.data);
      
      
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "reminder created successfully",
        visibilityTime: 3000,
        autoHide: true,
      });
      setTimeout(() => {
        navigation.navigate("Reminder");
      }, 3000);
    } catch (err) {
   /*    console.log("Test Reminder", err.response.data); */
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

const getAppointmentsForDate = async (date) => {
  try {
    const user = JSON.parse(await AsyncStorage.getItem("@storage_Key"));
    const { data } = await axios.get(
      `http://localhost:5555/api/reminder/${date}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    setRemindData(data);
  } catch (error) {
    console.log(error);
  }
};
let index = 1;// index for scrollview

  return (
    
     <ScrollView style={styles.page}
     keyboardDismissMode="on-drag"// to dismiss the keyboard when the user drags the scroll view
      onscroll={(evt) =>  (index++)}// to get the index of the scrollview
      onScrollBeginDrag={(evt) => (index++)}// to get the index of the scrollview
      >
    <TouchableOpacity style={styles.button} // Button to add a new expense
     
     onPress={() => navigation.navigate("AddReminder")}>
        <Text style={styles.textButton}>Add REminder</Text>
      </TouchableOpacity>
    <View style={styles.container}>
      <CalendarPicker onDateChange={setSelectedStartDate} />
      <StatusBar style="auto" />
{storedReminder.map((reminder, index) => (
  <View key={index} style={styles.row}>
    <View style={styles.rowItem}>
      
      <Text>Start Date : {reminder.startDate && !isNaN(Date.parse(reminder.startDate)) ? new Date(reminder.startDate).toISOString().split('T')[0] : 'Invalid date'}</Text>
      <Text>Email : {reminder.email}</Text>
      <Text>Renewal : {reminder.renewal}</Text>
    </View>
    <View style={styles.rowItem}>
      <Text>Expired Date : {reminder.expireDate && !isNaN(Date.parse(reminder.expireDate)) ? new Date(reminder.expireDate).toISOString().split('T')[0] : 'Invalid date'}</Text>
      <Text>Contract Name : {reminder.contractName}</Text>
      <Text>Label : {reminder.label}</Text>
    </View>
  </View>
))}
 </View> 
        
     

    </ScrollView>
  );
}

const styles = StyleSheet.create({
page: {
    flex: 1,
     backgroundColor: "#F8F4D7",
  },
  container: {
    flex: 1,
     backgroundColor: "#F8F4D7",
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    marginTop: 20,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
        width: "110%",
    borderWidth: 1,
    borderColor: "#E0AA3E",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
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
  
     button: {
    position: "fixed",
    borderColor: "#E0AA3E",
    borderWidth: 1,
    width: "29%",
    height: 45,
    alignSelf: "center",
    borderRadius: 8,
    padding: 12,
    textAlign: "center",
    top: 20,
    
  },
      textButton:{
      color: "#E0AA3E",
      fontWeight: "bold",
      fontSize: 15,
      textAlign: "center",
      
    },

});