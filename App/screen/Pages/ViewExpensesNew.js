import {
  View,
  Text,
  StyleSheet, 
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../shared/components/ui/CustomButton";
import UserNav from "../nav/UserNav";
import Screen2 from "../../shared/components/Screen";

import { getExpenses } from './GetExpenses';

const ViewExpensesNew = ({route}) => {
  const [storedExpenses, setStoredExpenses] = useState([]);
  const navigation = useNavigation();
  const {category} = route.params;

  useEffect(() => {
    getExpenses(category, setStoredExpenses);
  }, [category]);

  const calculateTotalExpenses = storedExpenses.reduce((total, expense) => total + Number(expense.amount), 0);

  return (
     <ScrollView style={styles.page}
     keyboardDismissMode="on-drag"
      onScroll={(evt) =>  {/* handle scroll event */}}
      onScrollBeginDrag={(evt) => {/* handle scroll begin drag event */}}
      >
       <View >  
<Screen2 >
        <UserNav 
          image={require("../../assets/iconPerson.png")}
    /> 
     <View style={styles.viewExpensesButton}>
        <CustomButton
          onPress={() => navigation.navigate("MyExpenses")}
          style={styles.button}
          buttonText={"Add Expense"}
      />
        </View>
       
        <Text style={styles.textAmount}>Total Expenses = + {calculateTotalExpenses} € </Text>
      
    {storedExpenses.map((expense, index) => (
      <View key={index} style={styles.expenseContainer}>
        <View style={styles.row}>
          <Text>Date : {expense.date && !isNaN(Date.parse(expense.date)) ? new Date(expense.date).toISOString().split('T')[0] : 'Invalid date'}</Text>
          <Text>Categories : {expense.categories.join(', ')}</Text>
        </View>
        <View style={styles.row}>
          <Text>Label : {expense.label}</Text>
          <Text style={{ color: "green"}}>Amount = + {expense.amount}</Text>
        </View>
      </View>
    ))}
    </Screen2>
     </View>
  </ScrollView>
  );
};
const styles = StyleSheet.create({
    page: {
    flex: 1,
backgroundColor: "#F8F4D7",
  },
  expenseContainer: {
    marginTop: 20,
    width: "96%",
    borderWidth: 1,
    borderColor: "#E0AA3E",
    borderRadius: 10,
    padding: 12,

    
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },

    textButton:{
      color: "#E0AA3E",
      fontWeight: "bold",
      fontSize: 15,
      textAlign: "center",
    },
      textAmount:{
      color: "green",
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center",
      top: -70,
    },
      viewExpensesButton: {
    position: "absolute",
    alignSelf: "center",
    alignItems  : "center",
    marginTop: 110,
  },
});

export default ViewExpensesNew;
