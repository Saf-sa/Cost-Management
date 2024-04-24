import React, { useState, } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import CustomInputSingup from "../../../shared/components/ui/CustomInputSignup";
import SendButton from '../../../shared/components/uiApp/AppSendButton'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { SelectList } from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from "../../../shared/components/uiApp/Card";
import axios from "axios";

const isValidEmail = (email) => {
  // Should contain @
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const isValidDate = (date) => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
  return regex.test(date);
};

const isValidContractName= (contractName) => {
  return contractName !== '';
};
const isValidLabel = (label) => {
  return label !== '';
};

const isValidRenewal = (renewal) => {
  return !isNaN(renewal);
};



const AddReminder= () => {
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedExpireDate, setSelectedExpireDate] = useState(new Date());
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isExpireDatePickerVisible, setExpireDatePickerVisibility] = useState(false); 
  const [selectedEmail, setSelectedEmail] = useState("");
  const [contractName, setContractName] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("");
  const [selectedRenewal, setSelectedRenewal] = useState("");
  const navigation = useNavigation();
  const [formErrors, setFormErrors] = useState({
    selectedStartDate: null,
    selectedExpireDate: null,
    contractName: null,
    selectedEmail: null,
    selectedLabel: null,
    selectedRenewal: null,
  });
  
const showStartDatePicker = () => {
  setStartDatePickerVisibility(true);
};

const hideStartDatePicker = () => {
  setStartDatePickerVisibility(false);
};

const showExpireDatePicker = () => {
  setExpireDatePickerVisibility(true);
};

const hideExpireDatePicker = () => {
  setExpireDatePickerVisibility(false);
};
const handleConfirmStartDate = (date) => {
  hideStartDatePicker();
  const formattedStartDate = moment(date).format("DD/MM/YYYY"); // Formatage en DD/MM/YYYY
  setSelectedStartDate(formattedStartDate);
  console.log("formattedStartDate", formattedStartDate);
};

const handleConfirmExpireDate = (date) => {
  hideExpireDatePicker();
  const formattedExpireDate = moment(date).format("DD/MM/YYYY"); // Formatage en DD/MM/YYYY
  setSelectedExpireDate(formattedExpireDate);
  console.log("formattedExpireDate", formattedExpireDate);
};


const handleChange = (value, fieldName) => {
  switch (fieldName) {
    case "startDate":
      setStartDate(value);
      break;
    case "expireDate":
      setExpireDate(value);
      break;
    case "contractName":
      setContractName(value);
      break;
    case "label":
      setSelectedLabel(value);
      break;
    case "email":
      setSelectedEmail(value);
      break;
    case "renewal":
      setSelectedRenewal(value);
      break;
      default: 
      break;
  }
  console.log(fieldName, value);
};
  const handleSubmit = async () => {
  const formData = {
    startDate: selectedStartDate,
    expireDate: selectedExpireDate,
    contractName: contractName,
    label: selectedLabel,
    email: selectedEmail,
    renewal: selectedRenewal,
  };
console.log("formData", formData);
 

    // Validation des champs
    if (!isValidDate(formData.startDate)) {
      updateError(
        "startDate",
        !isValidDate(formData.startDate) ? "Please enter a valid date" : null
      );
    }
     if (!isValidDate(formData.expireDate)) {
      updateError(
        "expireDate",
        !isValidDate(formData.expireDate) ? "Please enter a valid date" : null
      );
    }

    if (!isValidContractName(formData.contractName)) {
      updateError(
        "contractName",
        !isValidContractName(formData.contractName)
          ? "Please choose a valid Contract name"
          : null
      );
    }

    if (!isValidLabel(formData.label)) {
      updateError(
        "label",
        !isValidLabel(formData.label)
          ? "Please enter a label"
          : null
      );
    }

    if (!isValidEmail(formData.email)) {
      updateError(
        "email",
        !isValidEmail(formData.email)
          ? "Please enter a valid email"
          : null
      );
    }

    if (!isValidRenewal(formData.renewal)) {
      updateError(
        "renewal",
        !isValidRenewal(formData.renewal)
        ? "Please enter a valid email"
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
        `http://localhost:5555/api/reminder`,
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
        text1: "Reminder created successfully",
        visibilityTime: 3000,
        autoHide: true,
      });
      setTimeout(() => {
        navigation.navigate("Dashboard");
      }, 3000);
    } catch (err) {
     console.log("Test AddReminder", err.response); 
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
      <View style={styles.content}>
        <ScrollView style={styles.scrollView}>
          <Card
          cardText={'Add a new Reminder'}
          />
          <Text style={styles.category}>Start Date</Text>
         <TextInput
  style={styles.inputContainer}
  label="Start Date"
  value={moment(selectedStartDate).format("DD/MM/YYYY")}
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

<Text style={styles.category}>Expire Date</Text>
<TextInput
  style={styles.inputContainer}
  label="date"
  value={moment(selectedExpireDate).format("DD/MM/YYYY")} 
  placeholder="DD/MM/YYYY"
  secureTextEntry={false}
  onFocus={showExpireDatePicker}
/>
<DateTimePickerModal
  isVisible={isExpireDatePickerVisible}
  mode="date"
  onConfirm={handleConfirmExpireDate}
  onCancel={hideExpireDatePicker}
/>
          <Text style={styles.category}>Renewal</Text>
          <SelectList
            dropdownStyles={{
              borderColor: '#E0AA3E',
              borderWidth: 1,
              borderRadius: 6,
            }}
            boxStyles={{ borderRadius: 8, borderColor: '#E0AA3E', height: 40, backgroundColor:'white' }}
            defaultOption={{ value: 'Select a renewal' }}
            label="duration"
             setSelected={(value) => handleChange(value, "renewal")}
            data={[
               "1 year",
               "2 years",
               "3 years",
               "4 years",
               "5 years",
            ]}
            save="value"
            categories={"value"}
            search={false}
            errorMessage={formErrors.renewal}
          />

          <CustomInputSingup
            label="contract Name"
            value={contractName}
            onChangeText={(value) => handleChange(value, "contractName")}
            placeholder="Name of your contract"
            secure={false}
            errorMessage={formErrors.contractName}
          />
          <CustomInputSingup
            label="Label"
            value={selectedLabel}
            onChangeText={(value) => handleChange(value, "label")}
            placeholder="Description of your Contract"
            secure={false}
            errorMessage={formErrors.label}
          />
                    <CustomInputSingup
            label="email"
            value={selectedEmail}
            onChangeText={(value) => handleChange(value, "email")}
            placeholder="Email of your Contract"
            secure={false}
            errorMessage={formErrors.email}
          />
        </ScrollView>
      </View>
 {<View style={styles.AgendaButton}>
      <SendButton
        onPress={handleSubmit}
        style={styles.button}
        sendButtonText={"New reminder"}
      />
</View>} 
      <Toast />
    </View>
  );
};

export default AddReminder;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F8F4D7",
  },
  content: {
    flex: 2,
    padding: 10,
    marginTop: -10,
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
    marginTop: 750,
  },
  
});
