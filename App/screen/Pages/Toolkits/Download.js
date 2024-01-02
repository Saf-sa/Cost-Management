import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Toast,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import Icon from "../../../shared/components/IncomExpenseComponent/Icon"
import AppText from "../../../shared/components/uiApp/AppText";
import UserNav from "../../../screen/nav/UserNav";
import Screen2 from "../../../shared/components/Screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";


  function Download() {
  

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
        <UserNav
          image={require("../../../assets/iconPerson.png")}
         title={`Welcome Back ${firstName}`}
       
        />
    
    
       
        <View>
          <AppText style={styles.dashboardTitle}>Global View</AppText>
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
          <AppText style={styles.dashboardTitle}>Expenses</AppText>
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
          <AppText style={styles.dashboardTitle}>Incomes</AppText>
        </View>
        <View style={styles.dashboardCat}>
          <TouchableOpacity onPress={() => navigation.push("Salary")}>
            <Icon
              name="tshirt"
              size={66}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5, marginBottom: 10 }}>   Salary
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("Foods")}>
            <Icon
              name="utensils"
              size={66}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5, marginBottom: 10 }}>  Taxes

            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("Transport")}>
            <Icon
              name="subway"
              size={66}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5, marginBottom: 10 }}>   Bonus
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("Studies")}>
            <Icon
              name="university"
              size={66}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5, marginBottom: 10 }}>    Loan
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.push("MyInvoices")}>
            <Icon
              name="house-user"
              size={66}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5, marginBottom: 10 }}>   Sales
             
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.push("Taxes")}>
            <Icon
              name="cash-register"
              size={66}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5 }}>    Gift</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.push("Hobbies")}>
            <Icon
              styles={styles.icon}
              name="laugh-wink"
              size={66}
            />

            <Text style={{ fontSize: 15, paddingTop: 5 }}>    Rent</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.push("Money")}>
            <Icon
              styles={styles.icon}
              name="hand-holding-usd"
              size={66}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5 }}>Alowance</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.push("Epargne")}>
            <Icon
              styles={styles.icon}
              name="search-dollar"
              size={66}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5 }}>  Refund</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.push("Holidays")}>
            <Icon
              styles={styles.icon}
              name="plane-departure"
              size={66}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5 }}>Gambling</Text>
          </TouchableOpacity>
          
    <TouchableOpacity onPress={() => navigation.push("Epargne")}>
            <Icon
              styles={styles.icon}
              name="search-dollar"
              size={66}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5 }}>  Stocks</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.push("Holidays")}>
            <Icon
              styles={styles.icon}
              name="plane-departure"
              size={66}
             
             
            />

            <Text style={{ fontSize: 15, paddingTop: 5 }}>   Other</Text>
          </TouchableOpacity>
          

          
        </View>

      
      </Screen2>
    );
  }

const styles = StyleSheet.create({
  parentContainer: {
    flexDirection: "column",
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 5,
    shadowColor: "grey",
    shadowOpacity: 0.05,
    shadowOffset: {
      width: 15,
      height: 15,
    },
    elevation: 8,
  },
  balanceContainer: {
  
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    width: "100%",
  },
  parentIncomeContainer: {
      
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
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
    paddingHorizontal: 20,
    marginTop: 5,
    alignItems: "center",
  },

  dashboardCat: {
    flexWrap: "wrap",

    fontWeight: 'bold',
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
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
    marginBottom: 10,
  },
  icon: {
    justifyContent: "center",
  },
});

export default Download;
