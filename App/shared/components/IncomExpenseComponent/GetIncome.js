import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";



 const UpdateIncomes = ({}) => {
  
  const [storedIncomes, setStoredIncomes] = useState([]);// State to store data from AsyncStorage
  const navigation = useNavigation();// Navigation

  const {category} = route.params;// Get category from MyIcomes.js  
 /*  console.log('category from ViewIncomes ', category); */
  useEffect(() => {// UseEffect to get data from AsyncStorage
    const getIncomes = async () => {
      try {
           const user = JSON.parse(await AsyncStorage.getItem("@storage_Key"));// Get user data from AsyncStorage
           /* console.log('user token ',user.token);  */
        const { data } = await axios.get(
          
           /*  console.log('data ', data), */
          `http://localhost:5555/api/incomes/${category}`,// Get data in DB collection from backend in DB
                 /*    console.log('data category from backend  :', category), */
          {
            headers: {
              Authorization: `Bearer ${user.token}`,// Send token to backend
            },
            
          }
        );
         // Stocker les données récupérées dans AsyncStorage
       await AsyncStorage.setItem('incomes', JSON.stringify(data));// Store data in AsyncStorage
         /*      console.log('data received from Backend ',data);  */

        //await AsyncStorage.clear('incomes')

        const incomes = await AsyncStorage.getItem('incomes');// Get data from AsyncStorage
        if (incomes) {
       const parsedIncomes = JSON.parse(incomes);// Parse data from AsyncStorage
          setStoredIncomes(parsedIncomes.incomes); // Send data to the state
               /*  console.log('parsedExpenses FrontEnd side ',parsedExpenses);   */
        }
      } catch (error) {// Error handling
        console.log(error);// Error handling
      }
    };
   
  }, []);

}
export default UpdateIncomes;