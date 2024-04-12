
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView} from "react-native";
import CalendarPicker from 'react-native-calendar-picker';
import CustomButton from "../../../shared/components/ui/CustomButton";
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
   const [selectedDate, setSelectedDate] = useState(null);
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
              setFirstDurationValue(firstDurationValue);
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
      contractName: selectedContractName,
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

      const response = await axios.post(
        `http://localhost:5555/api/reminder`,
        formData,
        {
          headers: {
            authorization: `Bearer ${user.token}` 
          },
        } 
      );
      
      
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
const handleDateChange = (date) => {
  setSelectedStartDate(date);
  setSelectedDate(date.format('YYYY-MM-DD'));
};
const getCustomDateStyles = () => {
  let customDates = [];

  // Ajouter les dates de début à customDates
  storedReminder.forEach(reminder => {
    customDates.push({
      date: new Date(reminder.startDate),
      style: {backgroundColor: 'red'}, // Mettre la date en rouge
      textStyle: {color: 'white'}, // Texte en blanc pour le contraste
    });
  });

  // Ajouter les dates d'expiration à customDates
  storedReminder.forEach(reminder => {
    customDates.push({
      date: new Date(reminder.expireDate),
      style: {backgroundColor: 'red'}, // Mettre la date en rouge
      textStyle: {color: 'white'}, // Texte en blanc pour le contraste
    });
  });

  return customDates;
};
  return (
    
     <ScrollView style={styles.page}
     keyboardDismissMode="on-drag"// to dismiss the keyboard when the user drags the scroll view
      onscroll={(evt) =>  (index++)}// to get the index of the scrollview
      onScrollBeginDrag={(evt) => (index++)}// to get the index of the scrollview
      >

      <View style={styles.viewReminderButton}>
        <CustomButton
          onPress={() => navigation.navigate("AddReminder")}
          style={styles.button}
          buttonText={"New Reminder"}
      />
        </View>
        
    <View style={styles.container}>
  <CalendarPicker onDateChange={handleDateChange} 
  customDatesStyles={getCustomDateStyles()} 
  />
  <StatusBar style="auto" />
  {storedReminder.map((reminder, index) => (
    <View 
      key={index} 
      style={[
        styles.row, 
        {borderColor: selectedDate && new Date(reminder.startDate).toISOString().split('T')[0] === selectedDate ? 'green' : '#E0AA3E'}
      ]}
    >
      <View>
        <Text>Contract : {reminder.contractName}</Text>
        <Text style={{color: new Date(reminder.startDate).toISOString().split('T')[0] === selectedDate ? 'red' : 'black'}}>
          Start Date : {reminder.startDate && !isNaN(Date.parse(reminder.startDate)) ? new Date(reminder.startDate).toISOString().split('T')[0] : 'Invalid date'}
        </Text>
        <Text>Email : {reminder.email}</Text>
      </View>
      <View /* style={styles.rowItem} */>
        <Text>Label : {reminder.label}</Text>
        <Text>Expired Date : {reminder.expireDate && !isNaN(Date.parse(reminder.expireDate)) ? new Date(reminder.expireDate).toISOString().split('T')[0] : 'Invalid date'}</Text>
        <Text>Renewal every : {reminder.renewal}</Text>
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
    marginTop: 70,
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
    padding: 10,
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
  
  textButton:{
      color: "#E0AA3E",
      fontWeight: "bold",
      fontSize: 15,
      textAlign: "center",
      
    },

  viewReminderButton: {
      position: "absolute",
      alignSelf: "center",
      alignItems  : "center",
      marginTop: 20,
  },

});