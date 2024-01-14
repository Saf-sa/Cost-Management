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
import Icon from "../../../shared/components/IncomExpenseComponent/Icon"
import AppText from "../../../shared/components/uiApp/AppText";
import UserNav from "../../nav/UserNav";
import Screen2 from "../../../shared/components/Screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";



const Settings = () => {

  const navigation = useNavigation();

 
      useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@storage_Key');
        if (jsonValue != null) {
          const user = JSON.parse(jsonValue);
          setFirstName(user.firstName); // Update this line to use setFirstName
          setLastName(user.lastName); // Update this line to use setFirstName
          setEmail(user.email); // Update this line to use setFirstName
          setPassword(user.password); // Update this line to use setFirstName
        }
      } catch (e) {
        console.error("Failed to fetch user data from storage");
      }
    };

    fetchUserData();
  }, []);

   
    const [formErrors, setFormErrors] = useState({
      firstName: null,
      lastName: null,
      email: null,
      password: null,
    });

    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });

    //get Category when Clicked
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const setSelectCategoryByFirstName = (firstName ) => {
      if (firstName === "All" ) {
        dispatch({ type: "all", payload: flatListItems });
      } else {
        let categoryName = flatListItems.filter((a) => a.category == firstName);
        //console.log(state.expenseList);
        if (categoryName == "") {
          dispatch({ type: "error" });
          Toast.show("No Record for " + firstName, Toast.SHORT);
        } else {
          dispatch({ type: firstName, payload: firstName});
        }
        console.log(payload);
      }
    };
     const setSelectCategoryByLastName = (lastName ) => {
      if (lastName === "All" ) {
        dispatch({ type: "all", payload: flatListItems });
      } else {
        let categoryName = flatListItems.filter((a) => a.category == lastName);
        //console.log(state.expenseList);
        if (categoryName == "") {
          dispatch({ type: "error" });
          Toast.show("No Record for " + lastName, Toast.SHORT);
        } else {
          dispatch({ type: lastName, payload: lastName});
        }
        console.log(payload);
      }
    };

    
    //getDimension
    const { height, width } = useWindowDimensions();
    const [refreshing, setRefreshing] = useState(false);


  return (
    <Screen2>
        <Text style={styles.title}>Update your Settings  {firstName} </Text> 
        <UserNav 
          image={require("../../../assets/iconPerson.png")}
   
         
        />
          <LinearGradient
          style={styles.parentContainer}
          colors={["#f9f295", "#E0AA3E", "#F7EF8A", "#B88A44"]}
          start={{ x: 0.1, y: 0.1 }}
          end={{ x: 1, y: 3 }}
        >
          <View style={styles.balanceContainer}>
            <AppText style= {{ flexDirection: 'row' }}>
                     <View>
                <Text style={{ fontSize: 36, color:'blue', lineHeight: 35 }}>€</Text>
                </View>
                 <View>
                <Text style={{ fontSize: 45, color:'dodgerblue', lineHeight:45}}>X</Text>
                </View>
                 <View>
                <Text style={{ fontSize: 22, color:'midnightblue', lineHeight: 21 }}>penses Manager</Text>
                
                </View>
                <View>
              
                </View>

            </AppText>
            
            
            <AppText></AppText>
          </View>
          
          <View style={styles.balanceContainer}>
           
              <View style={styles.UserContainer}>

                <AppText style={{ color: "black", fontSize: 16, marginBottom: 10}}>first Name : {firstName} </AppText>

                <AppText style={{ color: "black", fontSize: 16, marginBottom: 10  }}>  Last Name : {lastName}  </AppText>

                <AppText style={{ color: "black", fontSize: 16, marginBottom: 10, marginLeft:40 }}> @: {email}  </AppText>

                <AppText style={{ color: "black", fontSize: 16, marginBottom: 10 }}>      Password : **********  </AppText>
            </View>
    
          </View>

        </LinearGradient>
          <View 
            style={{
              flex: "culumn",
              alignItems: "center",
              justifyContent: "center",
              padding: 30,
              
            }}
          >
      
          <Text  style={styles.settings}  onPress={() => navigation.navigate("Reset")} >
         change your Password ?
        </Text>

        <Text  style={styles.settings}  onPress={() => navigation.navigate("ContactForm")} >
         Ususcribe Newsletter ?
        </Text>

        <Text  style={styles.settings}  onPress={() => navigation.navigate("ContactForm")} >
         Delete Your Account?
        </Text>

        <Text  style={styles.settings}  onPress={() => navigation.navigate("ContactForm")} >
         Contact Us?
        </Text>

            </View>
         </Screen2>
         
  )
}

const styles = StyleSheet.create({

  parentContainer: {
    flexDirection: "column",
    borderRadius: 10,
    marginHorizontal: 50,
    marginVertical: -20,
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
    paddingVertical: 5,
    width: "100%",
    
  },

  settings: {
   padding: 30,
    color: "#E0AA3E",
    fontSize: 18,
    fontWeight: "bold",
  },
  title:{
    top: 90,
    textAlign: "center",
    color: "#E0AA3E",
    fontSize: 20,
    fontWeight: "bold",
  }
  
});

export default Settings;
