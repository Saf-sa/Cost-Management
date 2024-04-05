import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Toast,
  TouchableOpacity,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Icon from "../../shared/components/IncomExpenseComponent/Icon";
import AppText from "../../shared/components/uiApp/AppText";
import UserNav from "../nav/UserNav";
import Screen2 from "../../shared/components/Screen";
import AsyncStorage from "@react-native-async-storage/async-storage";



  function Dashboard() {
      const [storedIncomes, setStoredIncomes] = useState([]);// State to store data from AsyncStorage
      const [storedExpenses, setStoredExpenses] = useState([]);// State to store data from AsyncStorage


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


   
    const calculateTotalIncomes = storedIncomes.reduce((total, income) => total + Number(income.amount), 0);
    const calculateTotalExpenses = storedExpenses.reduce((total, expense) => total + Number(expense.amount), 0);

/*     console.log('calculateTotalIncomes', calculateTotalIncomes) */
    return (
      <View style={styles.page}>
      <Screen2 >
      
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

            <AppText style={{ color: "black", fontSize: 12 }}>Balance</AppText>
 

<AppText
  style={{
    color: calculateTotalIncomes - calculateTotalExpenses >= 0 ?  "green" : "red",
    fontSize: 14,
  }}
>
  { calculateTotalIncomes - calculateTotalExpenses >= 0 ? `+${calculateTotalIncomes - calculateTotalExpenses}` : `${calculateTotalIncomes - calculateTotalExpenses}` } € 
</AppText>
   <Image style={styles.simCard} source={require('../../assets/sim-card.png')} />

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
                + {calculateTotalIncomes} €
  
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
  
    parentContainer: {
      ...Platform.select({
      ios: {
    width: "65%",
    height: 140,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    marginTop: -70,
    marginHorizontal: 70,
    marginVertical: -15,
    shadowOffset: {
      width: 0.8,
      height: 2,},
  },
     android: {
    width: "70%",
    height: 130,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    top: -40,
    marginHorizontal: 50,
    marginVertical: -27,
    shadowOffset: {
      width: 0.8,
      height: 2,},
      },
    }),
  },
  
   balanceContainer: {
...Platform.select({
      ios: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 17,
    width: "80%",
      },

  android: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 0,
    width: "80%",
  
     },
    }),
  },
  
   simCard:{
    ...Platform.select({
      ios: {
    position: "relative",
    marginTop: -25,
    marginBottom:-20,
    borderRadius: 6,
    marginLeft: -180,
    width: 40,
    height:30,

  }, 
    android: {
    position: "relative",
    marginTop: -25,
    marginBottom:-10,
    borderRadius: 6,
    marginLeft: -180,
    width: 35,
    height:25,
    },
    }),
  },
  


    parentIncomeContainer: {
   ...Platform.select({
      ios: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom:10,
 
  },
    android: {
    width: "85%",
    height: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom:0,

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
    marginVertical: 10,
    marginLeft : -10,
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: -10,
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
      top: -15,
    fontSize: 15,
    color: "brown",
    },
    }),
  
  },
  textCat:{
      ...Platform.select({
      ios: {
    fontSize: 15,
    paddingTop: 5,
    textAlign:"center"
  
  },
    android: {
    fontSize: 13, 
    paddingTop: 5,
    textAlign:"center"
    },
    }),
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
