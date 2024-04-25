import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

export const useGetIncomes = (category) => {
  const [storedIncomes, setStoredIncomes] = useState([]);
/* console.log('useGetIncomes storedIncomes',storedIncomes ) */
  useEffect(() => {
    const getIncomes = async () => {
      try {
        const user = JSON.parse(await AsyncStorage.getItem("@storage_Key"));
        const { data } = await axios.get(
          `http://localhost:5555/api/incomes/${category}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        await AsyncStorage.setItem('incomes', JSON.stringify(data));
        const incomes = await AsyncStorage.getItem('incomes');
        if (incomes) {
          const parsedIncomes = JSON.parse(incomes);
          setStoredIncomes(parsedIncomes.incomes);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getIncomes();
  }, [category]);

  return storedIncomes;
};
