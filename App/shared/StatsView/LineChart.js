import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView,  StatusBar, Dimensions,  } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph } from 'react-native-chart-kit';

import RNPickerSelect from 'react-native-picker-select';
import moment from "moment";

import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';



const ShowLineChart = ({route}) => {
    const [data, setData] = useState([]); 
  const [selectedInterval, setSelectedInterval] = useState('weekly');
  const [storedExpenses, setStoredExpenses] = useState([]);// State to store data from AsyncStorage
  const navigation = useNavigation();// Navigation
/* 
  const {category} = route */

  useEffect(() => {// UseEffect to get data from AsyncStorage
    const getExpenses = async () => {
      try {
           const user = JSON.parse(await AsyncStorage.getItem("@storage_Key"));// Get user data from AsyncStorage
           console.log('user token ',user.token); 
        const { data } = await axios.get(
          
            console.log('data ', data),
          `http://localhost:5555/api/expenses/${category}`,// Get data in DB collection from backend in DB
  console.log('data category from backend  :', category), 
          {
            headers: {
              Authorization: `Bearer ${user.token}`,// Send token to backend
            },
            
          }
        );
         // Stocker les données récupérées dans AsyncStorage
       await AsyncStorage.setItem('expenses', JSON.stringify(data));// Store data in AsyncStorage
         /*      console.log('data received from Backend ',data);  */

        //await AsyncStorage.clear('expenses')

        const expenses = await AsyncStorage.getItem('expenses');// Get data from AsyncStorage
        if (expenses) {
       const parsedExpenses = JSON.parse(expenses);// Parse data from AsyncStorage
          setStoredExpenses(parsedExpenses.expenses); // Send data to the state
               /*  console.log('parsedExpenses FrontEnd side ',parsedExpenses);   */
        }
      } catch (error) {// Error handling
        console.log(error);// Error handling
      }
    };

    getExpenses();// Call the function to get data from AsyncStorage

  }, []);

  

  const filterDataByInterval = () => {
    // Implémentez la logique de filtrage en fonction de selectedInterval
    if (selectedInterval === 'weekly') {
      // Filtrer les données pour la semaine courante (du lundi au dimanche)
      const startOfWeek = moment().startOf('week');
      const endOfWeek = moment().endOf('week');

      return storedExpenses.filter(expense =>
        moment(expense.date).isBetween(startOfWeek, endOfWeek, null, '[]')
      );
    } else if (selectedInterval === 'monthly') {
      // Filtrer les données pour le mois en cours (du 1er au dernier jour du mois)
      const startOfMonth = moment().startOf('month');
      const endOfMonth = moment().endOf('month');

      return storedExpenses.filter(expense =>
        moment(expense.date).isBetween(startOfMonth, endOfMonth, null, '[]')
      );
    } else if (selectedInterval === 'quarterly') {
      // Filtrer les données pour le trimestre en cours (3 mois à partir de janvier)
      const startOfQuarter = moment().startOf('quarter');
      const endOfQuarter = moment().endOf('quarter');

      return storedExpenses.filter(expense =>
        moment(expense.date).isBetween(startOfQuarter, endOfQuarter, null, '[]')
      );
    } else if (selectedInterval === 'annual') {
      // Filtrer les données pour l'année en cours (du 1er janvier au 31 décembre)
      const startOfYear = moment().startOf('year');
      const endOfYear = moment().endOf('year');

      return storedExpenses.filter(expense =>
        moment(expense.date).isBetween(startOfYear, endOfYear, null, '[]')
      );
    } else {
      return storedExpenses;
    }
  };

  const filteredData = filterDataByInterval();

  const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};
   


  return (

    
        <ScrollView
     keyboardDismissMode="on-drag"// to dismiss the keyboard when the user drags the scroll view
      onscroll={(evt) =>  (index++)}// to get the index of the scrollview
      onScrollBeginDrag={(evt) => (index++)}// to get the index of the scrollview
      >
   <View>
  <Text>Expenses </Text>
  <LineChart
    data={{
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
</View>
     </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  
});


export default ShowLineChart;