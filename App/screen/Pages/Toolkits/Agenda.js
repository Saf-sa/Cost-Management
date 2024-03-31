
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView,} from "react-native";
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


export default function Agenda() {
  const navigation = useNavigation();
  const [formErrors, setFormErrors] = useState({});
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [selectedDuration, setSelectedDuration] = useState('');
  const startDate = selectedStartDate
    ? selectedStartDate.format('YYYY-MM-DD').toString() : '';
  const [storedAgenda, setStoredAgenda] = useState([]);// State to store data from AsyncStorage
  const [firstDurationValue, setFirstDurationValue] = useState(null);

  
  useEffect(() => {// UseEffect to get data from AsyncStorage
    const getAgendas = async () => {
      try {
           const user = JSON.parse(await AsyncStorage.getItem("@storage_Key"));// Get user data from AsyncStorage
         console.log('user token ',user.token);  
        const { data } = await axios.get(
          
         /*  console.log('data ', data) */
          `http://localhost:5555/api/agenda/`,// Get data in DB collection from backend in DB
                 /*    console.log('data category from backend  :', category), */
          {
            headers: {
              Authorization: `Bearer ${user.token}`,// Send token to backend
            },
            
          }
        );
         // Stocker les données récupérées dans AsyncStorage
       await AsyncStorage.setItem('agendas', JSON.stringify(data));// Store data in AsyncStorage
           console.log('data received from Backend ',data); 

        //await AsyncStorage.clear('agendas')

        const agendas = await AsyncStorage.getItem('agendas');// Get data from AsyncStorage
        if (agendas) {
       const parsedAgendas = JSON.parse(agendas);// Parse data from AsyncStorage
          setStoredAgenda(parsedAgendas.agendas); // Send data to the state
            console.log('parsedAgendas FrontEnd side ',parsedAgendas);  

          parsedAgendas.agendas.forEach(agenda => {
       const [firstDurationValue] = agenda.duration;
       setFirstDurationValue(firstDurationValue);
    console.log(firstDurationValue); // This will log the first value of duration for each agenda
  });
}

      } catch (error) {// Error handling
        console.log(error);// Error handling
      }
    };
    getAgendas();// Call the function to get data from AsyncStorage
  }, []);

  const handleSubmit = async () => {
    
    const formData = {

      date: selectedStartDate,
      name: selectedName,
      place: selectedPlace,
      duration: firstDurationValue,
     
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
        `http://localhost:5555/api/agenda`,
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

const getAppointmentsForDate = async (date) => {
  try {
    const user = JSON.parse(await AsyncStorage.getItem("@storage_Key"));
    const { data } = await axios.get(
      `http://localhost:5555/api/agenda/${date}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    setAppointments(data);
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
  return storedAgenda.map(agenda => {
    return {
      date: new Date(agenda.date),
      style: {backgroundColor: 'red'}, // Mettre la date en rouge
      textStyle: {color: 'white'}, // Texte en blanc pour le contraste
    };
  });
};


  return (
    
  <ScrollView style={styles.page}
  keyboardDismissMode="on-drag"
  onScroll={(evt) =>  (index++)}
  onScrollBeginDrag={(evt) => (index++)}
>
  
  <View style={styles.viewAgendaButton}>
    <CustomButton
      onPress={() => navigation.navigate("AddAgenda")}
      style={styles.button}
      buttonText={"Add new Agenda"}
    />
  </View>

  <View style={styles.container}>
    <CalendarPicker 
      onDateChange={handleDateChange}
      customDatesStyles={getCustomDateStyles()} 
    />
    <StatusBar style="auto" />
    {storedAgenda.map((agenda, index) => (
      <View 
        key={index} 
        style={[
          styles.row, 
{borderColor: selectedDate && new Date(agenda.date).toISOString().split('T')[0] === selectedDate ? 'green' : '#E0AA3E'}        ]}
      >
        <View>
          
          <Text>Name : {agenda.name}</Text>
          <Text style={{color: new Date(agenda.date).toISOString().split('T')[0] === selectedDate ? 'green' : 'black'}}>
            Date : {agenda.date && !isNaN(Date.parse(agenda.date)) ? new Date(agenda.date).toISOString().split('T')[0] : 'Invalid date'}
          </Text>
        </View>
        <View /* style={styles.rowItem} */>
          <Text>Duration : {Array.isArray(agenda.duration) ? agenda.duration.join(', ') : agenda.duration}</Text>
          <Text>Place : {agenda.place}</Text>
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
    rowItem: {
    flex: 1,
    
    position: 'absolute',
    flexDirection: 'column',
    marginLeft: 250,
   
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
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

    viewAgendaButton: {
      position: "absolute",
      alignSelf: "center",
      alignItems  : "center",
      marginTop: 20,
  },

});