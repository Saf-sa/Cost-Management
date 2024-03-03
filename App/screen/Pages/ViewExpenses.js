import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import UserNav from "../nav/UserNav";
import Screen2 from "../../shared/components/Screen";

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "axios";
/*  import { REACT_APP_BE_URL } from "../../.env"; */


// comment this line because solution not found if using .env file
// go to ligne 84
//import { API_URL, API_TOKEN } from "@env";
/*  import { REACT_APP_BE_URL } from "../../.env";  */



const ViewExpenses = ({route}) => {
  const [storedExpenses, setStoredExpenses] = useState([]);// State to store data from AsyncStorage
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
    getExpenses();// Call the function to get data from AsyncStorage
  }, []);

  const calculateTotalExpenses = storedExpenses.reduce((total, expense) => total + Number(expense.amount), 0);

let index = 1;// index for scrollview

  return (// Display data from AsyncStorage
     <ScrollView style={styles.page}
     keyboardDismissMode="on-drag"// to dismiss the keyboard when the user drags the scroll view
      onscroll={(evt) =>  (index++)}// to get the index of the scrollview
      onScrollBeginDrag={(evt) => (index++)}// to get the index of the scrollview
      >
         <View >
 <Screen2>
           {/* Button Start */}
      
        <UserNav 

        
          image={require("../../assets/iconPerson.png")}
    /> 
    
     <TouchableOpacity style={styles.button} // Button to add a new expense
     
     onPress={() => navigation.navigate("MyExpenses")}>
        <Text style={styles.textButton}>Add new Expense</Text>
      </TouchableOpacity>
       
       <Text style={styles.textAmount}>Total Expenses = - {calculateTotalExpenses} € </Text>
      
    {storedExpenses.map((expense, index) => (// Display data from AsyncStorage in a FlatList
      /* console.log('storedExpenses ', storedExpenses), */
      <View key={index} style={styles.expenseContainer}>

         
        <View style={styles.row}>
          <Text>Date : {expense.date && !isNaN(Date.parse(expense.date)) ? new Date(expense.date).toISOString().split('T')[0] : 'Invalid date'}</Text>
          <Text>Categories : {expense.categories.join(', ')}</Text>
        </View>
        <View style={styles.row}>
          <Text>Label : {expense.label}</Text>
          <Text style={{ color: "red"}}>Amount = - {expense.amount}</Text>
        </View>
      </View>
       
    ))}
    </Screen2>
    </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
      page: {
    flex: 1,
    height: "100vh",
backgroundColor: "#F8F4D7",
  },
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
      color: "red",
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center",
      top: -60,
    },
});

export default ViewExpenses;