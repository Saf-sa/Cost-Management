import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import React, { useState, useEffect } from "react";
import {ScrollView,} from "react-native";
import Screen2 from "../components/Screen";
import moment, { months } from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";



export default ViewAll = ({}) => {
   const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState([true]);
 

  useEffect(() => {
  const fetchData = async () => {
    setIsLoading(false);
    const expenses = await AsyncStorage.getItem('expenses');
    /* console.log('Raw expenses:', expenses); // Log raw expenses data */
    if (expenses) {
      const parsedExpenses = JSON.parse(expenses);
             if (chartData && chartData.length > 0) {
               /*  console.log(" Labels:", chartData.map(data => data.date)); // Vérifiez les valeurs de "labels" */
                /* console.log(" Datasets:", chartData.map(data => data.amount)); // Vérifiez les valeurs de "datasets" */
          } /* else {
             console.log("Aucune donnée disponible."); // Log pour indiquer l'absence de données
          
                } */
      const ChartData = parsedExpenses.expenses.map(expense => {
        /* console.log('Expense:', expense); // Log each expense */
        const formattedDate = moment(expense.date).format("DD/MM");
        const amount = Number(expense.amount) || 0;
       /*  console.log('Formatted date:', formattedDate, 'Amount:', amount); // Log formatted date and amount */
        return {
          date: formattedDate,
          amount: amount,
        };
      });

      setChartData(ChartData); // Update chartData state
       setIsLoading(false);
    /*   console.log('ChartData:', ChartData); // Log chartData state */
    }
    
  };

  fetchData();
}, []);

  /* console.log(chartData); */

 /* console.log("Expenses Labels:", chartData.map(data => data.date)); // Vérifiez les valeurs de "labels" */
/* console.log("Expenses Datasets:", chartData.map(data => data.amount)); // Vérifiez les valeurs de "datasets" */


  // ...

  return (
  <ScrollView>
    
    <Screen2>
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

  