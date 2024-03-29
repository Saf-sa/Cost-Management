import React, { useState, } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import AppText from "../../shared/components/uiApp/AppText";
import CustomInputSingup from "../../shared/components/ui/CustomInputSignup";
import CustomButton from "../../shared/components/ui/CustomButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { SelectList } from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";




const isValidDate = (date) => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
  return regex.test(date);
};

const isValidCategories = (categories) => {
  return categories !== '';
};

const isValidLabel = (label) => {
  return label !== '';
};

const isValidAmount = (amount) => {
  return !isNaN(amount);
};



const MyExpense= () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [categories, setCategories] = useState([]);
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const navigation = useNavigation();
  const [selected, setSelected] = useState('');
  const [formErrors, setFormErrors] = useState({
    date: null,
    categories: null,
    label: null,
    amount: null,
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


/* console.log(" 65 categories", categories);
 */


  const SendCategerieToBackend = (categories) => {
    //send  categories to backend
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };


  const handleChange = (value, fieldName) => {
 if (fieldName === "label") {
      setLabel(value);
    } else if (fieldName === "amount") {
      setAmount(value);
    }
   /*  console.log("95 setCategories", value); */
  };

  const handleSubmit = async () => {
    
    const formData = {

      date: selectedDate,
      categories: selected,
      label: label,
      amount: amount,
     
    };
 

    // Validation des champs
    if (!isValidDate(formData.date)) {
      updateError(
        "date",
        !isValidDate(formData.date) ? "Please enter a valid date" : null
      );
    }

    if (!isValidCategories(formData.categories)) {
      updateError(
        "categories",
        !isValidCategories(formData.categories)
          ? "Please choose a valid category"
          : null
      );
    }

    if (!isValidLabel(formData.label)) {
      updateError(
        "label",
        !isValidLabel(formData.label)
          ? "Please enter a description"
          : null
      );
    }

    if (!isValidAmount(formData.amount)) {
      updateError(
        "amount",
        !isValidAmount(formData.amount)
          ? "Please enter a valid amount"
          : null
      );
    }

   /*  console.log("formData", formData); */
  try {
        // Récupérer les données de l'utilisateur à partir de AsyncStorage
      const user = JSON.parse(await AsyncStorage.getItem("@storage_Key"));
      // await AsyncStorage.setItem("@storage_Key", jsonValue);

/*       console.log("149 get user Token from storage_Key ", user); */
      /*  console.log("150 response.data", user.id); */
      const response = await axios.post(
        `http://localhost:5555/api/expenses`,
        formData,
        {
          headers: {
            authorization: `Bearer ${user.token}` 
          },
        } 
      );

     
     /*  console.log('data send to BE',response.data); */
      
      
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
   /*    console.log("Test Myexpense", err.response.data); */
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
        <LinearGradient
          style={styles.parentContainer}
          colors={["#f9f295", "#E0AA3E", "#F7EF8A", "#B88A44"]}
          start={{ x: 0.1, y: 0.1 }}
          end={{ x: 1, y: 3 }}
        >
          <View style={styles.balanceContainer}>
            <AppText style= {{ flexDirection: 'row' }}>
                     <View>
                <Text style={{ fontSize: 36, color:'blue', lineHeight: 35 }}>€</Text>
                </View>
                 <View>
                <Text style={{ fontSize: 45, color:'dodgerblue', lineHeight:45}}>X</Text>
                </View>
                 <View>
                <Text style={{ fontSize: 22, color:'midnightblue', lineHeight: 21 }}>penses Manager</Text>
                
                </View>

               
            </AppText>
              <View>
                <Text style={{ fontSize: 18, color:'brown', lineHeight: 50, }}>Add a New Expense</Text>
                
                </View>
          </View>

        </LinearGradient>
     
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

          <Text style={styles.category}>Categories</Text>
          <SelectList
            dropdownStyles={{
              borderColor: '#E0AA3E',
              borderWidth: 1,
              borderRadius: 6,
            }}
            boxStyles={{ borderRadius: 6, borderColor: '#E0AA3E', height: 40 }}
            defaultOption={{ value: 'Select a category' }}
            label="Categories"
             setSelected={(value) => setSelected(value)}
            value={categories}
            data={[
               "Clothe",
               "Food",
               "Transport",
               "Studie",
               "Holiday",
               "Tax",
               "Hobbie",
               "Epargne",
               "Money",
              "epargne",
               "Other",
            ]}
            save="value"
            categories={"value"}
            search={false}
            errorMessage={formErrors.categories}
          />

          <CustomInputSingup
            label="Label"
            value={label}
            onChangeText={(value) => handleChange(value, "label")}
            placeholder="Description of your expense"
            secure={false}
            errorMessage={formErrors.label}
          />
          <CustomInputSingup
            label="Amount"
            value={amount}
            onChangeText={(value) => handleChange(value, "amount")}
            placeholder="Amount should be a number 0000.00"
            secure={false}
            errorMessage={formErrors.amount}
          />
        </ScrollView>
      </View>
<View style={styles.ExpenseButton}>
      <CustomButton
        onPress={handleSubmit}
        style={styles.button}
        buttonText={"New Expense"}
      />
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
    balanceContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 250,
   marginTop : -60,

  },

    parentContainer: {
    flexDirection: "column",
    borderRadius: 10,
    marginHorizontal: 50,
    marginVertical: 40,
    marginBottom: 10,
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
    ExpenseButton: {
    position: "absolute",
    alignSelf: "center",
    marginTop: 670,
  },
});
