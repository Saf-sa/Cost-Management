import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Toast,
  useWindowDimensions,
  TouchableOpacity,
   ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import Icon from "../../shared/components/IncomExpenseComponent/Icon";
import AppText from "../../shared/components/uiApp/AppText";
import UserNav from "../nav/UserNav";
import Screen2 from "../../shared/components/Screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import Holidays from './Categories/Holiday';

import { totalExpenseIncome } from './ViewIncomes';
import {getIncomes} from './ViewIncomes';
import { ViewIncomes } from './ViewIncomes';
import { totalExpenses } from './ViewExpenses';
import calculateTotalIncomes from './ViewIncomes';
import calculateTotalExpenses from './ViewExpenses';
  function Dashboard(route) {
      const [storedIncomes, setStoredIncomes] = useState([]);// State to store data from AsyncStorage
      const [storedExpenses, setStoredExpenses] = useState([]);// State to store data from AsyncStorage
    const [balance, setBalance] = useState("");
    const [totalIncome, setTotalIncome] = useState("");
    const [totalExpense, setTotalExpense] = useState("");

    const navigation = useNavigation();

      useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@storage_Key');
        if (jsonValue != null) {
          const user = JSON.parse(jsonValue);
          setFirstName(user.firstName); // Update this line to use setFirstName
        }
      } catch (e) {
        console.error("Failed to fetch user data from storage");
      }
    };

    fetchUserData();
  }, []);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@storage_Key');
        if (jsonValue != null) {
          const user = JSON.parse(jsonValue);
          setFirstName(user.firstName); // Update this line to use setFirstName
        }
          const incomes = await AsyncStorage.getItem('incomes');// Get data from AsyncStorage
        if (incomes) {
       const parsedIncomes = JSON.parse(incomes);// Parse data from AsyncStorage
          setStoredIncomes(parsedIncomes.incomes); // Send data to the state
               /*  console.log('parsedExpenses FrontEnd side ',parsedExpenses);   */
        }
         const expenses = await AsyncStorage.getItem('expenses');// Get data from AsyncStorage
        if (expenses) {
       const parsedExpenses = JSON.parse(expenses);// Parse data from AsyncStorage
          setStoredExpenses(parsedExpenses.expenses); // Send data to the state
               /*  console.log('parsedExpenses FrontEnd side ',parsedExpenses);   */
        }
      } catch (e) {
        console.error("Failed to fetch user data from storage");
      }
    };

    fetchUserData();
   
  }, []);



    //get Date Today default
    const dateToday = moment(new Date()).format("YYYYMMDD");
    const yesterday = moment().subtract(1, "days");
    const dateYesterday = moment(yesterday).format("YYYYMMDD");
    const [formErrors, setFormErrors] = useState({
      firstName: null,
      lastName: null,
    });

    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
    });

    //get Category when Clicked
    const [firstName, setFirstName] = useState("");
    const setSelectCategoryByName = (firstName) => {
      if (firstName === "All") {
        dispatch({ type: "all", payload: flatListItems });
      } else {
        let categoryName = flatListItems.filter((a) => a.category == firstName);
        //console.log(state.expenseList);
        if (categoryName == "") {
          dispatch({ type: "error" });
          Toast.show("No Record for " + firstName, Toast.SHORT);
        } else {
          dispatch({ type: firstName, payload: firstName });
        }
        console.log(payload);
      }
    };

    //getDimension
    const { height, width } = useWindowDimensions();
    const [refreshing, setRefreshing] = useState(false);
    const incomeTotal = calculateTotalIncomes;
    const expenseTotal = calculateTotalExpenses;
    const calculateTotalIncomes = storedIncomes.reduce((total, income) => total + Number(income.amount), 0);
    const calculateTotalExpenses = storedExpenses.reduce((total, expense) => total + Number(expense.amount), 0);

    console.log('calculateTotalIncomes', calculateTotalIncomes)
    return (
      <Screen2>
      
        <Text style={styles.title}>Welcome back {firstName} !</Text> 
       
        <UserNav
          image={require("../../assets/iconPerson.png")}
  
        />
        <LinearGradient
          style={styles.parentContainer}
          colors={["#f9f295", "#E0AA3E", "#F7EF8A", "#B88A44"]}
          start={{ x: 0.1, y: 0.1 }}
          end={{ x: 1, y: 3 }}
        >
          <View style={styles.balanceContainer}>
            <AppText style={{ color: "black", fontSize: 14, marginBottom: 5 }}>
              PREMIUM ACCOUNT 
            </AppText>

            <AppText style={{ color: "black", fontSize: 12 }}>BALANCE</AppText>


         <AppText
  style={{
    color: calculateTotalIncomes - calculateTotalExpenses >= 0 ? "green" : "red",
    fontSize: 14,
  }}
>
 { calculateTotalIncomes - calculateTotalExpenses} €
</AppText>

            <AppText style={{ marginTop:5 }}></AppText>
          </View>
          <View style={styles.parentIncomeContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AntDesign name="arrowup" color="#25F333" size={30 * 0.5} />
              </View>
              <View style={{ marginLeft: 10 }}>
                <AppText style={{ color: "black", fontSize: 14 }}>
                  Incomes
                </AppText>
                <AppText style={{ color: "green", fontSize: 14 }}>
                 {calculateTotalIncomes} €
  
                </AppText>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AntDesign name="arrowdown" color="#FB5D5D" size={30 * 0.5} />
              </View>
              <View style={{ marginLeft: 10 }}>
                <AppText style={{ color: "black", fontSize: 14 }}>
                  Expenses
                </AppText>
                <AppText style={{ color: "red", fontSize: 14 }}>
               - {calculateTotalExpenses} €
                </AppText>
              </View>
            </View>
          </View>
        </LinearGradient>
        <View>
          <AppText style={styles.dashboardTitle}></AppText>
        </View>
    
        <View style={styles.dashboard}>
          <TouchableOpacity onPress={() => navigation.push("ViewIncomes")}>
            <Icon
              name="dollar-sign"
              size={66}
            />
            <Text style={{ fontSize: 15, paddingTop: 5, textAlign:"center"}}> Income</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("ViewExpenses")}>
            <Icon
              name="shopping-cart"
              size={66}
        
             
            />
            <Text style={{ fontSize: 15, paddingTop: 5, textAlign:"center" }}>Expense</Text>
          </TouchableOpacity>
          
         <TouchableOpacity onPress={() => navigation.push("Forecast")}>
            <Icon
              name="file-invoice-dollar"
              size={68}
              
             
             
            />
            <Text style={{ fontSize: 15, paddingTop: 5, textAlign:"center" }}>Forecast</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("ViewGlobalStat")}>
            <Icon
              name="chart-line"
              size={66}
             
             
            />
            <Text style={{ fontSize: 15, paddingTop: 5, textAlign:"center" }}> Statistics</Text>
          </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.push("History")}>
            <Icon
              name="history"
              size={66}
             
             
            />
            <Text style={{ fontSize: 15, paddingTop: 5, textAlign:"center" }}>History</Text>
          </TouchableOpacity>
        </View>
        <View>
          <AppText style={styles.dashboardTitle}>Expenses Categories</AppText>
        </View>
        <View style={styles.dashboardCat}>
          <TouchableOpacity onPress={() => navigation.navigate("ViewExpenses", {category:'clothe'})}>
            <Icon
              name="tshirt"
              size={66}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5, marginBottom: 10, textAlign:"center" }}>
              Clothes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ViewExpenses", {category:'food'})}>
            <Icon
              name="utensils"
              size={66}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5, marginBottom: 10, textAlign:"center" }}>
            
              Foods
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ViewExpenses",{category:'Transport'})}>
            <Icon
              name="subway"
              size={66}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5, marginBottom: 10, textAlign:"center" }}>
              Transport
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ViewExpenses", {category:'Studie'})}>
            <Icon
              name="university"
              size={66}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5, marginBottom: 10, textAlign:"center" }}>
              {" "}
              Studies
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("ViewExpenses", {category:'holiday'})}>
            <Icon
              name="plane-departure"
              size={66}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5, marginBottom: 10, textAlign:"center" }}>
           
              Holidays
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("ViewExpenses", {category:'tax'})}>
            <Icon
              name="cash-register"
              size={66}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5, textAlign:"center" }}> Taxes</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("ViewExpenses", {category:'hobbie'})}>
            <Icon
              styles={styles.icon}
              name="laugh-wink"
              size={66}
            />

            <Text style={{ fontSize: 15, paddingTop: 5, textAlign:"center" }}>Hobbies</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("ViewExpenses", {category:'money'})}>
            <Icon
              styles={styles.icon}
              name="hand-holding-usd"
              size={66}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5, textAlign:"center" }}> Money</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("ViewExpenses", {category:'epargne'})}>
            <Icon
              styles={styles.icon}
              name="search-dollar"
              size={66}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5, textAlign:"center" }}>Epargne</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("ViewExpenses",  {category:'other'})}>
            <Icon
              styles={styles.icon}
              name="newspaper"
              size={66}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5, textAlign:"center" }}>Other</Text>
          </TouchableOpacity>
        </View>

 <View>
          <AppText style={styles.dashboardTitle}> Incomes Categories</AppText>
        </View>
        <View style={styles.dashboardCat}>
          <TouchableOpacity onPress={() => navigation.navigate("ViewIncomes", {category:'Salary'})}>
            <Icon
              name="dollar-sign"
              size={66}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5, marginBottom: 10, textAlign:"center" }}>
              Salary
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ViewIncomes", {category:'Bonus'})}>
            <Icon
              name="trophy"
              size={66}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5, marginBottom: 10, textAlign:"center" }}>
            
              Bonus
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ViewIncomes",  {category:'Loan'})}>
            <Icon
              name="search-dollar"
              size={66}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5, marginBottom: 10, textAlign:"center" }}>
              Loan
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ViewIncomes", {category:'Sales'})}>
            <Icon
              name="university"
              size={66}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5, marginBottom: 10, textAlign:"center" }}>
           
              Sales
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("ViewIncomes", {category:'Gift'})}>
            <Icon
              name="gift"
              size={66}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5, marginBottom: 10, textAlign:"center" }}>
            
              Gift
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("ViewIncomes", {category:'Rent'})}>
            <Icon
              name="home"
              size={66}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5, textAlign:"center" }}> Rent</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("ViewIncomes", {category:'Allowance'})}>
            <Icon
              styles={styles.icon}
              name="laugh-wink"
              size={66}
            />

            <Text style={{ fontSize: 14, paddingTop: 5, textAlign:"center" }}>Allowance</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("ViewIncomes", {category:'Refund'})}>
            <Icon
              styles={styles.icon}
              name="hand-holding-usd"
              size={65}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5, textAlign:"center" }}> Refund</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("ViewIncomes", {category:'Stocks'})}>
            <Icon
              styles={styles.icon}
              name="search-dollar"
              size={66}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5, textAlign:"center" }}>Stocks</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("ViewIncomes", {category:'Other'})}>
            <Icon
              styles={styles.icon}
              name="newspaper"
              size={66}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5, textAlign:"center" }}>Other</Text>
          </TouchableOpacity>
        </View>
      <AppText style={styles.dashboardTitle}>Toolkits</AppText>

        <View style={styles.dashboard}>
         
         <TouchableOpacity onPress={() => navigation.push("Agenda")}>
            <Icon
              name="calendar-alt"
              size={66}
             
             
            />
            <Text style={{ fontSize: 15, paddingTop: 0, textAlign:"center" }}> Agenda</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("Reminder")}>
            <Icon
              name="bell"
              size={66}
             
             
            />
            <Text style={{ fontSize: 15, paddingTop: 0, textAlign:"center" }}>Reminder</Text>
          </TouchableOpacity>
          
        <TouchableOpacity onPress={() => navigation.push("Calculator")}>
            <Icon
              name="calculator"
              size={68}
              
             
             
            />
            <Text style={{ fontSize: 15, paddingTop: 0, textAlign:"center" }}>Calculator</Text>
          </TouchableOpacity>
       
          <TouchableOpacity onPress={() => navigation.push("Download")}>
            <Icon
              name="download"
              size={68}
             
             
            />
            <Text style={{ fontSize: 15, paddingTop: 0, textAlign:"center" }}>Download</Text>
          </TouchableOpacity>

         
          <TouchableOpacity onPress={() => navigation.push("Settings")}>
            <Icon
              name="user-cog"
              size={66}
             
             
            />
            <Text style={{ fontSize: 15, paddingTop: 0, textAlign:"center" }}>Settings</Text>
          </TouchableOpacity>
           
        </View>

        
      </Screen2>
    );
  }

const styles = StyleSheet.create({
  parentContainer: {
    width: "65%",
    height: 140,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 0,
    flexDirection: "column",
    borderRadius: 7,
    marginTop: -70,
    marginHorizontal: 70,
    marginVertical: -15,
    backgroundColor: '#fff',
    shadowColor: "grey",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: {
      width: 0.8,
      height: 2,
    },
    elevation: 8,
  },
  balanceContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 17,
    width: "80%",

  },
  parentIncomeContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 3,
    paddingBottom:9,
 
  },


  dashboard: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 6,
    marginTop: 13,
    alignItems: "center",
  },

  dashboardCat: {
    flexWrap: "wrap",
    fontWeight: 'bold',
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 6,
    marginTop: 5,
    alignItems: "center",
  },

   dashboardTitle: {
    fontSize: 17,
    color: "brown",
    marginTop: 0,
    
  }, 
 
  icon: {
    justifyContent: "center",
  },
    title:{
    top: 60,
    textAlign: "center",
    color: "#E0AA3E",
    fontSize: 20,
    fontWeight: "bold",
  }
});

export default Dashboard;
