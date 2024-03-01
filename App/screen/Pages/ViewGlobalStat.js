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


import ShowLineChart from "../../shared/StatsView/LineChartExpense";
import IncomeLineChart from "../../shared/StatsView/LineChartIncome";






  const ViewGlobalStat= () => {

  return (
    <View>
      <Text style={styles.TitleExpense}>Expenses</Text>
      <ShowLineChart/>
      
      <Text style={styles.TitleIncome}>Incomes</Text>
      <IncomeLineChart/>

    
    </View>

   

  )
};

const styles = StyleSheet.create({
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
