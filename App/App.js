import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screen/auth/login";
import Signup from "./screen/auth/signup";
import Reset from "./screen/auth/reset";
import Start from "./screen/Pages/start";
import ResetPassword from "./screen/auth/resetPassword";
import BottomHomeNav from "../App/screen/nav/BottomHomeNav";
import HomeDashbord from "./screen//Pages/HomeDashbord";
import ViewAllTransac from "./screen/Expenses/ViewAllTransac";
import MyIncomes from "./screen/Pages/MyIncomes";
import MyExpenses from "./screen/Pages/MyExpenses";
import MyInvoices from "./screen/Pages/MyInvoices";
import Statistics from "./screen/Pages/Statistics";
import History from "./screen/Pages/History";
import Clothes from "./screen/Pages/Categories/Clothes";
import Foods from "./screen/Pages/Categories/Foods";






const Stack = createStackNavigator();

export default function App() {
  
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Reset" component={Reset} />
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="ViewAllTransactions" component={ViewAllTransac} />
        <Stack.Screen name="HomeDashbord" component={HomeDashbord} />
        <Stack.Screen name="MyIncomes" component={MyIncomes} />
        <Stack.Screen name="MyExpenses" component={MyExpenses} />
        <Stack.Screen name="MyInvoices" component={MyInvoices} />
        <Stack.Screen name="Statistics" component={Statistics} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="Clothes" component={Clothes} />
        <Stack.Screen name="Foods" component={Foods} />
        <Stack.Screen name="BottomHomeNav" component={BottomHomeNav} />
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
