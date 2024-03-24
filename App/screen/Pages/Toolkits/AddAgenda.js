import React, { useState, } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import AuthHeader from "../../../shared/components/AuthHeader";
import CustomInputSingup from "../../../shared/components/ui/CustomInputSignup";
import CustomButton from "../../../shared/components/ui/CustomButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { SelectList } from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";


const isValidDate = (date) => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
  return regex.test(date);
};

const isValidName = (name) => {
  return name !== '';
};

const isValidPlace = (place) => {
  return place !== '';
};

const isValidDuration = (duration) => {
  return !isNaN(duration);
};


const AddAgenda= () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [duration, setDuration] = useState("");
  const navigation = useNavigation();
  const [selected, setSelected] = useState('');
  const [formErrors, setFormErrors] = useState({
    date: null,
    name: null,
    place: null,
    duration: null,
  });

  const handleConfirm = (date) => {
    hideDatePicker();
    const formattedDate = moment(date).format("YYYY-MM-DD");
    setSelectedDate(formattedDate);
    sendDateToBackend(formattedDate);
  };


  const sendDateToBackend = (date) => {
    // send date to backend
  };


/*  console.log(" 61 categories", date); */



  const SendNameToBackend = (name) => {
    //send  categories to backend
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };


  const handleChange = (value, fieldName) => {
 if (fieldName === "duration") {
      setDuration(value);
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
      duration: duration,
     
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
        navigation.navigate("Agenda");
      }, 3000);
    } catch (err) {
     console.log("Test AddAgenda", err.response.data); 
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
      <AuthHeader subtext="Please add a new Rdv" />
      <View style={styles.content}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.category}>Date</Text>
          <TextInput
            style={styles.inputContainer}
            label="Date"
            value={selectedDate}
            placeholder="DD/MM/YYYY"
            secureTextEntry={false}
            onFocus={showDatePicker}
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          <Text style={styles.category}>Duration</Text>
          <SelectList
            dropdownStyles={{
              borderColor: '#E0AA3E',
              borderWidth: 1,
              borderRadius: 6,
            }}
            boxStyles={{ borderRadius: 6, borderColor: '#E0AA3E', height: 40 }}
            defaultOption={{ value: 'Select a duration' }}
            label="duration"
             setSelected={(value) => setSelected(value)}
            value={duration}
            data={[
               "15mn",
               "30mn",
               "45mn",
               "1h",
               "2h",
               "3h",
               "4h",
               "Day",
               "7 days",
               "2 weeks",
               "1 month",
            ]}
            save="value"
            categories={"value"}
            search={false}
            errorMessage={formErrors.categories}
          />

          <CustomInputSingup
            label="name"
            value={name}
            onChangeText={(value) => handleChange(value, "name")}
            placeholder="Description of your Rdv"
            secure={false}
            errorMessage={formErrors.name}
          />
          <CustomInputSingup
            label="Place"
            value={place}
            onChangeText={(value) => handleChange(value, "place")}
            placeholder="Enter the place of your Rdv"
            secure={false}
            errorMessage={formErrors.place}
          />
        </ScrollView>
      </View>

      <CustomButton
        onPress={handleSubmit}
        style={styles.button}
        buttonText={"New Agenda"}
      />

      <Toast />
    </View>
  );
};

export default AddAgenda;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 2,
    padding: 10,
    marginTop: 10,
  },
  inputContainer: {
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
});
