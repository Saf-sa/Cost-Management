import React, { useState, } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import Card from "../../../shared/components/uiApp/Card";
import SendButton from '../../../shared/components/uiApp/AppSendButton'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { SelectList } from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetExpenses } from "../../../shared/components/IncomExpenseComponent/GetExpense";
import axios from "axios";

const isValidDate = (date) => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
  return regex.test(date);
};

const isValidCategory= (category) => {
  return category !== '';
};
const isValidSubCategory= (subCategory) => {
  return subCategory !== '';
};

const SelectDownloadIncome= () => {
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false); 
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const navigation = useNavigation();
  const [formErrors, setFormErrors] = useState({
    selectedStartDate: null,
    selectedEndDate: null,
    selectedCategory: null,
    selectedSubCategory: null,

  });
  
  
   const subCategories =
    [
      "All",
      "Salary",
      "Bonus",
      "Loan",
      "Sales",
      "Gift",
      "Rent",
      "Allowance",
      "Refund",
      "Stocks",
      "Other"
    ] 
    ;




const showStartDatePicker = () => {
  setStartDatePickerVisibility(true);
};

const hideStartDatePicker = () => {
  setStartDatePickerVisibility(false);
};

const showEndDatePicker = () => {
  setEndDatePickerVisibility(true);
};

const hideEndDatePicker = () => {
  setEndDatePickerVisibility(false);
};
const handleConfirmStartDate = (date) => {
  hideStartDatePicker();
  const formattedStartDate = moment(date).format("DD/MM/YYYY"); // Formatage en DD/MM/YYYY
  setSelectedStartDate(formattedStartDate);
  console.log("formattedStartDate", formattedStartDate);
};

const handleConfirmEndDate = (date) => {
  hideEndDatePicker();
  const formattedEndDate = moment(date).format("DD/MM/YYYY"); // Formatage en DD/MM/YYYY
  setSelectedEndDate(formattedEndDate);
  console.log("formattedEndeDate", formattedEndDate);
};


  const handleChangeCategory = (value) => {
    setCategory(value);
    // Réinitialisez la sous-catégorie lorsque la catégorie change
    setSubCategory('');
  };

  const handleChangeSubCategory = (value) => {
    setSubCategory(value);
  };


    const handleConfirm = (date) => {
    hideDatePicker();
    const formattedStartDate = moment(date).format("DD/MM/YYYY"); 
    setSelectedStartDate(formattedDate);

    const formattedEndDate = moment(date).format("DD/MM/YYYY"); 
    setSelectedEndDate(formattedEndDate);

  };
    const showDatePicker = () => {
    setStartDatePickerVisibility(true);
    setEndDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setStartDatePickerVisibility(false);
    setEndDatePickerVisibility(false);
  };

