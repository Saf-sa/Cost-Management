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

import axios from "axios";
// ...

export default ViewAll = ({route}) => {
  // ...

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const incomes = await AsyncStorage.getItem('incomes');
      if (incomes) {
        const parsedExpenses = JSON.parse(incomes);

        const chartData = parsedExpenses.incomes.map(income => ({
          date: income.date,
          amount: Number(income.amount) || 0, // Ensure amount is a number, default to 0 if it's not
        }));
        setChartData(chartData);
      }
    };

    fetchData();
  }, []);

  console.log(chartData);

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
        width={Dimensions.get("window").width} // from react-native
        height={280}

        yAxisSuffix="k"
        chartConfig={{
          backgroundColor: "#3ABD0D",
          backgroundGradientFrom: "#268705",
          backgroundGradientTo: "#34C403",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(155, 250, 255, ${opacity})`,
          style: {

            borderRadius: 16

          }
        }}
        bezier
        style={{
          marginVertical: 60,
          marginHorizontal: -15,
          borderRadius: 14,
          
          
          
        }}
        // ... other props for LineChart
      />
      {/* ... */}
    </Screen2>
  </ScrollView>
  )};