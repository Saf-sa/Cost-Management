import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import ViewIncomes, { calculateTotalIncomes } from "./ViewIncomes";
import ViewExpenses, { calculateTotalExpenses } from "./ViewExpenses";
import AppText from "../../shared/components/uiApp/AppText";
import UserNav from "../nav/UserNav";
import Screen2 from "../../shared/components/Screen";
import Icon from "../../shared/components/IncomExpenseComponent/Icon";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

const History = ({ route }) => {
const { storedExpenses, storedIncomes, setStoredExpenses, setStoredIncomes } = route.params;

  


  const navigation = useNavigation();
  

  useEffect(() => {
    const getIncomes = async () => {
      try {
        const incomes = await AsyncStorage.getItem("incomes");
         console.log('Incomes ',incomes);
        if (incomes) {
          const parsedIncomes = JSON.parse(incomes);
          setStoredIncomes(parsedIncomes.incomes);
        }
      } catch (error) {
        console.log(error);
        
      }
    };

    const getExpenses = async () => {
      try {
        const expenses = await AsyncStorage.getItem("expenses");
           console.log('Expenses ',expenses);
        if (expenses) {
          const parsedExpenses = JSON.parse(expenses);
          setStoredExpenses(parsedExpenses.expenses);
        }
      } catch (error) {
       
        console.log(error);
      }
    };

    getIncomes();
    getExpenses();
   
  }, []);

  const totalIncomes = storedIncomes
    ? storedIncomes.reduce((total, income) => total + income.amount, 0)
    : 0;
    console.log('totalIncomes ',totalIncomes);
  const totalExpenses = storedExpenses
    ? storedExpenses.reduce((total, expense) => total + expense.amount, 0)
    : 0;
console.log('totalExpenses ',totalExpenses);
  const allOperations = [...storedIncomes, ...storedExpenses].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  console.log('allOperations ',allOperations);

  return (
    <ScrollView>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>
          Total Balance: {totalIncomes - totalExpenses} €
        </Text>
      </View>
      <View>
        <Text style={styles.title}>All Operations</Text>
        {allOperations.map((operation, index) => (
          <View key={index} style={styles.operationContainer}>
            <Text>
              Date:{" "}
              {operation.date &&
              !isNaN(Date.parse(operation.date)) ? (
                new Date(operation.date).toISOString().split("T")[0]
              ) : (
                "Invalid date"
              )}
            </Text>
            <Text>
              Categories: {operation.categories.join(", ")}
            </Text>
            <Text>
              Label: {operation.label}
            </Text>
            <Text>
              Amount: {operation.amount} €
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  balanceContainer: {
    backgroundColor: "#E0AA3E",
    padding: 10,
    marginBottom: 10,
  },
  balanceText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  operationContainer: {
    marginTop: -30,
    width: "96%",
    borderWidth: 1,
    borderColor: "#E0AA3E",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    marginVertical: 8,
    backgroundColor: "#F7F7F7",
  },
});

export default History;
