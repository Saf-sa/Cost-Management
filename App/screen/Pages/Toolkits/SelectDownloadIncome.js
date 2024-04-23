import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import Card from "../../../shared/components/uiApp/Card";
import SendButton from '../../../shared/components/uiApp/AppSendButton'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { useGetIncomes } from "../../../shared/components/IncomExpenseComponent/GetIncome";
import usePDFGenerator from "../../../shared/components/uiApp/PdfGenerator";

const isValidDate = (date) => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
  return regex.test(date);
};

const SelectDownloadIncome= (route) => {
  const { category = 'all' } = route.params;
  const incomes = useGetIncomes(category);
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const navigation = useNavigation();
  const [formErrors, setFormErrors] = useState({
    selectedStartDate: null,
    selectedEndDate: null,
  });
   console.log("getIncomes before submit", incomes);

   let filteredIncomes = incomes;
 console.log("filteredExpenses :", filteredExpenses);

    const handleGeneratePDF = () => {
    generatePDF(incomes);
  };

  const handleSubmit = () => {
    // Filtrer les dépenses en fonction des dates sélectionnées
    const filteredIncomes = incomes.filter(income => {
      const incomeDate = moment(income.date, 'DD/MM/YYYY');
      const startDate = moment(selectedStartDate, 'DD/MM/YYYY');
      const endDate = moment(selectedEndDate, 'DD/MM/YYYY');
      const label = moment(label);
      const amount = moment(amount);
      return incomeDate.isBetween(startDate, endDate, null, '[]' ) 
      && incomeLabel.isBetween(label,null, '[]')
       && incomeAmoount.isBetween(amount,null, '[]');
      
    });
    console.log("Incomes filtrées :", filteredIncomes);
 // Simuler la création du PDF (remplacez cette partie par votre logique de création de PDF réelle)
    const isPdfCreatedSuccessfully = false; // Remplacez cela par votre logique réelle

    if (isPdfCreatedSuccessfully) {
      // Afficher un message de succès
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "PDF Income created successfully",
        visibilityTime: 3000,
        autoHide: true,
      });

      // Rediriger vers la page de téléchargement après 3 secondes
      setTimeout(() => {
        navigation.navigate("Download");
      }, 3000);
    } else {
      // Afficher un message d'erreur
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Error creating PDF Income",
        visibilityTime: 3000,
        autoHide: true,
      });
    }
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
          {!pdfData && (
        <SendButton onPress={handleGeneratePDF} 
        sendButtonText={"Create PDF"}
        style={styles.button}
         />
      )}
      {pdfData && (
        <PDFViewer style={{ flex: 1 }}>
          <Document data={pdfData} />
        </PDFViewer>
      )}
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
  button: {
    alignSelf: "center",
    marginButton: 200,
  },
});
