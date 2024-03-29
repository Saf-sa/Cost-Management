import React, { useState, useEffect,   ScrollView} from "react";
import {
  Text,
  View,
  StyleSheet,
  Toast,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import Icon from "../../../shared/components/IncomExpenseComponent/Icon"
import AppText from "../../../shared/components/uiApp/AppText";
import UserNav from "../../../screen/nav/UserNav";
import Screen2 from "../../../shared/components/Screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        /* console.log(payload); */
      }
    };

    return (
       <View style={styles.page}>
      <Screen2 style={styles.header}>
        <UserNav style={styles.userNav}
          image={require("../../../assets/iconPerson.png")}
        />
    
     <Text style={styles.title}> Les's save your files {firstName} !</Text> 
       
      
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
              name="piggy-bank"
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

      
      </Screen2>
       </View>
    );
  }

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#F8F4D7",
  },

  header: { 
    marginTop: -70,
    justifyContent: "center",
  },

  dashboard: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 10,
    alignItems: "center",
  },

  dashboardCat: {
    flexWrap: "wrap",
    fontWeight: 'bold',
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 20,
    alignItems: "center",
  },

  dashboardTitle: {
    color: "black",
    fontSize: 20,
      color: "#E0AA3E",
    fontWeight: "bold",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 0,
  },
  icon: {
    justifyContent: "center",
  },
   
   title:{
    top: -70,
    textAlign: "center",
    color: "#E0AA3E",
    fontSize: 20,
    fontWeight: "bold",
  }
});

export default Download;
