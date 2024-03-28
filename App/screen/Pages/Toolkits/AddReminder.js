import React, {useState} from "react";
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomInputSingup from "../../../shared/components/ui/CustomInputSignup";
import CustomButton from "../../../shared/components/ui/CustomButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from "moment";
import axios from "axios";


export default function AddReminder() {
    const [date, setDate] = useState(new Date());;
    const [startDate, setStartDate] = useState(new Date());
    const [expireDate, setExpireDate] = useState(new Date());
    const [selectedEmail, setSelectedEmail] = useState("");
    const [contractName, setContractName] = useState('');
    const [selectedLabel, setSelectedLabel] = useState('');
    const navigation = useNavigation();


  const handleChange = (value, fieldName) => {
 if (fieldName === "duration") {
      setSelectedDuration(value);
    } else if (fieldName === "name") {
      setName(value);
    }
     else if (fieldName === "place") {
      setPlace(value);
    }
     console.log("87 setCategories", value);
  };

  const handleSubmit = async () => {
    
    const formData = {

      date: selectedDate,
      name: name,
      place: place,
      duration: selectedDuration,
     
    };
 

    // Validation des champs
    if (!isValidDate(formData.date)) {
      updateError(
        "date",
        !isValidDate(formData.date) ? "Please enter a valid date" : null
      );
    }

    if (!isValidName(formData.name)) {
      updateError(
        "name",
        !isValidName(formData.name)
          ? "Please choose a valid name"
          : null
      );
    }

    if (!isValidPlace(formData.place)) {
      updateError(
        "label",
        !isValidPlace(formData.place)
          ? "Please enter a place"
          : null
      );
    }

    if (!isValidDuration(formData.duration)) {
      updateError(
        "amount",
        !isValidDuration(formData.duration)
          ? "Please enter a valid duration"
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
        `http://localhost:5555/api/agenda`,
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
        text1: "expense created successfully",
        visibilityTime: 3000,
        autoHide: true,
      });
      setTimeout(() => {
        navigation.navigate("Dashboard");
      }, 3000);
    } catch (err) {
     console.log("Test AddAgenda", err.response); 
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
         <View style={styles.container}>
            <Text style={styles.titleStart}> Contract Start Date</Text>
      <View style={styles.date}>       
                {
                    [
                        {title: "Day", value: date ? date.getDate() : "?"},
                        {title: "Month", value: date ? date.getMonth() + 1 : "?"},
                        {title: "Year", value: date ? date.getFullYear() : "?"},
                    ]
                    .map((el, index) => {
                        return (
                            <View style={styles.datePart} key={index}>

                                <Text style={styles.title}>{el.title}</Text>
                                <Text style={styles.digit}>{el.value}</Text>

                                 </View>   
                        )
                    })
                }
                
            </View>
            
                     {Platform.OS === 'ios' && (
              <DateTimePicker
            value={startDate}
            mode={"date"}
            display="default"
            onChange={(event, selectedDate) => {
                const newDate = selectedDate || startDate;
                setStartDate(newDate);
                }}
            />
        )}
     <Text style={styles.titleExpire}> Contract expire Date</Text>

      <View style={styles.expireDate}>
                
                {
                    [
                        {title: "Day", value: expireDate ? expireDate.getDate() : "?"},
                        {title: "Month", value: expireDate ? expireDate.getMonth() + 1 : "?"},
                        {title: "Year", value: expireDate ? expireDate.getFullYear() : "?"},
                    ]
                    .map((el, index) => {
                        return (
                            <View style={styles.datePart} key={index}>

                                <Text style={styles.title}>{el.title}</Text>
                                <Text style={styles.digit}>{el.value}</Text>

                                 </View>
   
                        )
                    })
                }
            </View>
       {Platform.OS === 'ios' && (
                  <DateTimePicker
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
        onChangeText={setContractName}
        value={contractName}
        placeholder="Enter the Name of your Contract"

        style={styles.input}
      />
  

             <CustomInputSingup
        onChangeText={setSelectedLabel}
        value={selectedLabel}
        placeholder="Enter a description of your Contract"

        style={styles.input}
      />
             <CustomInputSingup
        onChangeText={setSelectedEmail}
        value={selectedEmail}
        placeholder="Enter email of your Contract"

        style={styles.input}
      />
</View>
       
   <View style={styles.content}>
  <TouchableOpacity style={styles.button} // Button to add a new expense
     
     onPress={() => navigation.navigate("Reminder")}>
        <Text style={styles.textButton}>Add Reminder</Text>
      </TouchableOpacity>
         
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
        flex: 10,
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "space-around",
        width: "80%",
        marginBottom: -20,
    },
  
    expireDate: {
        flex: 8,
         marginTop: 0,
        flexDirection: "row",
        justifyContent: "space-around",
        width: "60%",
    },

    datePart: {
        width: 100,
        alignItems: "center",
    },
    content: {
        flex: 20,
        marginTop: 0,
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
        flex: 1,
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 100,
        marginBottom: 100,
       
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