import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import Card from "../../../shared/components/uiApp/Card";
import SendButton from '../../../shared/components/uiApp/AppSendButton'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetExpenses } from "../../../shared/components/IncomExpenseComponent/GetExpense";

const isValidDate = (date) => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
  return regex.test(date);
};

const SelectDownloadExpense= ({ route }) => {
  const { category = 'all' } = route.params;
  const expenses = useGetExpenses(category);
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false); 
  const navigation = useNavigation();
  const [formErrors, setFormErrors] = useState({
    selectedStartDate: null,
    selectedEndDate: null,
  });

  const handleSubmit = () => {
    // Filtrer les dépenses en fonction des dates sélectionnées
    const filteredExpenses = expenses.filter(expense => {
      const expenseDate = moment(expense.date, 'DD/MM/YYYY');
      const startDate = moment(selectedStartDate, 'DD/MM/YYYY');
      const endDate = moment(selectedEndDate, 'DD/MM/YYYY');
      return expenseDate.isBetween(startDate, endDate, null, '[]');
    });

    // Utilisez les données filtrées pour créer le PDF ou effectuer d'autres opérations nécessaires
    console.log("Dépenses filtrées :", filteredExpenses);

    // Vous pouvez ajouter ici la logique pour créer le PDF avec les dépenses filtrées
  };

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
    default: 
      break;
  }
};
  return (
    <View style={styles.root}>
      <Card/>
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
            label="End Date"
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
            <SendButton
        onPress={handleSubmit}
        style={styles.button}
        sendButtonText={"Create PDF"}
      />
        </ScrollView>
      </View>
    
      <Toast />
    </View>
  );
};

export default SelectDownloadExpense;

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
  category: {
    color: "#E0AA3E",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    alignSelf: "center",
    marginButton: 200,
  },
});
