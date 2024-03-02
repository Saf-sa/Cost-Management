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


import ShowPieChart from "../../shared/StatsView/PieChartExpense";


   
  const ViewGlobalStat= () => {
 const navigation = useNavigation();
  return (
    <View>
      <Text style={styles.TitleExpense}>Expenses</Text>
      <ShowPieChart/>
       
    
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