const handleChange = (value, fieldName) => {
  switch (fieldName) {
    case "startDate":
      setStartDate(value);
      break;
    case "endDate":
      setEndDate(value);
      break;
    case "category":
      setCategory(value);
      break;
    case "SubCategory":
      setSubCategory(value);
      break;
      default: 
      break;
  }
  console.log(fieldName, value);
};
  const handleSubmit = async () => {
  const formData = {
    startDate: selectedStartDate,
    endDate: selectedEndDate,
    category: category,
    SubCategory: subCategory,
  
  };
console.log("formData", formData);
 

    // Validation des champs
    if (!isValidDate(formData.startDate)) {
      updateError(
        "startDate",
        !isValidDate(formData.startDate) ? "Please enter a valid date" : null
      );
    }
     if (!isValidDate(formData.endDate)) {
      updateError(
        "endDate",
        !isValidDate(formData.endDate) ? "Please enter a valid date" : null
      );
    }

    if (!isValidCategory(formData.category)) {
      updateError(
        "category",
        !isValidCategory(formData.category)
          ? "Please choose a valid Category"
          : null
      );
    }

    if (!isValidSubCategory(formData.subCategory)) {
      updateError(
        "subCategory",
        !isValidSubCategory(formData.subCategoryegory)
          ? "Please choose a valid Sub Category"
          : null
      );
    }

    console.log("formData", formData); 
  try {
        // Récupérer les données de l'utilisateur à partir de AsyncStorage
      const user = JSON.parse(await AsyncStorage.getItem("@storage_Key"));
      // await AsyncStorage.setItem("@storage_Key", jsonValue);

     console.log("143 get user Token from storage_Key ", user); 
        console.log("144 response.data", user.id); 
      const response = await axios.post(
        `http://localhost:5555/api/incomes`,
        formData,
        {
          headers: {
            authorization: `Bearer ${user.token}` 
          },
        } 
      );

     
      console.log('data send to BE',response.data); 
      
      
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Pdf Income created successfully",
        visibilityTime: 3000,
        autoHide: true,
      });
      setTimeout(() => {
        navigation.navigate("Download");
      }, 3000);
    } catch (err) {
     console.log("Test Income PDF", err.response); 
      Toast.show({
        type: "error",
        position: "bottom",
        text1: err.response.data.message,
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };

  const updateError = (type, errorMessage) => {
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      [type]: errorMessage,
    }));
  };

  return (
    <View style={styles.root}>
      <Card/>
         {<View style={styles.AgendaButton}>
      <SendButton
        onPress={handleSubmit}
        style={styles.button}
        sendButtonText={"Create PDf"}
      />
</View>} 
      <View style={styles.content}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.category}>Start Date</Text>
         <TextInput
  style={styles.inputContainer}
  label="Start Date"
 value={selectedStartDate}  
  placeholder="DD/MM/YYYY"
  secureTextEntry={false}
  onFocus={showStartDatePicker}
/>
<DateTimePickerModal
  isVisible={isStartDatePickerVisible}
  mode="date"
  onConfirm={handleConfirmStartDate}
  onCancel={hideStartDatePicker}
/>

<Text style={styles.category}>End Date</Text>
<TextInput
  style={styles.inputContainer}
  label="date"
  value={selectedEndDate}  
  placeholder="DD/MM/YYYY"
  secureTextEntry={false}
  onFocus={showEndDatePicker}
/>
<DateTimePickerModal
  isVisible={isEndDatePickerVisible}
  mode="date"
  onConfirm={handleConfirmEndDate}
  onCancel={hideEndDatePicker}
/>
 <Text style={styles.category}>Catégories</Text>
        <SelectList
         dropdownStyles={{
              borderColor: '#E0AA3E',
              borderWidth: 1,
              borderRadius: 6,
            }}
            boxStyles={{ borderRadius: 8, borderColor: '#E0AA3E', height: 42, backgroundColor:'white' }}
          defaultOption={{ value: 'Sélectionner une catégorie' }}
          data={['incomes']}
          setSelected={handleChangeCategory}
        />

        <Text style={styles.category}>Sub-Catégories</Text>
        <SelectList
             dropdownStyles={{
              borderColor: '#E0AA3E',
              borderWidth: 1,
              borderRadius: 6,
            }}
        boxStyles={{ borderRadius: 8, borderColor: '#E0AA3E', height: 42, backgroundColor:'white' }}
          defaultOption={{ value: 'Sélectionner une sous-catégorie' }}
          data={subCategories}
          setSelected={handleChangeSubCategory}
        />

        </ScrollView>
      </View>

      <Toast />
    </View>
  );
};

export default SelectDownloadIncome;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F8F4D7",
  },
  content: {
    flex: 2,
    padding: 10,
    marginTop: 100,
  },
  inputContainer: {
    backgroundColor:'white',
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#E0AA3E",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  input: {
    color: "#000",
    flex: 1,
  },
  category: {
    color: "#E0AA3E",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  SelectList: {
    marginBottom: 20,
  },
  AgendaButton: {
    position: "absolute",
    alignSelf: "center",
    marginTop: 250,
  },
  
});
