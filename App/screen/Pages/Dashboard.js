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
import {HomeNavLog} from "../nav/UserNavLogin";
import Screen2 from "../../shared/components/Screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetIncomes } from '../../shared/components/IncomExpenseComponent/GetIncome';
import { useGetExpenses } from "../../shared/components/IncomExpenseComponent/GetExpense";
import AppButton from '../../shared/components/uiApp/AppButton';
import useButtonConfig from '../../shared/components/uiApp/ButtonCategories'




  function Dashboard({route})  {
  const { category= 'all' } = route.params;
  const incomes = useGetIncomes(category);
  const expenses = useGetExpenses(category);
  const [storedIncomes, setStoredIncomes] = useState([]);// State to store data from AsyncStorage
  const [storedExpenses, setStoredExpenses] = useState([]);// State to store data from AsyncStorage
  const buttonConfig = useButtonConfig(navigation);
const buttonConfigGlobal = useButtonConfig(navigation, 'global');
const buttonConfigIncome = useButtonConfig(navigation, 'income');
const buttonConfigExpense = useButtonConfig(navigation, 'expense');
const buttonConfigToolkit = useButtonConfig(navigation, 'toolkit');


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


   
    const calculateTotalIncomes = incomes.reduce((total, income) => total + Number(income.amount), 0);
    const calculateTotalExpenses = expenses.reduce((total, expense) => total + Number(expense.amount), 0);

/*     console.log('calculateTotalIncomes', calculateTotalIncomes) */
    return (
      <View style={styles.page}>
      <Screen2 >
      
        <Text style={styles.title}>Welcome back {firstName} !</Text> 
       
        <HomeNavLog
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
              <View style={{ marginLeft: 2 }}>
                <AppText style={{ color: "black", fontSize: 12 }}>
                  Incomes
                </AppText>
                <AppText style={{ color: "green", fontSize: 12 }}>
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
              <View style={{ marginLeft: 2 }}>
                <AppText style={{ color: "black", fontSize: 12 }}>
                  Expenses
                </AppText>
                <AppText style={{ color: "red", fontSize: 12 }}>
               - {calculateTotalExpenses} €
                </AppText>
              </View>
            </View>
          </View>
        </LinearGradient>
    
      <View style={styles.categorieContainer}>
       
      

 <View style={styles.dashboardCat}>
  <Text style={styles.sectionTitle}>Global</Text>
      <View style={styles.section}>
        {buttonConfigGlobal.map((button, index) => (
          <AppButton
            key={index}
            AppButtonText={button.AppButtonText}
            icon={button.icon}
            onPress={button.onPress}
          />
        ))}
      </View>
<View>
      <Text style={styles.sectionTitle}>Income</Text>
</View>
      <View style={styles.section}>
        {buttonConfigIncome.map((button, index) => (
          <AppButton
            key={index}
            AppButtonText={button.AppButtonText}
            icon={button.icon}
            onPress={button.onPress}
          />
        ))}
      </View>
<View>
      <Text style={styles.sectionTitle}>Expense</Text>
</View>
 
      <View style={styles.section}>
        {buttonConfigExpense.map((button, index) => (
          <AppButton
            key={index}
            AppButtonText={button.AppButtonText}
            icon={button.icon}
            onPress={button.onPress}
          />
        ))}
      </View>
<View>
      <Text style={styles.sectionTitle}>Toolkit</Text>
</View>
     
      <View style={styles.section}>
        {buttonConfigToolkit.map((button, index) => (
          <AppButton
            key={index}
            AppButtonText={button.AppButtonText}
            icon={button.icon}
            onPress={button.onPress}
          />
        ))}
      </View>


</View>
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
        
    width: "60%",
    height: 140,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    borderWidth:0.2,
    borderColor: 'brown',
    marginTop: -80,
    marginHorizontal: 80,
    marginVertical: -15,
    shadowOffset: {
      width: 0.8,
      height: 2,},
  },
     android: {
    width: "70%",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    borderWidth:0.2,
    borderColor: 'brown',
    top: -30,
    marginHorizontal: 45,
    marginVertical: -15,
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
    paddingVertical: 7,
    width: "70%",
      },

  android: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
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
    marginTop: -35,
    marginBottom:-20,
    borderRadius: 6,
    marginLeft: -140,
    width: 29,
    height:22,
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
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom:-10,

           },
    }),
  },

    categorieContainer: {
   ...Platform.select({
      ios: {
    top:15,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: -5,

 
  },
    android: {
    width: "85%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom:-10,

           },
    }),
  },
    section:{
      ...Platform.select({
      ios: {
    flexWrap:"wrap",
    flexDirection: "row",
    paddingLeft:5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  android: {
    flexWrap:"wrap",
    flexDirection: "row",
    paddingLeft:5,
    justifyContent: "space-between",
    alignItems: "center",
  },
     }),
  },

sectionTitle:{
   ...Platform.select({
      ios: {
  marginTop:5,
  fontSize: 15,
   color: "brown",
  fontWeight: 'bold',
  marginBottom:5,
  textAlign: "center", 
},
 android: {
    marginTop:5,
  fontSize: 15,
   color: "brown",
  fontWeight: 'bold',
  marginBottom:5,
  textAlign: "center", 
},
     }),
  },

AppButtonText:{
    ...Platform.select({
      ios: {
  paddingBottom:15,
},
android: {
  paddingBottom:15,
  },
     }),
  },

  title:{
 ...Platform.select({
      ios: {
    top: 55,
    textAlign: "center",
    color: "#E0AA3E",
    fontSize: 20,
    fontWeight: "bold",
  },

      android: {
    top: 20,
    textAlign: "center",
    color: "#E0AA3E",
    fontSize: 15,
    fontWeight: "bold",
  }

  }),
  },  

  
});


export default Dashboard;
