import React, { useState, useEffect,} from "react";
import {
  Text,
  View,
  StyleSheet,
  Toast,
  TouchableOpacity,
   Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import Icon from "../../../shared/components/IncomExpenseComponent/Icon"
import AppText from "../../../shared/components/uiApp/AppText";
import {HomeNavLog} from "../../../screen/nav/UserNavLogin";
import Screen2 from "../../../shared/components/Screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetIncomes } from '../../../shared/components/IncomExpenseComponent/GetIncome';
import { useGetExpenses } from '../../../shared/components/IncomExpenseComponent/GetExpense';
import AppButton from '../../../shared/components/uiApp/AppButton';
import useButtonConfig from '../../../shared/components/uiApp/ButtonCategories'
  

function Download({route}) {
  const { category= 'all' } = route.params;
const navigation = useNavigation();
const incomes = useGetIncomes(category);
const expenses = useGetExpenses(category);
const buttonConfigGlobal = useButtonConfig(navigation, 'global');
const buttonConfigIncome = useButtonConfig(navigation, 'income');
const buttonConfigExpense = useButtonConfig(navigation, 'expense');
const buttonConfigToolkit = useButtonConfig(navigation, 'toolkit');


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

    const calculateTotalIncomes = incomes.reduce((total, income) => total + Number(income.amount), 0);
    const calculateTotalExpenses = expenses.reduce((total, expense) => total + Number(expense.amount), 0);

    return (
       <View style={styles.page}>
      <Screen2 style={styles.header}>
        <HomeNavLog style={styles.userNav}
          image={require("../../../assets/iconPerson.png")}
        />
    
     <Text style={styles.title}> Let's save your files {firstName} !</Text> 
       
      
        <View style={styles.dashboardCat}>
          <TouchableOpacity onPress={() => navigation.push("ViewIncomes")}>
            <Icon
              name="dollar-sign"
               size={Platform.select({ ios: 66, android: 58 })}
            />
            <Text style={styles.textCat}> Income</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("ViewExpenses")}>
            <Icon
              name="shopping-cart"
               size={Platform.select({ ios: 66, android: 58 })}
        
             
            />
            <Text style={styles.textCat}>Expense</Text>
          </TouchableOpacity>
          
         <TouchableOpacity onPress={() => navigation.push("Forecast")}>
            <Icon
              name="file-invoice-dollar"
               size={Platform.select({ ios: 66, android: 58 })}
              
             
             
            />
           <Text style={styles.textCat}>Forecast</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("ViewGlobalStat")}>
            <Icon
              name="chart-line"
               size={Platform.select({ ios: 66, android: 58 })}
             
             
            />
            <Text style={styles.textCat}> Statistics</Text>
          </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.push("History")}>
            <Icon
              name="history"
               size={Platform.select({ ios: 66, android: 58 })}
             
             
            />
            <Text style={styles.textCat}>History</Text>
          </TouchableOpacity>
        </View>
        <View>
          <AppText style={styles.dashboardTitle}>Expenses Categories</AppText>
        </View>
        <View style={styles.dashboardCat}>
          <TouchableOpacity onPress={() => navigation.navigate("ViewExpenses", {category:'clothe'})}>
            <Icon
              name="tshirt"
               size={Platform.select({ ios: 66, android: 58 })}
             
             
            />

            <Text style={styles.textCat}>
              Clothes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ViewExpenses", {category:'food'})}>
            <Icon
              name="utensils"
               size={Platform.select({ ios: 66, android: 58 })}
             
             
            />

            <Text style={styles.textCat}>
            
              Foods
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ViewExpenses",{category:'Transport'})}>
            <Icon
              name="subway"
               size={Platform.select({ ios: 66, android: 58 })}
             
             
            />

           <Text style={styles.textCat}>
              Transport
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ViewExpenses", {category:'Studie'})}>
            <Icon
              name="university"
               size={Platform.select({ ios: 66, android: 58 })}
             
             
            />

            <Text style={styles.textCat}>
              {" "}
              Studies
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("ViewExpenses", {category:'holiday'})}>
            <Icon
              name="plane-departure"
               size={Platform.select({ ios: 66, android: 58 })}
             
             
            />

           <Text style={styles.textCat}>
           
              Holidays
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("ViewExpenses", {category:'tax'})}>
            <Icon
              name="cash-register"
               size={Platform.select({ ios: 66, android: 58 })}
             
             
            />

            <Text style={styles.textCat}> Taxes</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("ViewExpenses", {category:'hobbie'})}>
            <Icon
              styles={styles.icon}
              name="laugh-wink"
               size={Platform.select({ ios: 66, android: 58 })}
            />

           <Text style={styles.textCat}>Hobbies</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("ViewExpenses", {category:'money'})}>
            <Icon
              styles={styles.icon}
              name="hand-holding-usd"
               size={Platform.select({ ios: 66, android: 58 })}
             
             
            />

            <Text style={styles.textCat}> Money</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("ViewExpenses", {category:'epargne'})}>
            <Icon
              styles={styles.icon}
              name="search-dollar"
               size={Platform.select({ ios: 66, android: 58 })}
             
             
            />

            <Text style={styles.textCat}>Epargne</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("ViewExpenses",  {category:'other'})}>
            <Icon
              styles={styles.icon}
              name="newspaper"
               size={Platform.select({ ios: 66, android: 58 })}
             
             
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
               size={Platform.select({ ios: 66, android: 58 })}
             
             
            />

            <Text style={styles.textCat}>
              Salary
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ViewIncomes", {category:'Bonus'})}>
            <Icon
              name="trophy"
               size={Platform.select({ ios: 66, android: 58 })}
             
             
            />

           <Text style={styles.textCat}>
            
              Bonus
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ViewIncomes",  {category:'Loan'})}>
            <Icon
              name="search-dollar"
               size={Platform.select({ ios: 66, android: 58 })}
             
             
            />

           <Text style={styles.textCat}>
              Loan
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ViewIncomes", {category:'Sales'})}>
            <Icon
              name="university"
               size={Platform.select({ ios: 66, android: 58 })}
             
             
            />

            <Text style={styles.textCat}>
           
              Sales
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("ViewIncomes", {category:'Gift'})}>
            <Icon
              name="gift"
               size={Platform.select({ ios: 66, android: 58 })}
             
             
            />

            <Text style={styles.textCat}>
            
              Gift
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("ViewIncomes", {category:'Rent'})}>
            <Icon
              name="home"
               size={Platform.select({ ios: 66, android: 58 })}
             
             
            />

            <Text style={styles.textCat}>Rent</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("ViewIncomes", {category:'Allowance'})}>
            <Icon
              styles={styles.icon}
              name="laugh-wink"
               size={Platform.select({ ios: 66, android: 58 })}
            />

            <Text style={styles.textCat}>Allowance</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("ViewIncomes", {category:'Refund'})}>
            <Icon
              styles={styles.icon}
              name="hand-holding-usd"
               size={Platform.select({ ios: 66, android: 58 })}
             
             
            />

            <Text style={styles.textCat}>Refund</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("ViewIncomes", {category:'Stocks'})}>
            <Icon
              styles={styles.icon}
              name="search-dollar"
               size={Platform.select({ ios: 66, android: 58 })}
             
             
            />

            <Text style={styles.textCat}>Stocks</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("ViewIncomes", {category:'Other'})}>
            <Icon
              styles={styles.icon}
              name="newspaper"
               size={Platform.select({ ios: 66, android: 58 })}
             
             
            />

            <Text style={styles.textCat}>Other</Text>
          </TouchableOpacity>
        </View>
      <AppText style={styles.dashboardTitle}>Toolkits</AppText>

        <View style={styles.dashboardCat}>
         
         <TouchableOpacity onPress={() => navigation.push("Agenda")}>
            <Icon
              name="calendar-alt"
               size={Platform.select({ ios: 66, android: 58 })}
             
             
            />
            <Text style={styles.textCat}>Agenda</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("Reminder")}>
            <Icon
              name="bell"
               size={Platform.select({ ios: 66, android: 58 })}
             
             
            />
            <Text style={styles.textCat}>Reminder</Text>
          </TouchableOpacity>
          
        <TouchableOpacity onPress={() => navigation.push("Calculator")}>
            <Icon
              name="calculator"
               size={Platform.select({ ios: 66, android: 58 })}
             
            />
            <Text style={styles.textCat}>Calculator</Text>
          </TouchableOpacity>
       
          <TouchableOpacity onPress={() => navigation.push("Download")}>
            <Icon
              name="download"
               size={Platform.select({ ios: 66, android: 58 })}
             
             
            />
            <Text style={styles.textCat}>Download</Text>
          </TouchableOpacity>

         
          <TouchableOpacity onPress={() => navigation.push("Settings")}>
            <Icon
              name="user-cog"
               size={Platform.select({ ios: 66, android: 58 })}
             
             
            />
            <Text style={styles.textCat}>Settings</Text>
          </TouchableOpacity>
           
        </View>

      
      </Screen2>
       </View>
    );
  }

