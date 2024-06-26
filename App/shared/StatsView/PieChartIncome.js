import React, { useState, useEffect } from "react";
import { PieChart } from "react-native-chart-kit";
import { Dimensions, View,StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Screen2 from "../components/Screen";

const ShowPieChartIncomes = ({}) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const incomes = await AsyncStorage.getItem("incomes");
      if (incomes) {
        const parsedIncomes = JSON.parse(incomes);
/*         console.log("Parsed Incomes:", parsedIncomes); // Log pour vérifier les données parsées  */

        
        if (chartData && chartData.length > 0) {
/*           console.log("Incomes Labels:", chartData.map((data) => data.categories)); // Vérifiez les valeurs de "labels" */
       /*    console.log("Incomes Datasets:", chartData.map((data) => data.amount)); // Vérifiez les valeurs de "datasets" */
        } else {
/*           console.log("Aucune donnée disponible."); // Log pour indiquer l'absence de données */
        }

        const incomesByCategories = parsedIncomes.incomes.reduce((acc, income) => {
          acc[income.categories] = (acc[income.categories] || 0) + Number(income.amount);
          return acc;
        }, {});

        const colorsByCategory = {
           Salary: "#62F607", // Orange
           Bonus: "#75F39B",   // Jaune
           Loan: "#60FBCE",  // Orange
           Sales: "#08EEE0",  // Jaune
           Gift: "#047871",  // Orange
           Rent: "#317A03",  // Jaune
           Allowance: "#044C78",  // Orange
           Refund: "#06A1FF",  // Jaune
           Stocks: "#1106FF",  // Orange
           Other: "#9F9BF0"  // Jaune
    };
 
   const chartData = Object.keys(incomesByCategories).map((categories, index) => ({
          name: categories,
          amount: incomesByCategories[categories],
       legendFontColor: "#7F7F7F",
          legendFontSize: 15,
          color: colorsByCategory[categories] ||  "#7F7F7F" 
    }));

/*  console.log('income ',"Chart Data:", chartData);  */
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

export default ShowPieChartIncomes;
