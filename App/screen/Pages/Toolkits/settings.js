import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Toast,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import AppText from "../../../shared/components/uiApp/AppText";
import UserNav from "../../nav/UserNav";
import Screen2 from "../../../shared/components/Screen";
import AsyncStorage from "@react-native-async-storage/async-storage";



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
        }
      } catch (e) {
        console.error("Failed to fetch user data from storage");
      }
    };

    fetchUserData();
  }, []);


    //get Category when Clicked
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
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
        /* console.log(payload); */
      }
    };

  return (
     <View style={styles.page}>
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

            </AppText>
            
            
            <AppText></AppText>
          </View>
          
          <View style={styles.balanceContainer}>
           
              <View style={styles.UserContainer}>

                <AppText style={{ color: "black", fontSize: 15, marginBottom: 10, marginLeft:-48}}>First Name : {firstName} </AppText>

                <AppText style={{ color: "black", fontSize: 15, marginBottom: 10, marginLeft:-50  }}>  Last Name : {lastName}  </AppText>

                <AppText style={{ color: "black", fontSize: 15, marginBottom: 10, marginLeft:17 }}>Email: {email}  </AppText>

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
         </View>
         
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#F8F4D7",
  },

  parentContainer: {
    flexDirection: "column",
    borderRadius: 10,
    marginHorizontal: 50,
    marginVertical: 30,
  },
  
  balanceContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical:13,
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
