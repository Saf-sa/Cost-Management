import React, {useState} from "react";
import {Text, View, StyleSheet} from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "@react-native-community/datetimepicker";
import CustomInputSingup from "../../../shared/components/ui/CustomInputSignup";
import { SelectList } from 'react-native-dropdown-select-list';
import CustomButton from "../../../shared/components/ui/CustomButton";
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "axios";

const isValidStartDate = (date) => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
  return regex.test(date);
};

const isValidExpireDate = (date) => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
  return regex.test(date);
};

const isValidContractName= (contractName) => {
  return contractName !== '';
};

const isValidLabel = (label) => {
  return label !== '';
};

const isValidEmail = (email) => {
  return !isNaN(email);
};
const isValidRenewal = (renewal) => {
  return !isNaN(renewal);
};


export default function AddReminder() {
    const [date, setDate] = useState(new Date());;
    const [startDate, setStartDate] = useState(new Date());
    const [expireDate, setExpireDate] = useState(new Date());
    const [selectedEmail, setSelectedEmail] = useState("");
    const [contractName, setContractName] = useState('');
    const [selectedLabel, setSelectedLabel] = useState('');
    const [selectedRenewal, setSelectedRenewal] = useState('');
     const [formErrors, setFormErrors] = useState({
    startDate: null,
    expireDate: null,
    contractName: null,
    selectedEmail: null,
    selectedLabel: null,
    selectedRenewal: null,
  });
    const navigation = useNavigation();


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
    startDate: startDate,
    expireDate: expireDate,
    contractName: contractName,
    label: selectedLabel,
    email: selectedEmail,
    renewal: selectedRenewal,
  };
console.log("formData", formData);
 

    // Validation des champs
    if (!isValidStartDate(formData.startDate)) {
      updateError(
        "startDate",
        !isValidStartDate(formData.startDate) ? "Please enter a valid date" : null
      );
    }
     if (!isValidExpireDate(formData.expireDate)) {
      updateError(
        "expireDate",
        !isValidExpireDate(formData.expireDate) ? "Please enter a valid date" : null
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

    console.log("formData 98", formData); 
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
        text1: "reminder created successfully",
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
        visibilityTime: 1000,
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
      
  <View style={styles.container}>
    <Text style={styles.titleStart}>Contract Start Date</Text>
    <View style={styles.date}>
      {[
        { title: "Day", value: startDate ? startDate.getDate() : "?" },
        { title: "Month", value: startDate ? startDate.getMonth() + 1 : "?" },
        { title: "Year", value: startDate ? startDate.getFullYear() : "?" },
      ].map((el, index) => (
        <View style={styles.datePart} key={index}>
          <Text style={styles.title}>{el.title}</Text>
          <Text style={styles.digit}>{el.value}</Text>
        </View>
      ))}
    </View>


    {Platform.OS === 'ios' && (
      <DateTimePickerModal
        value={startDate}
        mode={"date"}
        display="default"
        onChange={(event, selectedDate) => {
          const newDate = selectedDate || startDate;
          setStartDate(newDate);
        }}
      />
    )}
    <Text style={styles.titleExpire}>Contract expire Date</Text>
    <View style={styles.expireDate}>
      {[
        { title: "Day", value: expireDate ? expireDate.getDate() : "?" },
        { title: "Month", value: expireDate ? expireDate.getMonth() + 1 : "?" },
        { title: "Year", value: expireDate ? expireDate.getFullYear() : "?" },
      ].map((el, index) => (
        <View style={styles.datePart} key={index}>
          <Text style={styles.title}>{el.title}</Text>
          <Text style={styles.digit}>{el.value}</Text>
        </View>
      ))}
    </View>
    {Platform.OS === 'ios' && (
      <DateTimePickerModal
        value={expireDate}
        mode={"date"}
        display="default"
        onChange={(event, selectedDate) => {
          const newDate = selectedDate || expireDate;
          setExpireDate(newDate);
        }}
      />
    )}
    <View style={styles.contract}>
      <CustomInputSingup
        onChangeText={(value) => handleChange(value, 'contractName')}
        value={contractName}
        secure={false}
        errorMessage={formErrors.contractName}
        placeholder="Enter the Name of your Contract"
        
        style={styles.input}
      />
      <CustomInputSingup
        onChangeText={(value) => handleChange(value, 'label')}
        value={selectedLabel}
        placeholder="Enter a description of your Contract"
        secure={false}
        errorMessage={formErrors.selectedLabel}
        style={styles.input}
      />
      <CustomInputSingup
        onChangeText={(value) => handleChange(value, 'email')}
        value={selectedEmail}
        placeholder="Enter email of your Contract"
        secure={false}
        errorMessage={formErrors.selectedEmail}
        style={styles.input}
      />

 <SelectList
            dropdownStyles={{
              borderColor: '#E0AA3E',
              borderWidth: 1,
              borderRadius: 6,
            }}
            boxStyles={{backgroundColor:'white' ,borderRadius: 8, borderColor: '#E0AA3E', height: 40, width: 390, marginTop: 30,}}
            defaultOption={{ value: 'Select a Renewal' }}
            label="renewal"
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
    </View>
    <View style={styles.content}>
      <CustomButton
        onPress={handleSubmit}
        style={styles.button}
        buttonText={"New reminder"}
      />
    </View>
  </View>
);

    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: 0,
        alignItems: "center",
       backgroundColor: "#F8F4D7",
        
    },

  
   date: {
      ...Platform.select({
      ios: {
        flex: 10,
        marginTop: -30,
        flexDirection: "row",
        justifyContent: "space-around",
        width: "50%",
        marginBottom: 0,
    },
    android: {
        flex: 10,
        marginTop: -60,
        flexDirection: "row",
        justifyContent: "space-around",
        width: "80%",
        marginBottom: 30,
    },
    }),
    },  


    expireDate: {
        flex: 8,
         marginTop: 0,
        flexDirection: "row",
        justifyContent: "space-around",
        width: "60%",
    },

    datePart: {
      top: 40,
        width: 100,
        height: 100,
        alignItems: "center",
    },
    content: {
        flex: 10,
        marginTop: 9+0,
        alignItems: "center",
        justifyContent: "center",
    },


titleStart: {
     marginTop: 10,
        fontSize: 25,
        fontWeight: "100",
        marginBottom: 10,
    },
    titleExpire: {
        marginTop:80,
        fontSize: 25,
        fontWeight: "100",
        marginBottom: 30,
        
    },
    digit: {
        fontSize: 24,
    },

  
    
    contract: {
       ...Platform.select({
      ios: {
        flex: 3,
        width: 390,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 130,
        marginBottom: 100,
    }, 
      android: {
        flex: 3,
        width: 340,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 120,
        marginBottom: 100,
    },
    }),
    },


   button: {
    position: "fixed",
    borderColor: "#E0AA3E",
    borderWidth: 1,
    width: "35%",
    height: 45,
    alignSelf: "center",
    borderRadius: 8,
    padding: 12,
    textAlign: "center",
    top: -50,
    
  },
      textButton:{
      color: "#E0AA3E",
      fontWeight: "bold",
      fontSize: 15,
      textAlign: "center",
      
    },
    input: {
        width: "90%",
        height: 50,
        backgroundColor: "#F8F4D7",
        borderRadius: 0,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    title: {
        fontSize: 12,
        fontWeight: "bold",
    },
  
});