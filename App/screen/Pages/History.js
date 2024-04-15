import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import AppText from "../../shared/components/uiApp/AppText";
import HomeNavLog from "../nav/UserNavLogin";
import Screen2 from "../../shared/components/Screen";
import { useGetExpenses } from '../../shared/components/IncomExpenseComponent/GetExpense';
import { useGetIncomes } from '../../shared/components/IncomExpenseComponent/GetIncome';



export default  ViewAll = ({route}) => {

  const { category= 'all' } = route.params;
  const incomes = useGetIncomes(category);
  const expenses = useGetExpenses(category);
  const navigation = useNavigation(); 
/*   console.log('category from ViewExpenses ', category); */
  useEffect(() => {
    // Call the function to get data from useGetIncomes
  }, []);
  
  const calculateTotalIncomes = incomes.reduce((total, income) => total + Number(income.amount), 0);
  
  const calculateTotalExpenses = expenses.reduce((total, expense) => total + Number(expense.amount), 0);

  const all = expenses.concat(incomes);

all.sort((a, b) => new Date(a.date) - new Date(b.date));

  let index = 1;// index for scrollview

  return (// Display data from AsyncStorage
     <ScrollView
     keyboardDismissMode="on-drag"// to dismiss the keyboard when the user drags the scroll view
      onscroll={(evt) =>  (index++)}// to get the index of the scrollview
      onScrollBeginDrag={(evt) => (index++)}// to get the index of the scrollview
      >
          <View style={styles.page}>
 <Screen2 style={styles.nav}>
           {/* Button Start */}
      
        <HomeNavLog 

        
          image={require("../../assets/iconPerson.png")}
    /> 
    
   
       
      <AppText
  style={{
    color: calculateTotalIncomes - calculateTotalExpenses >= 0 ?  "green" : "red",
    fontSize: 25, top: -70,
    
  }}
>
 Balance = { calculateTotalIncomes - calculateTotalExpenses >= 0 ? `+${calculateTotalIncomes - calculateTotalExpenses}` : `${calculateTotalIncomes - calculateTotalExpenses}` } € 
</AppText>


{all.map((item, index) => (
  <View key={index} style={styles.expenseContainer}>
    <View style={styles.row}>
      <Text>Date : {item.date && !isNaN(Date.parse(item.date)) ? new Date(item.date).toISOString().split('T')[0] : 'Invalid date' }</Text>
      <Text>Categories : {item.categories.join(', ') }</Text>
    </View>
    <View style={styles.row}>
      <Text>Label : {item.label}</Text>
      <Text style={{color: expenses.includes(item) ? 'red' : 'green'}}> Amount = {item.amount}</Text>
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

  nav: {
    flex: 1,
    backgroundColor: "#F8F4D7",
   top: 10,
  },

  expenseContainer: {
    marginTop: -30,
    width: "96%",
    borderWidth: 1,
    borderColor: "#E0AA3E",
    borderRadius: 10,
    padding: 12,
    marginBottom: 40,
   
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },

  textLabel: {
    fontWeight: 'bold',
    marginBottom: 4,
    paddingRight: 8,
    paddingBottom: 8,
  },
  
    textButton:{
      color: "#E0AA3E",
      fontWeight: "bold",
      fontSize: 15,
      textAlign: "center",
    },

});

