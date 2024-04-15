import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import CustomButton from "../../shared/components/ui/CustomButton";
import { useNavigation } from "@react-navigation/native";
import UserNav from "../nav/UserNav";
import Screen2 from "../../shared/components/Screen";
import { useGetExpenses } from '../../shared/components/IncomExpenseComponent/GetExpense';


const ViewExpenses = ({route}) => {
   const { category= 'all' } = route.params;
  const expenses = useGetExpenses(category);

  const navigation = useNavigation();// Navigation

    useEffect(() => {
    // Call the function to get data from useGetIncomes
  }, []);
  const calculateTotalExpenses = expenses.reduce((total, expense) => total + Number(expense.amount), 0);

let index = 1;// index for scrollview

  return (// Display data from AsyncStorage
     <ScrollView style={styles.page}
     keyboardDismissMode="on-drag"// to dismiss the keyboard when the user drags the scroll view
      onscroll={(evt) =>  (index++)}// to get the index of the scrollview
      onScrollBeginDrag={(evt) => (index++)}// to get the index of the scrollview
      >
         <View >
 <Screen2>
           {/* Button Start */}
      
        <UserNav 

        
          image={require("../../assets/iconPerson.png")}
    /> 
         <View style={styles.viewExpenseButton}>
        <CustomButton
          onPress={() => navigation.navigate("MyExpenses")}
          style={styles.button}
          buttonText={"Add Expense"}
      />
        </View>

       <Text style={styles.textAmount}>Total Expenses = - {calculateTotalExpenses} € </Text>
      
    {expenses.map((expense, index) => (// Display data from AsyncStorage in a FlatList
      /* console.log('storedExpenses ', storedExpenses), */
      <View key={index} style={styles.expenseContainer}>

         
        <View style={styles.row}>
          <Text>Date : {expense.date && !isNaN(Date.parse(expense.date)) ? new Date(expense.date).toISOString().split('T')[0] : 'Invalid date'}</Text>
          <Text>Categories : {expense.categories.join(', ')}</Text>
        </View>
        <View style={styles.row}>
          <Text>Label : {expense.label}</Text>
          <Text style={{ color: "red"}}>Amount = - {expense.amount}</Text>
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
    width: "100%",
    borderWidth: 1,
    borderColor: "#E0AA3E",
    borderRadius: 10,
    padding: 12,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },

    textButton:{
      color: "#E0AA3E",
      fontWeight: "bold",
      fontSize: 15,
      textAlign: "center",
    },
    textAmount:{
      color: "red",
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center",
      top: -60,
    },
     viewExpenseButton: {
      position: "absolute",
      alignSelf: "center",
      alignItems  : "center",
      marginTop: 110,
  },
});

export default ViewExpenses;