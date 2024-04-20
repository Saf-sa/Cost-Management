import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

const useEntryData = (entryType, subCategory) => {
  const [entryData, setEntryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(await AsyncStorage.getItem("@storage_Key"));
        let url = `http://localhost:5555/api/${entryType}`;
        if (subCategory) {
          url += `/${subCategory}`;
        }
        const { data } = await axios.get(
          url,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        await AsyncStorage.setItem(entryType, JSON.stringify(data));
        const storedData = await AsyncStorage.getItem(entryType);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setEntryData(parsedData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [entryType, subCategory]);

  return entryData;
};

export default useEntryData;
