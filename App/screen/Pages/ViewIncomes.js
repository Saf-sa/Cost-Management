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


const ViewIncomes = ({route}) => {
  const [storedIncomes, setStoredIncomes] = useState([]);// State to store data from AsyncStorage
  const navigation = useNavigation();// Navigation

  const {category} = route.params;// Get category from MyIcomes.js  
 /*  console.log('category from ViewIncomes ', category); */
  useEffect(() => {// UseEffect to get data from AsyncStorage
    const getIncomes = async () => {
      try {
           const user = JSON.parse(await AsyncStorage.getItem("@storage_Key"));// Get user data from AsyncStorage
           /* console.log('user token ',user.token);  */
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
    getIncomes();// Call the function to get data from AsyncStorage
  }, []);
const calculateTotalIncomes = storedIncomes.reduce((total, income) => total + Number(income.amount), 0);


let index = 1;// index for scrollview

  return (// Display data from AsyncStorage
     <ScrollView style={styles.page}
     keyboardDismissMode="on-drag"// to dismiss the keyboard when the user drags the scroll view
      onscroll={(evt) =>  (index++)}// to get the index of the scrollview
      onScrollBeginDrag={(evt) => (index++)}// to get the index of the scrollview
      >
       <View >  
<Screen2 >
           {/* Button Start */}
      
        <UserNav 

        
          image={require("../../assets/iconPerson.png")}
    /> 
    
     <TouchableOpacity style={styles.button} // Button to add a new expense
     
     onPress={() => navigation.navigate("MyIncomes")}>
        <Text style={styles.textButton} >Add a new Income</Text>
      </TouchableOpacity>
       
        <Text style={styles.textAmount}>Total Incomes = + {calculateTotalIncomes} € </Text>
      
    {storedIncomes.map((income, index) => (// Display data from AsyncStorage in a FlatList
      /* console.log('storedIncomes ', storedIncomes), */
      <View key={index} style={styles.incomeContainer}>

         
        <View style={styles.row}>
          <Text>Date : {income.date && !isNaN(Date.parse(income.date)) ? new Date(income.date).toISOString().split('T')[0] : 'Invalid date'}</Text>
          <Text>Categories : {income.categories.join(', ')}</Text>
        </View>
        <View style={styles.row}>
          <Text>Label : {income.label}</Text>
          <Text style={{ color: "green"}}>Amount = + {income.amount}</Text>
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
  incomeContainer: {
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
    marginBottom: 8
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
    top: -70,
  },
    textButton:{
      color: "#E0AA3E",
      fontWeight: "bold",
      fontSize: 15,
      textAlign: "center",
    },
      textAmount:{
      color: "green",
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center",
      top: -60,
    },
});

export default ViewIncomes;