const styles = StyleSheet.create({
  page: {
    width: "100%",
    flex: 1,
    backgroundColor: "#F8F4D7",
  },


    header: { 
      ...Platform.select({
      ios: {
    marginTop: -70,
    justifyContent: "center",
  },
 android: {
   marginTop: -40,
    justifyContent: "center",

        },
    }),
  },



dashboardCat: {
        ...Platform.select({
      ios: {
    flexWrap: "wrap",
    fontWeight: 'bold',
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 6,
    marginTop: 5,
    alignItems: "center",
  },
  
    android: {
    marginHorizontal: -10,
    marginVertical:-10,
    marginLeft : -10,
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop:20,
    alignItems: "center",
    justifyContent: "space-between",
    alignItems: "center",
  },
  }),
  },

 
  dashboardTitle: {
     ...Platform.select({
      ios: {
    fontSize: 17,
    color: "brown",
    }, 
    android: {  
      top:10,
    fontSize: 15,
    color: "brown",
    },
    }),
  
  },
  
  textCat:{
      ...Platform.select({
      ios: {
    fontSize: 13,
    paddingTop: 5,
    textAlign:"center"
  
  },
    android: {
    fontSize: 13, 
    textAlign:"center"
    },
    }),
  },


  icon: {
    justifyContent: "center",
  },

     title:{
   ...Platform.select({
      ios: {
    top: -70,
    textAlign: "center",
    color: "#E0AA3E",
    fontSize: 20,
    fontWeight: "bold",
  },
  android: {
    top: -40,
    textAlign: "center",
    color: "#E0AA3E",
    fontSize: 20,
    fontWeight: "bold",
  }
  }),
  } 

  
  

});

export default Download;
