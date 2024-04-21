import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SendButton from "../../shared/components/uiApp/AppSendButton";
import { HomeNavLog } from "../nav/UserNavLogin";
import Screen2 from "../../shared/components/Screen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetIncomes } from '../../shared/components/IncomExpenseComponent/GetIncome';

const ViewIncomes = ({ route }) => {
  const { category = 'all' } = route.params;
  const incomes = useGetIncomes(category);
  const navigation = useNavigation(); // Navigation

  useEffect(() => {
    // Call the function to get data from useGetIncomes
  }, []);

  const calculateTotalIncomes = incomes.reduce((total, income) => total + Number(income.amount), 0);

  return (
    <View style={styles.container}>
<View style={styles.nav}>
        <HomeNavLog image={require("../../assets/iconPerson.png")} />
</View>
              <View style={styles.viewIncomesButton}>
            <SendButton
              onPress={() => navigation.navigate("MyExpenses")}
              style={styles.button}
              sendButtonText={"Add Expense"}
            />
          </View>
           
         <Text style={styles.textAmount}>Total Incomes = - {calculateTotalIncomes} € </Text>
  
      <ScrollView
        style={styles.scrollView}
        keyboardDismissMode="on-drag"
        // onScroll={(evt) =>  (index++)} // No need for this event
        // onScrollBeginDrag={(evt) => (index++)} // No need for this event
      >
        <Screen2>
        
          {incomes.map((income, index) => (
            <View key={index} style={styles.incomeContainer}>
              <View style={styles.row}>
                <Text>Date : {income.date && !isNaN(Date.parse(income.date)) ? new Date(income.date).toISOString().split('T')[0] : 'Invalid date'}</Text>
                <Text>Categories : {income.categories.join(', ')}</Text>
              </View>
              <View style={styles.row}>
                <Text>Label : {income.label}</Text>
                <Text style={{ color: "green" }}>Amount = + {income.amount}</Text>
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
  scrollView: {
   
    flex: 1,
  },
nav:{
  top:-11,
paddingLeft:10,
paddingRight:10,

},
  incomeContainer: {
  top:58,
    
    marginBottom: 10,
    width: "100%",
    height:"90",
    borderWidth: 1,
    borderColor: "#E0AA3E",
    borderRadius: 10,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textAmount: {
    color: "green",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginTop: -20,
  },
  viewIncomesButton: {
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 70,
  },
});

export default ViewIncomes;
