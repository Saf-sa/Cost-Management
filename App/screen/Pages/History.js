import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  DatePickerIOS,
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

import axios from "axios";



export default  ViewAll = ({route}) => {
  const [storedExpenses, setStoredExpenses] = useState([]);// State to store data from AsyncStorage
    const [storedIncomes, setStoredIncomes] = useState([]);// State to store data from AsyncStorage

  const navigation = useNavigation();// Navigation

  const {category} = route.params;// Get category from MyIcomes.js  
  console.log('category from ViewExpenses ', category);
  
  useEffect(() => {// UseEffect to get data from AsyncStorage
    const getExpenses = async () => {
      try {
           const user = JSON.parse(await AsyncStorage.getItem("@storage_Key"));// Get user data from AsyncStorage
           console.log('user token ',user.token); 
        const { data } = await axios.get(
          
           /*  console.log('data ', data), */
          `http://localhost:5555/api/expenses/${category}`,// Get data in DB collection from backend in DB
                 /*    console.log('data category from backend  :', category), */
          {
            headers: {
              Authorization: `Bearer ${user.token}`,// Send token to backend
            },
            
          }
        );
         // Stocker les données récupérées dans AsyncStorage
       await AsyncStorage.setItem('expenses', JSON.stringify(data));// Store data in AsyncStorage
         /*      console.log('data received from Backend ',data);  */

        //await AsyncStorage.clear('expenses')

        const expenses = await AsyncStorage.getItem('expenses');// Get data from AsyncStorage
        if (expenses) {
       const parsedExpenses = JSON.parse(expenses);// Parse data from AsyncStorage
          setStoredExpenses(parsedExpenses.expenses); // Send data to the state
               /*  console.log('parsedExpenses FrontEnd side ',parsedExpenses);   */
        }
      } catch (error) {// Error handling
        console.log(error);// Error handling
      }
    };

    const getIncomes = async () => {
      try {
           const user = JSON.parse(await AsyncStorage.getItem("@storage_Key"));// Get user data from AsyncStorage
           console.log('user token ',user.token); 
        const { data } = await axios.get(
          
           /*  console.log('data ', data), */
          `http://localhost:5555/api/incomes/${category}`,// Get data in DB collection from backend in DB
                 /*    console.log('data category from backend  :', category), */
          {
            headers: {
              Authorization: `Bearer ${user.token}`,// Send token to backend
            },
            
          }
        );
         // Stocker les données récupérées dans AsyncStorage
       await AsyncStorage.setItem('incomes', JSON.stringify(data));// Store data in AsyncStorage
         /*      console.log('data received from Backend ',data);  */

        //await AsyncStorage.clear('incomes')

        const incomes = await AsyncStorage.getItem('incomes');// Get data from AsyncStorage
        if (incomes) {
       const parsedIncomes = JSON.parse(incomes);// Parse data from AsyncStorage
          setStoredIncomes(parsedIncomes.incomes); // Send data to the state
               /*  console.log('parsedExpenses FrontEnd side ',parsedExpenses);   */
        }
      } catch (error) {// Error handling
        console.log(error);// Error handling
      }
    };
     getIncomes();
    getExpenses();// Call the function to get data from AsyncStorage
  }, []);

  
  const calculateTotalIncomes = storedIncomes.reduce((total, income) => total + Number(income.amount), 0);
  
  const calculateTotalExpenses = storedExpenses.reduce((total, expense) => total + Number( expense.amount), 0);

  const totalExpenseIncome = calculateTotalIncomes - calculateTotalExpenses;

  const storeAll = storedExpenses.concat(storedIncomes);

  let index = 1;// index for scrollview

  return (// Display data from AsyncStorage
     <ScrollView
     keyboardDismissMode="on-drag"// to dismiss the keyboard when the user drags the scroll view
      onscroll={(evt) =>  (index++)}// to get the index of the scrollview
      onScrollBeginDrag={(evt) => (index++)}// to get the index of the scrollview
      >
 <Screen2>
           {/* Button Start */}
      
        <UserNav 

        
          image={require("../../assets/iconPerson.png")}
    /> 
    
   
       
       <Text style={styles.textAmount}>Balance = +{totalExpenseIncome} € </Text>


    {storeAll.map((item, index) => (
  <View key={index} style={styles.expenseContainer}>
    <View style={styles.row}>
      <Text>Date : {item.date && !isNaN(Date.parse(item.date)) ? new Date(item.date).toISOString().split('T')[0] : 'Invalid date' }</Text>
      <Text>Categories : {item.categories.join(', ') }</Text>
    </View>
    <View style={styles.row}>
      <Text>Label : {item.label}</Text>
      <Text> Amount = {item.amount}</Text>
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
    borderWidth: 1,
    borderColor: "#E0AA3E",
    borderRadius: 10,
    padding: 12,
    marginBottom: 40,
    marginVertical: 8,
    backgroundColor: "#F7F7F7",
   
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 8,
    paddingBottom: 8,
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
    textAmount:{
      color: "#E0AA3E",
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center",
      top: -60,
    },
});

