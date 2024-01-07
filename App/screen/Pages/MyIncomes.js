import { View, Text, StyleSheet, DatePickerIOS ,TextInput, ScrollView } from "react-native";
import React, { useState, useRef, useEffect,  } from "react";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import AuthHeader from "../../shared/components/AuthHeader";
import CustomInputSingup from "../../shared/components/ui/CustomInputSignup";
import CustomButton from "../../shared/components/ui/CustomButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { SelectList } from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';

/*  import { REACT_APP_BE_URL } from "../../.env"; */
import axios from "axios";

// comment this line because solution not found if using .env file
// go to ligne 84
//import { API_URL, API_TOKEN } from "@env";
/*  import { REACT_APP_BE_URL } from "../../.env";  */

const isValidDate = (date) => {
  // Check if date matches the format DD/MM/YYYY
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
  return regex.test(date);
};

const isValidCategories = (categories) => {
  // Check if categories is not empty
  return categories !== '';
};

const isValidLabel = (label) => {
  // Check if label is not empty
  return label !== '';
};

const isValidAmount = (amount) => {
  // Check if amount is a number
  return !isNaN(amount);
};

// check all value is valid
const formIsValid = (DataObj) => {
  return (
    Object.values(DataObj).every((value) => value.trim().length > 0) && // check all value is not empty
    isValidDate(DataObj.date) &&
    isValidCategories(DataObj.categories) &&

    isValidLabel(DataObj.label) &&
    isValidAmount(DataObj.amount)
  );
};
//
const MyIncome = () => {
  const [date, setDate] = useState("");
  const [categories, setCategories] = useState("");
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
const [selected, setSelected] = React.useState([]);

const isValidDate = (date) => {
  // Check if date matches the format DD/MM/YYYY
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
  return regex.test(date);
};

useEffect(() => {
  setFormData((prevState) => ({
    ...prevState,
    categories: selected,
  }));
}, [selected]);

  const navigation = useNavigation();
  const [formErrors, setFormErrors] = useState({
    date: null,
    categories: null,
    label: null,
    amount: null,
  });

   
  const [formData, setFormData] = useState({
    date: "",
    categories: [],
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
      console.error("Invalid date");
      return;
    }
  } else if (fieldName === "categories") {
    if (!value || !Array.isArray(value) || !value.length) {
      console.error("Invalid categories");
      return;
    }
    setSelected(value); // Mettre à jour l'état 'selected'
    formattedValue = value.map((selected) => selected.value);
    console.log("formattedValue", formattedValue);
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
        !isValidDate(formData.date) ? "please enter a valid date" : null
      );
  };


    if (!formIsValid(formData.categories)) {
      updateError(
        "categories",
        !isValidCategories(formData.categories)
          ? "Please choose a valid categories"
          : null
      );
    };
    
    if (!formIsValid(formData.label)) {
      updateError(
        "label",
        !isValidLabel(formData.label)
          ? "please enter a description "
          : null
      );
    };
    

    if (!formIsValid(formData.amount)) {
      updateError(
        "amount",
        !isValidAmount(formData.amount, formData.amount)
          ? "please enter a valid amount"
          : null
      );
    }
  };
    const data = () => {
    return [
        "Salary",
        "Taxes refund",
        "Bonus",
        "Loan",
        "Sales",
        "Gift",
        "Rent",
        "Allowance",
        "Refund",
        "Gambling",
        "Stocks",
        "Other",

    ] 

    }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // update formData with form values
    setFormData({
      date: date,
      categories: selected, // Utilisez la valeur sélectionnée
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

/*       updateError(
        "date",
        !isValidDate(formData.date) ? "please enter a valid date" : null
      ) */

      updateError(
        "categories",
        !isValidCategories(formData.categories)
          ? "please choose a valid categories"
          : null
      );

      updateError(
        "label",
       !isValidLabel(formData.label)
          ? "please enter a description "
          : null
      );
      updateError(
        "amount",
        !isValidAmount(formData.amount) ? "please enter a valid amount" : null
      );
    }

    try {
        // Récupérer les données de l'utilisateur à partir de AsyncStorage
      const user = JSON.parse(await AsyncStorage.getItem("@storage_Key"));
      // await AsyncStorage.setItem("@storage_Key", jsonValue);

      console.log("user", user.token);
      const response = await axios.post(
        `http://localhost:5555/api/incomes`,
        formData,
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log('data send to BE',response.data);
      
      
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "income created successfully",
        visibilityTime: 3000,
        autoHide: true,
      });
      setTimeout(() => {
        navigation.navigate("ViewIncomes");
      }, 3000);
    } catch (err) {
      console.log("Test Myincome", err.response.data);
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
      <AuthHeader subtext="Please add a new income" />
      <View style={styles.content}>
         <ScrollView style={styles.scrollView}>
        <CustomInputSingup
          label="Date"
          value={formData.date.someProperty}
          onChangeText={(value) => handleChange(value, "date")}
          placeholder="DD/MM/YYYY"
          secure={false}
          errorMessage={formErrors.date}
        />
          <TextInput style={styles.categorie} >Categories</TextInput>

      <SelectList 
      dropdownStyles={{ 
        borderColor: '#E0AA3E',
        borderWidth: 1,
        borderRadius: 6,
        
      }}

      
      boxStyles={{borderRadius:6, borderColor:'#E0AA3E',height:40}} //override default styles
      defaultOption={{ value:'Select a categorie'}} 
          label="Categories"
          onSelect={() => alert(selected)}
          value={selected}
          onChange={(value) => handleChange(value, "categories")}
          setSelected={(value) => setSelected(value)}
          data={data} 
          save="value"
          categories={"value"}
          search={false}
        
          errorMessage={formErrors.categories}
      />

        <CustomInputSingup
          label="Label"
          value={formData.label}
          onChangeText={(value) => handleChange(value, "label")}
          placeholder=" Description of your income"
          secure={false}
          errorMessage={formErrors.label}
        />
        <CustomInputSingup
          label="Amount"
          value={formData.amount}
          onChangeText={(value) => handleChange(value, "amount")}
          placeholder="amount should be a number 0000.00"
          secure={false}
         errorMessage={formErrors.amount}
        />
        {/* input area  End*/}

       
        </ScrollView>
      </View>

      {/* Button Start */}
          <CustomButton
          onPress={handleSubmit}
          style={styles.button}
          buttonText={"new Income"}
        />
         {/* Button End */}
      <Toast />
    </View>
  );
};

export default MyIncome;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 2,
    padding: 10,
    marginTop: 10,
   
  },

categorie:{
    color: "#E0AA3E",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,

},
   
SelectList:{
marginBottom: 20,

}
     
});
