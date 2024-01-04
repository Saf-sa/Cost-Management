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


  function Dashboard() {
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
    return (
      <Screen2>
      
        <Text style={styles.title}>Welcome back {firstName} </Text> 
       
        <UserNav
          image={require("../../assets/iconPerson.png")}
        /*  title={`Welcome Back ${firstName}`} */
          /* subtitle="Titanium" */
        />
        <LinearGradient
          style={styles.parentContainer}
          colors={["#f9f295", "#E0AA3E", "#F7EF8A", "#B88A44"]}
          start={{ x: 0.1, y: 0.1 }}
          end={{ x: 1, y: 3 }}
        >
          <View style={styles.balanceContainer}>
            <AppText style={{ color: "black", fontSize: 20, marginBottom: 5 }}>
              PREMIUM ACCOUNT ={" TITANIUM"}
            </AppText>

            <AppText style={{ color: "black", fontSize: 15 }}>BALANCE</AppText>

            <AppText style={{ color: "red", fontSize: 12 }}>3000</AppText>

            <AppText
              style={{
                color: "green",
                fontSize: 12,
              }}
            >
              3000
            </AppText>

            <AppText style={{ marginTop: 10 }}></AppText>
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
                <AppText style={{ color: "black", fontSize: 12 }}>
                  Income
                </AppText>
                <AppText style={{ color: "green", fontSize: 12 }}>
                  TOTAL=
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
                <AppText style={{ color: "black", fontSize: 12 }}>
                  Expenses
                </AppText>
                <AppText style={{ color: "red", fontSize: 12 }}>
                  TOTAL =
                </AppText>
              </View>
            </View>
          </View>
        </LinearGradient>
        <View>
          <AppText style={styles.dashboardTitle}>Dashboard</AppText>
        </View>
        <View style={styles.dashboard}>
          <TouchableOpacity onPress={() => navigation.push("ViewIncomes")}>
            <Icon
              name="dollar-sign"
              size={66}
            />
            <Text style={{ fontSize: 15, paddingTop: 5 }}> Income</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("ViewExpenses")}>
            <Icon
              name="shopping-cart"
              size={66}
        
             
            />
            <Text style={{ fontSize: 15, paddingTop: 5 }}>Expense</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("Forecast")}>
            <Icon
              name="file-invoice-dollar"
              size={66}
             
             
            />
            <Text style={{ fontSize: 15, paddingTop: 5 }}>Forecast</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("Statistics")}>
            <Icon
              name="chart-line"
              size={66}
             
             
            />
            <Text style={{ fontSize: 15, paddingTop: 5 }}>Statistics</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("History")}>
            <Icon
              name="history"
              size={66}
             
             
            />
            <Text style={{ fontSize: 15, paddingTop: 5 }}> History</Text>
          </TouchableOpacity>
        </View>
        <View>
          <AppText style={styles.dashboardTitle}>Categories</AppText>
        </View>
        <View style={styles.dashboardCat}>
          <TouchableOpacity onPress={() => navigation.push("Clothes")}>
            <Icon
              name="tshirt"
              size={66}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5, marginBottom: 10 }}>
              Clothes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("Foods")}>
            <Icon
              name="utensils"
              size={66}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5, marginBottom: 10 }}>
              {" "}
              Foods
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("Transport")}>
            <Icon
              name="subway"
              size={66}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5, marginBottom: 10 }}>
              Transport
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("Studies")}>
            <Icon
              name="university"
              size={66}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5, marginBottom: 10 }}>
              {" "}
              Studies
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.push("MyInvoices")}>
            <Icon
              name="house-user"
              size={66}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5, marginBottom: 10 }}>
              {" "}
              Invoice
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.push("Taxes")}>
            <Icon
              name="cash-register"
              size={66}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5 }}> Taxes</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.push("Hobbies")}>
            <Icon
              styles={styles.icon}
              name="laugh-wink"
              size={66}
            />

            <Text style={{ fontSize: 15, paddingTop: 5 }}>Hobbies</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.push("Money")}>
            <Icon
              styles={styles.icon}
              name="hand-holding-usd"
              size={66}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5 }}> Money</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.push("Epargne")}>
            <Icon
              styles={styles.icon}
              name="search-dollar"
              size={66}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5 }}>Epargne</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.push("Holidays")}>
            <Icon
              styles={styles.icon}
              name="plane-departure"
              size={66}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5 }}>Holidays</Text>
          </TouchableOpacity>
        </View>

        <View>
          <AppText style={styles.dashboardTitle}>Toolkit</AppText>
        </View>

        <View style={styles.dashboard}>
          <TouchableOpacity onPress={() => navigation.push("Calculator")}>
            <Icon
              name="calculator"
              size={68}
              
             
             
            />
            <Text style={{ fontSize: 15, paddingTop: 5 }}>Calculator</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("Agenda")}>
            <Icon
              name="calendar-alt"
              size={66}
             
             
            />
            <Text style={{ fontSize: 15, paddingTop: 5 }}> Agenda</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("Reminder")}>
            <Icon
              name="bell"
              size={66}
             
             
            />
            <Text style={{ fontSize: 15, paddingTop: 5 }}>Reminder</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("Download")}>
            <Icon
              name="download"
              size={68}
             
             
            />
            <Text style={{ fontSize: 15, paddingTop: 5 }}>Download</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("Settings")}>
            <Icon
              name="user-cog"
              size={66}
             
             
            />
            <Text style={{ fontSize: 15, paddingTop: 5 }}>Settings</Text>
          </TouchableOpacity>
        </View>
      </Screen2>
    );
  }

const styles = StyleSheet.create({
  parentContainer: {
    paddingTop: 0,
    flexDirection: "column",
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 0,
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
    paddingVertical: 20,
    width: "100%",
  },
  parentIncomeContainer: {
      
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 3,
    paddingHorizontal: 30,
    paddingBottom:25,
  },
  containerRender: {

    height: 100,
    marginHorizontal: 10,
    width: 50,
  },

  dashboard: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 1,
    alignItems: "center",
  },

  dashboardCat: {
    flexWrap: "wrap",

    fontWeight: 'bold',
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 5,
    alignItems: "center",
  },

  dashboardTitle: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
    justifyContent: "center",
    textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  textCategory: {
    textAlignVertical: "center",
    alignSelf: "center",
    height: 35,
    fontSize: 12,
    fontSize: 15,
    paddingTop: 5,
    marginBottom: 20,
  },
  icon: {
    justifyContent: "center",
  },
    title:{
    
    top: 95,
    textAlign: "center",
    color: "#E0AA3E",
    fontSize: 20,
    fontWeight: "bold",
  }
});

export default Dashboard;
