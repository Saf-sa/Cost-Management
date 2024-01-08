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
import MyIncome from "./MyIncomes";

// comment this line because solution not found if using .env file
// go to ligne 84
//import { API_URL, API_TOKEN } from "@env";
/*  import { REACT_APP_BE_URL } from "../../.env";  */

const ViewExpenses = () => {
  const [storedIncomes, setStoredIncomes] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    const getIncomes = async () => {
      try {
        const incomes = await AsyncStorage.getItem('incomes');
        if (incomes) {
          const parsedIncomes = JSON.parse(incomes);
          setStoredIncomes(parsedIncomes.incomes); // Vérifiez la structure des données ici
        }
      } catch (error) {
        console.log(error);
      }
    };
    getIncomes();
  }, []);
  
let index = 1;

  return (
     <ScrollView
      keyboardDismissMode="on-drag"
      onscroll={(evt) =>  (index++)}
      onScrollBeginDrag={(evt) => (index++)}
    
      >

    
    
      
    {storedIncomes.map((income, index) => (
      
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



    


 
});

export default ViewExpenses;