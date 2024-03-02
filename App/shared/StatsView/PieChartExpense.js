import React, { useState, useEffect } from "react";
import { PieChart } from "react-native-chart-kit";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import Screen2 from "../components/Screen";

const ViewAll = ({}) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async (route) => {
      const expenses = await AsyncStorage.getItem("expenses");
      if (expenses) {
        const parsedExpenses = JSON.parse(expenses);
        console.log("Parsed Expenses:", parsedExpenses); // Log pour vérifier les données parsées 

        
        if (chartData && chartData.length > 0) {
          console.log("Expenses Labels:", chartData.map((data) => data.categories)); // Vérifiez les valeurs de "labels"
          console.log("Expenses Datasets:", chartData.map((data) => data.amount)); // Vérifiez les valeurs de "datasets"
        } else {
          console.log("Aucune donnée disponible."); // Log pour indiquer l'absence de données
        }

        const expensesByCategories = parsedExpenses.expenses.reduce((acc, expense) => {
          acc[expense.categories] = (acc[expense.categories] || 0) + Number(expense.amount);
          return acc;
        }, {});
   const chartData = Object.keys(expensesByCategories).map((categories, index) => ({
          name: categories,
          amount: expensesByCategories[categories],
       legendFontColor: "#7F7F7F",
          legendFontSize: 15,
          color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Générer une couleur aléatoire
    }));

  console.log("Chart Data:", chartData); 
        setChartData(chartData);
      
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Screen2>
        
        <PieChart
          data={chartData}
          width={Dimensions.get("window").width}
          height={300}
          chartConfig={{
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#E0AA3E",
            backgroundGradientTo: "#ffa726",
            backgroundGradientToOpacity: 0.5, // Opacité du dégradé de fond

          }}
          accessor={"amount"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          center={[5, 20]}
          absolute
          style={{ borderRadius: 16 }} // Ajouter un rayon de bordure
        />
      </Screen2>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    
  },
});

export default ViewAll;
