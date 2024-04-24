import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Toast,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {HomeNavLog} from "../../nav/UserNavLogin";
import AppText from "../../../shared/components/uiApp/AppText";
import Screen2 from "../../../shared/components/Screen";
import Card from "../../../shared/components/uiApp/Card";
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
        <HomeNavLog 
          image={require("../../../assets/iconPerson.png")}
        />
          <View style={styles.card}>
        <Card/>
         <View style={styles.UserContainer}>

                <AppText style={{ color: "black", fontSize: 15, marginBottom: 10, marginLeft:-48}}>First Name : {firstName} </AppText>

                <AppText style={{ color: "black", fontSize: 15, marginBottom: 10, marginLeft:-50  }}>  Last Name : {lastName}  </AppText>

                <AppText style={{ color: "black", fontSize: 15, marginBottom: 10, marginLeft:17 }}>Email: {email}  </AppText>

            </View>
       
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
            </View>
         </Screen2>
         </View>
         
  )
}

const styles = StyleSheet.create({
   page: {
     ...Platform.select({
      ios: {
    width: "100%",
    flex: 1,
    backgroundColor: "#F8F4D7",
    marginTop: -25,
  },
   android: {
    width: "100%",
    flex: 1,
    backgroundColor: "#F8F4D7",
    marginTop: -25,
          },
    }),
  },
    card:{
    paddingTop:0,
    margin:-15,
    top:-30,
  },

   UserContainer:{
    top:85,
    left:120,
    position:'absolute',
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
  },
  
});

export default Settings;
