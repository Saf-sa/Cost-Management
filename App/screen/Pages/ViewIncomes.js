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
import moment from "moment";
import AsyncStorage from '@react-native-async-storage/async-storage';
/*  import { REACT_APP_BE_URL } from "../../.env"; */
import axios from "axios";
import MyIncome from "./MyIncomes";

// comment this line because solution not found if using .env file
// go to ligne 84
//import { API_URL, API_TOKEN } from "@env";
/*  import { REACT_APP_BE_URL } from "../../.env";  */

const ViewIncomes = () => {
  const [storedIncomes, setStoredIncomes] = useState([]);

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

  return (
    <ScrollView>
      {storedIncomes.map((income, index) => (
        <View key={index} style={styles.incomeContainer}> 
        {/* Hide types to show only the value  */}
        
          <Text> {/* Date: */} {income.date}</Text>
          <Text> {/* Categories: */} {income.categories.join(', ')}</Text>
          <Text> {/* Label:  */}{income.label}</Text>
          <Text>{/*  Amount: */} {income.amount}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  incomeContainer: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#F7F7F7',
  },
  textLabel: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  textValue: {
    marginBottom: 8,
  },
});

export default ViewIncomes;