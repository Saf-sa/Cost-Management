import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserToken } from './UserToken';

export const getIncomes = async (category, setIncomes) => {
  try {
    const token = await getUserToken();
    const { data } = await axios.get(
      `http://localhost:5555/api/incomes/${category}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data && data.incomes) {
      setIncomes(data.incomes);
    }
  } catch (error) {
    console.error(error);
  }
};