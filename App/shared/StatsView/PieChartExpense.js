import React, { useState, useEffect } from "react";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default ViewAll = ({route}) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const expenses = await AsyncStorage.getItem('expenses');
      if (expenses) {
        const parsedExpenses = JSON.parse(expenses);

        // Group expenses by category and sum amounts
        const expensesByCategory = parsedExpenses.expenses.reduce((acc, expense) => {
          acc[expense.category] = (acc[expense.category] || 0) + Number(expense.amount);
          return acc;
        }, {});

        // Convert to chart data format
        const chartData = Object.keys(expensesByCategory).map((category, index) => ({
          name: category,
          amount: expensesByCategory[category],
          color: `#${Math.floor(Math.random()*16777215).toString(16)}`, // Generate random color
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        }));
        setChartData(chartData);
      }
    };

    fetchData();
  }, []);

  return (
    <PieChart
      data={chartData}
      width={Dimensions.get("window").width}
      height={220}
      chartConfig={{
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      }}
      accessor={"amount"}
      backgroundColor={"transparent"}
      paddingLeft={"15"}
      center={[10, 50]}
      absolute
    />
  );
};