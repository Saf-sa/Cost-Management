import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  DatePickerIOS,
  ScrollView,
  FlatList
} from "react-native";
import React, { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import AuthHeader from "../../shared/components/AuthHeader";
import CustomInputSingup from "../../shared/components/ui/CustomInputSignup";
import CustomButton from "../../shared/components/ui/CustomButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "../../shared/components/IncomExpenseComponent/Icon";
import AppText from "../../shared/components/uiApp/AppText";
import UserNav from "../nav/UserNav";
import Screen2 from "../../shared/components/Screen";
import moment from "moment";
import AsyncStorage from '@react-native-async-storage/async-storage';
/*  import { REACT_APP_BE_URL } from "../../.env"; */
import axios from "axios";


// comment this line because solution not found if using .env file
// go to ligne 84
//import { API_URL, API_TOKEN } from "@env";
/*  import { REACT_APP_BE_URL } from "../../.env";  */

const ViewExpenses = ({route}) => {
 const [storedExpenses, setStoredExpenses] = useState([]);// State to store data from AsyncStorage
  const navigation = useNavigation();// Navigation

  const {category} = route.params;// Get category from MyExpenses.js

  useEffect(() => {
    const getExpenses = async () => {
      try {
        const user = JSON.parse(await AsyncStorage.getItem("@storage_Key"));// Get user data from AsyncStorage
        const { data } = await axios.get(
          `http://localhost:5555/api/expenses/${category}`,// Get data in DB collection from backend in DB
          {
            headers: {
              Authorization: `Bearer ${user.token}`,// Send token to backend
            },
          }
        );
        // Stocker les données récupérées dans AsyncStorage
       await AsyncStorage.setItem('expenses', JSON.stringify(data));// Store data in AsyncStorage
   /*      console.log('data received from Backend ',data);  */
        
      const expenses = await AsyncStorage.getItem('expenses');// Get data from AsyncStorage
        if (expenses) {
          const parsedExpenses = JSON.parse(expenses);// Parse data from AsyncStorage
          setStoredExpenses(parsedExpenses.expenses); // Send data to the state
               /*  console.log('parsedExpenses FrontEnd side ',parsedExpenses);   */
        }
      } catch (error) {
        console.log(error);
      }
    };
    getExpenses();

  }, []);

let index = 1;

  return (
     <ScrollView
     keyboardDismissMode="on-drag"
      onscroll={(evt) =>  (index++)}
      onScrollBeginDrag={(evt) => (index++)}
      >
 <Screen2>
           {/* Button Start */}
      
        <UserNav 

        
          image={require("../../assets/iconPerson.png")}
    /> 
    
     <TouchableOpacity style={styles.button} 
     
      onPress={() => navigation.navigate("MyExpenses")}>
        <Text style={styles.textButton} >Add a new Expense</Text>
      </TouchableOpacity>
       
      
      {storedExpenses.map((expense, index) => (
         <View key={index} style={styles.expenseContainer}>

         
        <View style={styles.row}>
          <Text style={styles.text}>Date : {expense.date && !isNaN(Date.parse(expense.date)) ? new Date(expense.date).toISOString().split('T')[0] : 'Invalid date'}</Text>
          <Text style={styles.text}>Categories : {expense.categories.join(', ')}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Label : {expense.label}</Text>
          <Text style={styles.Amount}>Amount = - {expense.amount}</Text>
        </View>
      </View>
       
    ))}
    </Screen2>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  expenseContainer: {
    marginTop: -30,
    width: "96%",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#E0AA3E",
    borderRadius: 8,
    padding: 12,
    marginBottom: 38,
    marginVertical: 8,
    backgroundColor: "#F7F7F7",
   
  },

  row: {
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 1,
  },
  textLabel: {
    fontWeight: 'bold',
    marginBottom: 4,
    paddingRight: 8,
    paddingBottom: 8,
  },
  textValue: {
    marginBottom: 8,
  },

  button: {
    backgroundColor: {
      backgroundColor: "#fff",
      shadowColor: "#000",

    },

    position: "fixed",
    borderColor: "#E0AA3E",
    borderWidth: 1,
    width: "40%",
    height: 45,
    alignSelf: "center",
    borderRadius: 8,
    padding: 12,
    textAlign: "center",
    top: -80,
  },
    textButton:{
      
      color: "#E0AA3E",
      fontWeight: "bold",
      fontSize: 15,
      textAlign: "center",
      
      
      
    },
    


 
});

export default ViewExpenses;