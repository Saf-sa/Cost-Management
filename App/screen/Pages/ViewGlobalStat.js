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
          <TouchableOpacity onPress={() => navigation.push("ViewCategorieStat")}>
            <Icon
              name="chart-pie"
              size={60}
            />
            <Text style={{ fontSize: 14, paddingTop: 5, textAlign:"center"}}>Category</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("ViewExpenses")}>
            <Icon
              name="chart-line"
              size={60}
        
             
            />
            <Text style={{ fontSize: 14, paddingTop: 5, textAlign:"center" }}>Week</Text>
          </TouchableOpacity>
          
         <TouchableOpacity onPress={() => navigation.push("Forecast")}>
            <Icon
              name="chart-bar"
              size={60}
              
             
             
            />
            <Text style={{ fontSize: 14, paddingTop: 5, textAlign:"center" }}>Month</Text>
          </TouchableOpacity>
     
 
        </View>
      
      <Text style={styles.TitleIncome}>Incomes</Text>
      <IncomeLineChart/>
     <View style={styles.dashboard}>
          <TouchableOpacity onPress={() => navigation.push("ViewIncomes")}>
            <Icon
              name="chart-pie"
              size={60}
            />
            <Text style={{ fontSize: 13, paddingTop: 5, textAlign:"center"}}> Category</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("ViewExpenses")}>
            <Icon
              name="chart-line"
              size={60}
        
             
            />
            <Text style={{ fontSize: 14, paddingTop: 5, textAlign:"center" }}>Week</Text>
          </TouchableOpacity>
          
         <TouchableOpacity onPress={() => navigation.push("Forecast")}>
            <Icon
              name="chart-bar"
              size={60}
              
             
             
            />
            <Text style={{ fontSize: 14, paddingTop: 5, textAlign:"center" }}>Month</Text>
          </TouchableOpacity>
     
 
        </View>

    
    </View>

   

  )
};

const styles = StyleSheet.create({
    dashboard: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 19,
    marginLeft: 9,
    marginTop: -30,
    alignItems: "center",
  },
TitleExpense: {
    color: "#E0AA3E",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 20,
  
  },

  TitleIncome: {
    color: "#3ABD0D",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 20,
  },
    



});

export default ViewGlobalStat;
