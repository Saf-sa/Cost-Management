import { View, Text, StyleSheet,TouchableOpacity, DatePickerIOS ,   ScrollView, } from "react-native";
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

// comment this line because solution not found if using .env file
// go to ligne 84
//import { API_URL, API_TOKEN } from "@env";
/*  import { REACT_APP_BE_URL } from "../../.env";  */

const isValidDate = (date) => {};

const isValidCategories = (categories) => {};

const isValidlabel = (label) => {};

const isValidAmount = (amount) => {};

// check all value is valid
const formIsValid = (DataObj) => {
  return (
    Object.values(DataObj).every((value) => value.trim().length > 0) && // check all value is not empty
    isValidDate(DataObj.date) &&
    isValidCategories(DataObj.categories) &&
    isValidlabel(DataObj.label) &&
    isValidAmount(DataObj.amount)
  );
};
//
const MyExpense = () => {
  const [date, setDate] = useState("");
  const [categories, setCategories] = useState("");
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const navigation = useNavigation();
  const [formErrors, setFormErrors] = useState({
    date: null,
    categories: null,
    label: null,
    amount: null,
  });

  const [formData, setFormData] = useState({
    date: null,
    categories: null,
    label: "",
    amount: "",
  });
  const handleChange = (value, type) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [type]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // update formData with form values
    setFormData({
      date: date,
      categories: categories,
      label: label,
      amount: amount,
    });

    if (!formIsValid(date, categories, label, amount)) {
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Please add a new expense",
        visibilityTime: 3000,
        autoHide: true,
      });

    }

  };

  useEffect(()=>{
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
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getExpenses();
  })

  return (
    <View style={styles.root}>
      <AuthHeader subtext="All your Expense" />
      <View style={styles.content}>
        <CustomInputSingup
          label="Date"
          value={formData.date}
          onChangeText={(value) => handleChange(value, "date")}
          secure={false}
        />
        <CustomInputSingup
          label="Date"
          value={formData.categories}
          onChangeText={(value) => handleChange(value, "Date")}
          secure={false}
        />
        <CustomInputSingup
          label="Date"
          value={formData.label}
          onChangeText={(value) => handleChange(value, "Date")}
          secure={false}
        />
        <CustomInputSingup
          label="Date"
          value={formData.amount}
          onChangeText={(value) => handleChange(value, "Date")}
          secure={false}
        />
        {/* input area  End*/}
        {/* Button Start */}
        <CustomButton
          style={styles.button}
          buttonText={"Add Expense"}
          onPress={() => navigation.navigate("MyExpenses")}
        />
        {/* Button End */}
      </View>
      <Toast />
    </View>
  );
};

export default MyExpense;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 2,
    padding: 20,
  },
  button: {
    marginTop: 20,
  },
});
