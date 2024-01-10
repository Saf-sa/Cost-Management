import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screen/auth/login";
import Signup from "./screen/auth/signup";
import Reset from "./screen/auth/reset";
import ResetPassword from "./screen/auth/resetPassword";
import Dashboard from "./screen//Pages/Dashboard";
import ViewIncomes from "./screen/Pages/ViewIncomes";
import MyIncomes from "./screen/Pages/MyIncomes";
import ViewExpenses from "./screen/Pages/ViewExpenses";
import MyExpenses from "./screen/Pages/MyExpenses";
import Forecast from "./screen/Pages/Forecast";
import Statistics from "./screen/Pages/Statistics";
import History from "./screen/Pages/History";
import Clothes from "./screen/Pages/Categories/Clothes";
import Foods from "./screen/Pages/Categories/Foods";
import Transport from "./screen/Pages/Categories/Transport";
import Studies from "./screen/Pages/Categories/Studies";
import MyInvoices from "./screen/Pages/Categories/MyInvoices";
import Taxes from "./screen/Pages/Categories/Taxes";
import Hobbies from "./screen/Pages/Categories/Hobbies";
import Money from "./screen/Pages/Categories/Money";
import Epargne from "./screen/Pages/Categories/Epargne";
import Bonus from "./screen/Pages/Categories/IncomeCategories/Bonus";
import Allowance from "./screen/Pages/Categories/IncomeCategories/Allowance";
import Other from "./screen/Pages/Categories/IncomeCategories/Other";
import Stocks from "./screen/Pages/Categories/IncomeCategories/Stocks";
import Salary from "./screen/Pages/Categories/IncomeCategories/Salary";
import Sales from "./screen/Pages/Categories/IncomeCategories/Sales";
import Loan from "./screen/Pages/Categories/IncomeCategories/Loan";
import Gift from "./screen/Pages/Categories/IncomeCategories/Gift";
import Rent from "./screen/Pages/Categories/IncomeCategories/Rent";
import Refund from "./screen/Pages/Categories/IncomeCategories/Refund";
import Holidays from "./screen/Pages/Categories/Holidays";
import Calculator from "./screen/Pages/Toolkits/Calculator";
import Agenda from "./screen/Pages/Toolkits/Agenda";
import Reminder from "./screen/Pages/Toolkits/Reminder";
import Download from "./screen/Pages/Toolkits/Download";
import AddReminder from "./screen/Pages/Toolkits/AddReminder"; 
import Settings from "./screen/Pages/Toolkits/Settings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';





const Stack = createStackNavigator(); // create stack navigator

export default function App() {
/*   const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem("@storage_Key");
      if (user) {
        const response = await axios.post(
          `http://localhost:5555/api/users/login`,
          { token: user.token }
        );
        if (response.status === 200) {
          console.log('User already isLoged',response.data);
          setIsLogged(true);
        }
      }
    };
    checkUser();
  }, []); */
  
  return (
    <NavigationContainer >
      {/* <Stack.Navigator initialRouteName="Login">
            {isLogged ? (
          <Stack.Screen name="Login" component={Login} />
        ) : (
           <Stack.Screen name="Dashboard" component={Dashboard} />
        )} */}
        <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
           <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Reset" component={Reset} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="ViewIncomes"  initialParams={{category:'all'}} component={ViewIncomes} />
        <Stack.Screen name="MyIncomes" component={MyIncomes} />
        <Stack.Screen name="ViewExpenses" initialParams={{category:'all'}} component={ViewExpenses} />
        <Stack.Screen name="MyExpenses" component={MyExpenses} />
        <Stack.Screen name="Forecast" component={Forecast} />
        <Stack.Screen name="Statistics" component={Statistics} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="Clothes" component={Clothes} />
        <Stack.Screen name="Foods" component={Foods} />
        <Stack.Screen name="Transport" component={Transport} />
        <Stack.Screen name="Studies" component={Studies} />
        <Stack.Screen name="MyInvoices" component={MyInvoices} />
        <Stack.Screen name="Taxes" component={Taxes} />
        <Stack.Screen name="Hobbies" component={Hobbies} />
        <Stack.Screen name="Money" component={Money} />
        <Stack.Screen name="Epargne" component={Epargne} />
        <Stack.Screen name="Holidays" component={Holidays} />
        <Stack.Screen name="Allowance" component={Allowance} />
        <Stack.Screen name="Other" component={Other} />
        <Stack.Screen name="Stocks" component={Stocks} />
        <Stack.Screen name="Loan" component={Loan} />
        <Stack.Screen name="Gift" component={Gift} />
        <Stack.Screen name="Rent" component={Rent} />
        <Stack.Screen name="Refund" component={Refund} />
        <Stack.Screen name="Sales" component={Sales} />
        <Stack.Screen name="Salary" component={Salary} />
        <Stack.Screen name="Bonus" component={Bonus} />
        <Stack.Screen name="Calculator" component={Calculator} />
        <Stack.Screen name="Agenda" component={Agenda} />
        <Stack.Screen name="Reminder" component={Reminder} />
        <Stack.Screen name="Download" component={Download} />
        <Stack.Screen name="Settings" component={ Settings} />
        <Stack.Screen name="AddReminder" component={AddReminder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
 
});
