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
    <View style={styles.container} >
    <View >
      <Text style={styles.TitleExpense}>Expenses</Text>
      <ShowPieChart/>
   
    
    </View>
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
    marginLeft: 9,
    marginTop: -30,
    alignItems: "center",
  },
TitleExpense: {
    color: "#E0AA3E",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 40,
  
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
