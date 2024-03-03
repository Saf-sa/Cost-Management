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
    <View style={styles.container} >
      <Text style={styles.titleExpense}>Expenses</Text>
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
      
      <Text style={styles.titleIncome}>Incomes</Text>
      <IncomeLineChart/>


    
    </View>

   

  )
};

const styles = StyleSheet.create({
  container: {
   flex: 1,
    backgroundColor: "#F8F4D7",
  },
    dashboard: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 19,
    paddingVertical: 30,
    marginLeft: 9,
    alignItems: "center",
  },
titleExpense: {
    color: "#E0AA3E",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
  
  },

  titleIncome: {
    color: "#3ABD0D",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 0,
    marginBottom: 30,
  },
    



});

export default ViewGlobalStat;
