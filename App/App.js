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
import Clothe from "./screen/Pages/Categories/Clothe";
import Food from "./screen/Pages/Categories/Food";
import Transport from "./screen/Pages/Categories/Transport";
import Studie from "./screen/Pages/Categories/Studie";
import MyInvoice from "./screen/Pages/Categories/MyInvoice";
import Tax from "./screen/Pages/Categories/Tax";
import Hobbie from "./screen/Pages/Categories/Hobbie";
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
import Holiday from "./screen/Pages/Categories/Holiday";
import Calculator from "./screen/Pages/Toolkits/Calculator";
import Agenda from "./screen/Pages/Toolkits/Agenda";
import Reminder from "./screen/Pages/Toolkits/Reminder";
import Download from "./screen/Pages/Toolkits/Download";
import AddReminder from "./screen/Pages/Toolkits/AddReminder"; 
import Settings from "./screen/Pages/Toolkits/settings/";
import Impressum from "./screen/Pages/NavPages/Impressum";
import ContactForm from "./screen/Pages/NavPages/ContactForm";
import Mailer from 'react-native-mail';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';


/* 

const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('Storage successfully cleared!');
  } catch (e) {
    console.log('Failed to clear the async storage.');
  }
}

// Call the function when you want to clear the storage
clearStorage();
 */

const Stack = createStackNavigator();

function AuthLoading({ navigation }) {
  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = JSON.parse(await AsyncStorage.getItem("@storage_Key"));
        console.log('user from async storage', user);

        if (user) {
          const response = await axios.get(
            `http://localhost:5555/api/users/verify-token`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          if (response.status === 200) {
            console.log('User already isLoged', response.data);
            navigation.replace('Dashboard');  // Naviguer directement vers le tableau de bord
          }
        } else {
          navigation.replace('Login');  // Naviguer vers l'écran de connexion s'il n'y a pas d'utilisateur
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkUser();
  }, [navigation]);

  return null;
}


export default function App() {  
  return (
    <NavigationContainer >
     <Stack.Navigator initialRouteName="AuthLoading"
       screenOptions={{ 
    headerShown: true,
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: '#f7f5f0', // Remplacez '#f4511e' par la couleur de votre choix
      height: 80,
    },
    headerTintColor: '#E0AA3E', // Couleur du titre et des boutons de l'en-tête
    headerTitleStyle: {
    fontWeight: 'normal', // Style du titre de l'en-tête
    },
  }}
>
     
     
        <Stack.Screen name="AuthLoading" component={AuthLoading} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Reset" component={Reset} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="ViewIncomes"  initialParams={{category:'all'}} component={ViewIncomes} />
        <Stack.Screen name="ViewExpenses"  initialParams={{category:'all'}} component={ViewExpenses} />
        <Stack.Screen name="MyIncomes" component={MyIncomes} />
        <Stack.Screen name="MyExpenses" component={MyExpenses} />
        <Stack.Screen name="Forecast" component={Forecast} />
        <Stack.Screen name="Statistics" component={Statistics} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="Clothe" component={Clothe} />
        <Stack.Screen name="Food" component={Food} />
        <Stack.Screen name="Transport" component={Transport} />
        <Stack.Screen name="Studie" component={Studie} />
        <Stack.Screen name="MyInvoice" component={MyInvoice} />
        <Stack.Screen name="Tax" component={Tax} />
        <Stack.Screen name="Hobbie" component={Hobbie} />
        <Stack.Screen name="Money" component={Money} />
        <Stack.Screen name="Epargne" component={Epargne} />
        <Stack.Screen name="Holiday" component={Holiday} />
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
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="AddReminder" component={AddReminder} />
        <Stack.Screen name="Impressum" component={Impressum} />
        <Stack.Screen name="ContactForm" component={ContactForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faefd7",
  },
 
});
