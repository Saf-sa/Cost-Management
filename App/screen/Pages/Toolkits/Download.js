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
import Card from '../../../shared/components/uiApp/Card'

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
       
      <Screen2 style={styles.parentContainer}>
   <View>
        <HomeNavLog style={styles.userNav}
          image={require("../../../assets/iconPerson.png")}
        />
    <View style={styles.card}>
       <Card 
      cardText={"Let's save your files"}
      />
     </View>
     </View>
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
     ...Platform.select({
      ios: {
    width: "100%",
    flex: 1,
    backgroundColor: "#F8F4D7",
    paddingTop:5,
  },
   android: {
    width: "100%",
    flex: 1,
    backgroundColor: "#F8F4D7",
   paddingTop:5,
          },
    }),
  },
  
  card:{
   top:-60,
  },

    categorieContainer: {
   ...Platform.select({
      ios: {
    top:-90,
     
  },
    android: {
    paddingBottom:-150,
           },
    }),
  },
  
    section:{
      ...Platform.select({
      ios: {  
    padding:4,
    flexWrap:"wrap",
    flexDirection: "row",
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

  fontSize: 15,
   color: "brown",
  fontWeight: 'bold',
 

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
  paddingBottom:5,
},
android: {
  paddingBottom:15,
  },
     }),
  },


  title:{
 ...Platform.select({
      ios: {
    textAlign: "center",
    color: "#E0AA3E",
    fontSize: 10,
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

dashboardCat: {
        ...Platform.select({
      ios: {
    flexWrap: "wrap",
    fontWeight: 'bold',
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 10,
    marginTop: 55,
    textAlign:"center",
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
    top:-20,
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
    paddingTop: -15,
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
