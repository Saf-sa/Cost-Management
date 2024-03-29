import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import AppText from "../../shared/components/uiApp/AppText";
import UserNav from "../nav/UserNav";
import Screen2 from "../../shared/components/Screen";
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "axios";



export default  ViewAll = ({route}) => {
  const [storedExpenses, setStoredExpenses] = useState([]);// State to store data from AsyncStorage
    const [storedIncomes, setStoredIncomes] = useState([]);// State to store data from AsyncStorage


  const {category} = route.params;// Get category from MyIcomes.js  
/*   console.log('category from ViewExpenses ', category); */
  
  useEffect(() => {// UseEffect to get data from AsyncStorage
    const getExpenses = async () => {
      try {
           const user = JSON.parse(await AsyncStorage.getItem("@storage_Key"));// Get user data from AsyncStorage
          /*  console.log('user token ',user.token);  */
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
     /*    console.log(error);// Error handling */
      }
    };

    const getIncomes = async () => {
      try {
           const user = JSON.parse(await AsyncStorage.getItem("@storage_Key"));// Get user data from AsyncStorage
          /*  console.log('user token ',user.token);  */
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
        /* console.log(error);// Error handling */
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
          <View style={styles.page}>
 <Screen2 style={styles.nav}>
           {/* Button Start */}
      
        <UserNav 

        
          image={require("../../assets/iconPerson.png")}
    /> 
    
   
       
      <AppText
  style={{
    color: calculateTotalIncomes - calculateTotalExpenses >= 0 ?  "green" : "red",
    fontSize: 25, top: -70,
    
  }}
>
 Balance = { calculateTotalIncomes - calculateTotalExpenses >= 0 ? `+${calculateTotalIncomes - calculateTotalExpenses}` : `${calculateTotalIncomes - calculateTotalExpenses}` } € 
</AppText>


{storeAll.map((item, index) => (
  <View key={index} style={styles.expenseContainer}>
    <View style={styles.row}>
      <Text>Date : {item.date && !isNaN(Date.parse(item.date)) ? new Date(item.date).toISOString().split('T')[0] : 'Invalid date' }</Text>
      <Text>Categories : {item.categories.join(', ') }</Text>
    </View>
    <View style={styles.row}>
      <Text>Label : {item.label}</Text>
      <Text style={{color: storedExpenses.includes(item) ? 'red' : 'green'}}> Amount = {item.amount}</Text>
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
    backgroundColor: "#F8F4D7",
  },

  nav: {
    flex: 1,
    backgroundColor: "#F8F4D7",
   top: 10,
  },

  expenseContainer: {
    marginTop: -30,
    width: "96%",
    borderWidth: 1,
    borderColor: "#E0AA3E",
    borderRadius: 10,
    padding: 12,
    marginBottom: 40,
   
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },

  textLabel: {
    fontWeight: 'bold',
    marginBottom: 4,
    paddingRight: 8,
    paddingBottom: 8,
  },
  
    textButton:{
      color: "#E0AA3E",
      fontWeight: "bold",
      fontSize: 15,
      textAlign: "center",
    },

});

