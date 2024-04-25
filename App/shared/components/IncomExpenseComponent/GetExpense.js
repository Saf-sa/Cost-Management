
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";


export const useGetExpenses = (category) => {
  const [storedExpenses, setStoredExpenses] = useState([]);
  /* console.log('useGetExpenses storedExpenses',storedExpenses ) */

  useEffect(() => {
    const getExpenses = async () => {
      try {
        const user = JSON.parse(await AsyncStorage.getItem("@storage_Key"));
        const { data } = await axios.get(
          `http://localhost:5555/api/expenses/${category}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        await AsyncStorage.setItem('expenses', JSON.stringify(data));
        const expenses = await AsyncStorage.getItem('expenses');
        if (expenses) {
          const parsedExpenses = JSON.parse(expenses);
          setStoredExpenses(parsedExpenses.expenses);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getExpenses();
  }, [category]);

  return storedExpenses;
};