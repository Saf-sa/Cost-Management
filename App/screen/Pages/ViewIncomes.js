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
        const storedData = await AsyncStorage.getItem('incomes');
        if (storedData !== null) {
          const parsedData = JSON.parse(storedData);
          setStoredIncomes(parsedData.incomes);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getIncomes();
  }, []);

  const renderIncomeItem = ({ item }) => (
    <View style={styles.incomeContainer}>
      <Text>Date: {item.date}</Text>
      <Text>Categories: {item.categories.join(', ')}</Text>
      <Text>Label: {item.label}</Text>
      <Text>Amount: {item.amount}</Text>
    </View>
  );

  return (
    <FlatList
      data={storedIncomes}
      renderItem={renderIncomeItem}
      keyExtractor={(item, index) => index.toString()} // ou utiliser une clé unique de l'objet si disponible
    />
  );
};

const styles = StyleSheet.create({
  incomeContainer: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 10,
    marginVertical: 5,
  },
});

export default ViewIncomes;