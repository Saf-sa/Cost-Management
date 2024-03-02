import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Toast,
  useWindowDimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Screen2 from "../components/Screen";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

/* import axios from "axios"; */
// ...

export default ViewAll = ({}) => {
  const [chartData, setChartData] = useState([]);


  useEffect(() => {
    const fetchData = async (route) => {
      const expenses = await AsyncStorage.getItem('expenses');
      if (expenses) {
        const parsedExpenses = JSON.parse(expenses);
        if (chartData && chartData.length > 0) {
  console.log("Labels:", chartData.map(data => data.date)); // Vérifiez les valeurs de "labels"
  console.log("Datasets:", chartData.map(data => data.amount)); // Vérifiez les valeurs de "datasets"
}

        const chartData = parsedExpenses.expenses.map(expense => ({
          date: moment (expense.date).format("DD/MM"),
          amount: Number(expense.amount) || 0, // Ensure amount is a number, default to 0 if it's not
        }));
        setChartData(chartData);


      }
    };

    fetchData();
  }, []);

  console.log(chartData);

 console.log("Expenses Labels:", chartData.map(data => data.date)); // Vérifiez les valeurs de "labels"
console.log("Expenses Datasets:", chartData.map(data => data.amount)); // Vérifiez les valeurs de "datasets"


  // ...

  return (
  <ScrollView>
    
    <Screen2>
      {/* ... */}
      <LineChart 
        data={{
          labels: chartData.map(data => data.date),
          datasets: [
            {
              data: chartData.map(data => data.amount),
            },
          ],
        }}
        width={Dimensions.get("window").width*0.9} // from react-native
        height={210}

        yAxisSuffix="€"
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {

            borderRadius: 16

          }
        }}
        bezier
        style={{

          marginVertical: 60,
          marginHorizontal:10,
          borderRadius: 16,
          
        }}
        // ... other props for LineChart
      />
      {/* ... */}
    </Screen2>
  </ScrollView>
  )};

  