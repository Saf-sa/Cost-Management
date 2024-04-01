import {
  Text,
  View,
  StyleSheet,
  Toast,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "../../shared/components/IncomExpenseComponent/Icon";
import ShowLineChart from "../../shared/StatsView/LineChartExpense";
import IncomeLineChart from "../../shared/StatsView/LineChartIncome";
/* import getExpenses from "./ViewExpenses";
import getIncomes from './ViewIncomes'; */



  const ViewGlobalStat= () => {
 const navigation = useNavigation();
   const [isLoading, setIsLoading] = useState(true);
   useEffect(() => {
    const loadData = async () => {
      // Simulez le chargement des données avec un délai
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false); // Définissez l'état de chargement sur false après le chargement des données
    };
 
    loadData();
  }, []);
/* 
  if (isLoading) {
    return <Text>Loading...</Text>; // Vous pouvez rendre un composant de chargement ou tout autre chose pendant le chargement des données
  } */

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
