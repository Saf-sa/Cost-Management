import { LineChart } from 'react-native-chart-kit';
import { Dimensions, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from "react";
import {ScrollView,} from "react-native";
import Screen2 from "../components/Screen";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default ViewIncomes = ({}) => {

   const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
/*  console.log( 'loading Incomes after const',chartData); */

  useEffect(() => {
  const fetchData = async () => {
    const incomes = await AsyncStorage.getItem('incomes');
    /* console.log('Raw incomes:', incomes); // Log raw incomes data */
    if (incomes) {
      const parsedIncomes = JSON.parse(incomes);
      console.log('Parsed incomes:', parsedIncomes);

      const ChartData = parsedIncomes.incomes.map(income => {
        const formattedDate = moment(income.date).format("DD/MM");
        const amount = income.amount !== undefined && !isNaN(income.amount) ? Number(income.amount) : 0;
         console.log('Formatted date:', formattedDate, 'Amount:', amount); // Log formatted date and amount 
        return {
           amount: amount,
          date: formattedDate,
         
        };
      })
      console.log('ChartData:', ChartData);

      setChartData(ChartData); // Update chartData state
       setIsLoading(false);
    /*   console.log('ChartData:', ChartData); // Log chartData state */
    }
    
  };

  fetchData();
}, []);

  /* console.log(chartData); */

 /* console.log("Incomes Labels:", chartData.map(data => data.date)); // Vérifiez les valeurs de "labels" */
/* console.log("Incomes Datasets:", chartData.map(data => data.amount)); // Vérifiez les valeurs de "datasets" */


  // ...

  return (
  <ScrollView>
    
    <Screen2>

          {isLoading ? (
          <ActivityIndicator /> // Afficher un indicateur de chargement en cas de chargement
        ) : (
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
            backgroundColor: "#3ABD0D",
          backgroundGradientFrom: "#268705",
          backgroundGradientTo: "#34C403",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(155, 250, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

          style: {
            
            borderRadius: 16
          },
          propsForDots: {
              r: "3",
              strokeWidth: "2",
              stroke: "#8aa19b"
      }

        }}
        bezier
        style={{
        
          marginVertical: 60,
           marginHorizontal:7,
          borderRadius: 16,
          
        }}
  
      />
        )}
    </Screen2>
  </ScrollView>
  );

  };