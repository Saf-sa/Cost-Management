import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import SendButton from "../../shared/components/uiApp/AppSendButton";
import { useNavigation } from "@react-navigation/native";
import {HomeNavLog} from "../nav/UserNavLogin";
import Screen2 from "../../shared/components/Screen";
import { useGetExpenses } from '../../shared/components/IncomExpenseComponent/GetExpense';

const ViewExpenses = ({route}) => {
  const { category= 'all' } = route.params;
  const expenses = useGetExpenses(category);
  const navigation = useNavigation();// Navigation


 /*  console.log('category from ViewExpenses ', category); */
  
      useEffect(() => {
    // Call the function to get data from useGetIncomes
  }, []);
  const calculateTotalExpenses = expenses.reduce((total, expense) => total + Number(expense.amount), 0);

let index = 1;// index for scrollview

  return (// Display data from AsyncStorage
   <View style={styles.container}>
  <View style={styles.nav}>
   <HomeNavLog image={require("../../assets/iconPerson.png")}   /> 
 
    </View>
         <View style={styles.viewExpenseButton}>
        <SendButton
          onPress={() => navigation.navigate("MyExpenses")}
          style={styles.button}
          sendButtonText={"Add Expense"}
      />
        </View>
       <Text style={styles.textAmount}>Total Expenses = - {calculateTotalExpenses} € </Text>
      
     <ScrollView 
     keyboardDismissMode="on-drag"// to dismiss the keyboard when the user drags the scroll view
      onscroll={(evt) =>  (index++)}// to get the index of the scrollview
      onScrollBeginDrag={(evt) => (index++)}// to get the index of the scrollview
      >
        <Screen2>
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
      </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
    height:20,
    backgroundColor: "#F8F4D7",
   marginTop: -50,
   padding:5,
     
   
   
  },

  nav:{
  top:-11,
paddingLeft:10,
paddingRight:10,

},
  expenseContainer: {
      top:58,
    marginBottom: 10,
    width: "100%",
    height:"90",
    borderWidth: 1,
    borderColor: "#E0AA3E",
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
   
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:"center",
    padding:2,

  },
    textAmount:{
      color: "red",
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center",
      marginTop: -20,
    },
     viewExpenseButton: {
      position: "absolute",
      alignSelf: "center",
      alignItems  : "center",
      marginTop: 70,
  },
});

export default ViewExpenses;