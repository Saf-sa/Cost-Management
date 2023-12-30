import { View, Text, StyleSheet, DatePickerIOS , } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import AuthHeader from "../../shared/components/AuthHeader";
import CustomInputSingup from "../../shared/components/ui/CustomInputSignup";
import CustomButton from "../../shared/components/ui/CustomButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { SelectList } from 'react-native-dropdown-select-list';
import CatPicker from "../../shared/components/IncomExpenseComponent/CategoryPickerItem";
/*  import { REACT_APP_BE_URL } from "../../.env"; */
import axios from "axios";

// comment this line because solution not found if using .env file
// go to ligne 84
//import { API_URL, API_TOKEN } from "@env";
/*  import { REACT_APP_BE_URL } from "../../.env";  */

const isValidDate = (date) => {};

const isValidCategories = (categories) => {};

const isValidformOtherCategories = (otherCategories) => {};

const isValidlabel = (label) => {};

const isValidAmount = (amount) => {};

// check all value is valid
const formIsValid = (DataObj) => {
  return (
    Object.values(DataObj).every((value) => value.trim().length > 0) && // check all value is not empty
    isValidDate(DataObj.date) &&
    isValidCategories(DataObj.categories) &&
    isValidformOtherCategories(DataObj.otherCategories) &&
    isValidlabel(DataObj.label) &&
    isValidAmount(DataObj.amount)
  );
};
//
const MyExpense = () => {
  const [date, setDate] = useState("");
  const [categories, setCategories] = useState("");
/*   const [otherCategories, setOtherCategories] = useState(""); */
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [selected, setSelected] = React.useState("");
  const navigation = useNavigation();
  const [formErrors, setFormErrors] = useState({
    date: null,
    categories: null,
    otherCategories: null,
    label: null,
    amount: null,
  });

   
  const [formData, setFormData] = useState({
    date: "",
    categories: "",
  /*   otherCategories: "", */
    label: "",
    amount: "",
  });

  const timeoutIdRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  const handleChange = (value, fieldName) => {
    let formattedValue = value;

    if (fieldName === "date") {
      formattedValue = moment(value, "DD/MM/YYYY");
      if (!formattedValue.isValid()) {
        // Handle invalid date here
        console.error("Invalid date");
        return;
      }
    }

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: formattedValue,
    }));
  };

  const updateError = (type, errorMessage) => {
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      [type]: errorMessage,
    }));

    if (errorMessage) {
      timeoutIdRef.current = setTimeout(() => {
        setFormErrors((prevFormErrors) => ({
          ...prevFormErrors,
          [type]: null,
        }));
      }, 3000); // 3000 milliseconds = 3 seconds
    }
  };
  const isValidForm = () => {
     if (!formIsValid(formData.date)) {
      updateError(
        "date",
        !isValidDate(formData.date) ? "Please enter a valid date" : null
      );
    }
    if (!formIsValid(formData.categories)) {
      updateError(
        "categories",
        !isValidCategories(formData.categories)
          ? "Please choose a valid categories"
          : null
      );
    }

    if (!formIsValid(formData.amount)) {
      updateError(
        "amount",
        !isValidAmount(formData.amount, formData.amount)
          ? "please enter a valid amount"
          : null
      );
    }
  };

  const Categories = ['House', 'Transport', 'Clothes', 'Studies', 'Invoice', 'Taxes', 'Hobbies', 'Money', 'epargne', 'Holiday' ];
    const SelectList = () => {
  

  {Categories.map((item, index) => (
    <option key={index} value={item.Value}>
        {item.label}
    </option>
))}

    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // update formData with form values
    setFormData({
      date: date,
      categories: data.values,
      label: label,
      amount: amount,
    });

    if (!formIsValid(date, categories,  label, amount)) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Please review your form",
        visibilityTime: 3000,
        autoHide: true,
      });

      updateError(
        "date",
        !isValidDate(formData.date) ? "please enter a valid date" : null
      );
      updateError(
        "categories",
        !isValidCategories(formData.categories)
          ? "please choose a valid categories"
          : null
      );
    /*   updateError(
        "otherCategories",
        !isValidformOtherCategories(formData.otherCategories)
          ? "please choose other categories"
          : null
      ); */
      updateError(
        "label",
        !isValidlabel(formData.label)
          ? "please enter a a description in label"
          : null
      );
      updateError(
        "amount",
        !isValidAmount(formData.amount) ? "please enter a valid amount" : null
      );
    }

    try {
      const response = await axios.post(
        `http://localhost:5555/api/users/expenses`,
        formData
      );
      console.log('data send to BE',response.data.message);
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "expense created successfully",
        visibilityTime: 3000,
        autoHide: true,
      });
      setTimeout(() => {
        navigation.navigate("ViewExpenses");
      }, 3000);
    } catch (err) {
      console.log("Test Myexpense", err.response.data);
      Toast.show({
        type: "error",
        position: "bottom",
        text1: err.response.data.message,
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };

  return (
    <View style={styles.root}>
      <AuthHeader subtext="Please Add a new expense" />
      <View style={styles.content}>
        <CustomInputSingup
          label="Date"
          value={formData.date}
          onChangeText={(value) => handleChange(value, "date")}
          placeholder="DD/MM/YYYY"
          secure={false}
          errorMessage={formErrors.date}
        />

     {/*    <CustomInputSingup
          label="Categories"
          value={formData.categories}
          onChangeText={(value) => handleChange(value, "categories")}
          placeholder="Please choose a categories"
          secure={false}
          errorMessage={formErrors.categories}

        /> */}
         {/*  <SelectList 
          
        label="Categories"
         value={formData.categories}
        onChange={(value) => handleChange(value, "categories")}
        setSelected={(value) => setSelected(value, "categories")} 
        data={data} 
        save="value"
        categories={"value"}
        errorMessage={formErrors.categories}
    /> */}

    <CatPicker/>

     
       {/*  <CustomInputSingup
          label="Label"
          value={formData.label}
          onChangeText={(value) => handleChange(value, "label")}
          placeholder=" min 8 with 1 capital char, 1 number,1 special char "
          secure={false}
          errorMessage={formErrors.label}
        />
        <CustomInputSingup
          label="Amount"
          value={formData.amount}
          onChangeText={(value) => handleChange(value, "amount")}
          placeholder="please enter a valid amount"
          secure={false}
          errorMessage={formErrors.amount}
        /> */}
        {/* input area  End*/}

        {/* Button Start */}
        <CustomButton
          onPress={handleSubmit}
          style={styles.button}
          buttonText={"new Expense"}
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
