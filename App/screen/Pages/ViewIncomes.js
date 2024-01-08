import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,

} from "react-native";
import React, { useState,  useEffect } from "react";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import UserNav from "../nav/UserNav";
import Screen2 from "../../shared/components/Screen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import MyIncomes from "./MyIncomes";

/*  import { REACT_APP_BE_URL } from "../../.env"; */


// comment this line because solution not found if using .env file
// go to ligne 84
//import { API_URL, API_TOKEN } from "@env";
/*  import { REACT_APP_BE_URL } from "../../.env";  */

const ViewIncomes = (route) => {
  const [storedIncomes, setStoredIncomes] = useState([]);// State to store data from AsyncStorage
  const navigation = useNavigation();// Navigation

/*   const {category} = route.params;// Get category from MyExpenses.js */

  useEffect(() => {// UseEffect to get data from AsyncStorage
    const getIncomes = async () => {
      try {
           const user = JSON.parse(await AsyncStorage.getItem("@storage_Key"));// Get user data from AsyncStorage
        const { data } = await axios.get(
          `http://localhost:5555/api/incomes`,// Get data in DB collection from backend in DB
          {
            headers: {
              Authorization: `Bearer ${user.token}`,// Send token to backend
            },
          }
        );
         // Stocker les données récupérées dans AsyncStorage
       await AsyncStorage.setItem('incomes', JSON.stringify(data));// Store data in AsyncStorage
        console.log('data received from Backend ',data); 

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
    getIncomes();// Call the function to get data from AsyncStorage
  }, []);

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
    
     <TouchableOpacity style={styles.button} // Button to add a new expense
     
     onPress={() => navigation.navigate("MyIncomes")}>
        <Text style={styles.textButton} >Add a new Income</Text>
      </TouchableOpacity>
       
      
    {storedIncomes.map((income, index) => (// Display data from AsyncStorage in a FlatList
      <View key={index} style={styles.incomeContainer}>

         
        <View style={styles.row}>
          <Text>Date : {new Date(income.date).toISOString().split('T')[0]}</Text>
          <Text>Categories : {income.categories.join(', ')}</Text>
        </View>
        <View style={styles.row}>
          <Text>Label : {income.label}</Text>
          <Text>Amount = + {income.amount}</Text>
        </View>
      </View>
       
    ))}
    </Screen2>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  incomeContainer: {
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
    


 
});

export default ViewIncomes;