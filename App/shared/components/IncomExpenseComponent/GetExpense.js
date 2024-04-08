import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserToken } from './UserToken';

export const getExpenses = async (category, setExpenses) => {
  try {
    const token = await getUserToken();
    const { data } = await axios.get(
      `http://localhost:5555/api/expenses/${category}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data && data.expenses) {
      setExpenses(data.expenses);
    }
  } catch (error) {
    console.error(error);
  }
};