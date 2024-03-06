import React, { useState, useEffect } from "react";
import { PieChart } from "react-native-chart-kit";
import { Dimensions, View,StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import Screen2 from "../components/Screen";

const ViewAllExpenseCat = ({}) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async (route) => {
      const expenses = await AsyncStorage.getItem("expenses");
      if (expenses) {
        const parsedExpenses = JSON.parse(expenses);
 /*        console.log("Parsed Expenses:", parsedExpenses); // Log pour vérifier les données parsées  */

        
        if (chartData && chartData.length > 0) {
/*           console.log("Expenses Labels:", chartData.map((data) => data.categories)); // Vérifiez les valeurs de "labels" */
/*           console.log("Expenses Datasets:", chartData.map((data) => data.amount)); // Vérifiez les valeurs de "datasets" */
        } else {
/*           console.log("Aucune donnée disponible."); // Log pour indiquer l'absence de données */
        }

        const expensesByCategories = parsedExpenses.expenses.reduce((acc, expense) => {
          acc[expense.categories] = (acc[expense.categories] || 0) + Number(expense.amount);
          return acc;
        }, {});
           const colorsByCategory = {
           Clothe: "#FF5733", // Orange
           Food: "#FA8144",   // Jaune
           Transport: "#954405",  // Orange
           Studie: "#F59605",  // Jaune
           Holiday: "#9B984F",  // Orange
           Tax: "#F5EE05",  // Jaune
           Hobbie: "#F3A9A9",  // Orange
           Epargne: "#FFC300",  // Jaune
           Money: "#6F0505",  // Orange
           Other: "#6F4205"  // Jaune
    };
    
   const chartData = Object.keys(expensesByCategories).map((categories, index) => ({
          name: categories,
          amount: expensesByCategories[categories],
       legendFontColor: "#7F7F7F",
          legendFontSize: 15,
          color: colorsByCategory[categories] ||  "#7F7F7F" 
    }));
/* 
  console.log('Expense Chartdata',"Chart Data:", chartData);  */
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
          height={280}
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
          center={[5, 25]}
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

export default ViewAllExpenseCat;
