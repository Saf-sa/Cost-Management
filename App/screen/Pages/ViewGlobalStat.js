import {
  Text,
  View,
  StyleSheet,
  Toast,
  useWindowDimensions,
  TouchableOpacity,
   ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "../../shared/components/IncomExpenseComponent/Icon";


import ShowLineChart from "../../shared/StatsView/LineChartExpense";
import IncomeLineChart from "../../shared/StatsView/LineChartIncome";





   
  const ViewGlobalStat= () => {
 const navigation = useNavigation();
  return (
    <View>
      <Text style={styles.TitleExpense}>Expenses</Text>
      <ShowLineChart/>
        <View style={styles.dashboard}>
          <TouchableOpacity onPress={() => navigation.push("ViewIncomes")}>
            <Icon
              name="dollar-sign"
              size={56}
            />
            <Text style={{ fontSize: 15, paddingTop: 5, textAlign:"center"}}> Income</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("ViewExpenses")}>
            <Icon
              name="shopping-cart"
              size={56}
        
             
            />
            <Text style={{ fontSize: 15, paddingTop: 5, textAlign:"center" }}>Expense</Text>
          </TouchableOpacity>
          
         <TouchableOpacity onPress={() => navigation.push("Forecast")}>
            <Icon
              name="file-invoice-dollar"
              size={56}
              
             
             
            />
            <Text style={{ fontSize: 15, paddingTop: 5, textAlign:"center" }}>Forecast</Text>
          </TouchableOpacity>
     
 
        </View>
      
      <Text style={styles.TitleIncome}>Incomes</Text>
      <IncomeLineChart/>

    
    </View>

   

  )
};

const styles = StyleSheet.create({
    dashboard: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: -50,
    alignItems: "center",
  },
TitleExpense: {
    color: "#E0AA3E",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,},

  TitleIncome: {
    color: "#3ABD0D",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,},
    



});

export default ViewGlobalStat;
