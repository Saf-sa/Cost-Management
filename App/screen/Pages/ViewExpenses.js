import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  DatePickerIOS,
  ScrollView,
  FlatList
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
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
import MyExpense from "./MyExpenses";

// comment this line because solution not found if using .env file
// go to ligne 84
//import { API_URL, API_TOKEN } from "@env";
/*  import { REACT_APP_BE_URL } from "../../.env";  */

const ViewExpenses = () => {
 const [storedExpenses, setStoredExpenses] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    const getExpenses = async () => {
      try {
        const user = JSON.parse(await AsyncStorage.getItem("@storage_Key"));
        const { data } = await axios.get(
          `http://localhost:5555/api/expenses/`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        // Stocker les données récupérées dans AsyncStorage
       await AsyncStorage.setItem('expenses', JSON.stringify(data));
       console.log(data);
        // Récupérer les données stockées dans AsyncStorage
      const expenses = await AsyncStorage.getItem('expenses');
        if (expenses) {
          const parsedExpenses = JSON.parse(expenses);
          setStoredExpenses(parsedExpenses.expenses); // Vérifiez la structure des données ici

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
          <Text>Date : {new Date(expense.date).toISOString().split('T')[0]}</Text>
          <Text>Categories : {expense.categories.join(', ')}</Text>
        </View>
        <View style={styles.row}>
          <Text>Label : {expense.label}</Text>
          <Text>Amount = + {expense.amount}</Text>
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
    


 
});

export default ViewExpenses;