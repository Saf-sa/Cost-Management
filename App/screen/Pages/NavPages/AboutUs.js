import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Toast,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppText from "../../../shared/components/uiApp/AppText";
import {HomeNavLog} from "../../nav/UserNavLogin";
import Screen2 from "../../../shared/components/Screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Card from "../../../shared/components/uiApp/Card";

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
       /*  console.log(payload); */
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
        /* console.log(payload); */
      }
    };

    //getDimension
    const { height, width } = useWindowDimensions();
    const [refreshing, setRefreshing] = useState(false);

  return (
    <View style={styles.page} >
    <Screen2>
        <Text style={styles.title}> Get to know us better</Text> 
        <HomeNavLog 
          image={require("../../../assets/iconPerson.png")}

        />
        <View style={styles.card}>
        <Card/>
         <View style={styles.UserContainer}>

                <AppText style={{ color: "black", fontSize: 13, marginBottom: 1}}>Developper & Designer {firstName} {lastName} </AppText>
                <AppText style={{ color: "black", fontSize: 13, marginBottom: 1}}> Teacher</AppText>

                <AppText style={{ color: "black", fontSize: 13, marginBottom: 1  }}> Frontend & Javascript : Carlo Trimarchi </AppText>

                <AppText style={{ color: "black", fontSize: 13, marginBottom: 1,}}> Backend : Ather Ahmad & Dilshod </AppText>

                <AppText style={{ color: "black", fontSize: 13, marginBottom: 1 }}>Tutoring :  Ather Ahmad </AppText>

                <AppText style={{ color: "black", fontSize: 13, marginBottom: 1 }}> Mentoring :Alkis Kastrisios </AppText>
            </View>
        </View>
      
        <View >
            <Text style={styles.text} >
            This App was developed for the 
            "Final Project" of the training course "Web Developper fullstack"  between January 2023 and March 2024. 

            </Text>

                 <Text style={styles.text} >
I tried to use all the notions acquired during this training, in order to have a fullstack experience of mobile App development with React Native, Node and Express.

            </Text>

      <Text style={styles.text} >
I'd like to thank all the teachers, whose skills and knowledge 
awakened my interest in HTML, CSS and Javascript programming:
A special thanks to my tutor Mr Ather Ahmad who supported me with patience and guided me towards good backend development practices.

            </Text>
            
      <Text style={styles.text} >

A special thanks to my tutor Mr Ather Ahmad who supported me with patience and guided me towards good backend development practices.

            </Text>
                  <Text style={styles.text} >
        I hope you'll enjoy

            </Text>
        </View>

        <Text  style={styles.settings}  onPress={() => navigation.navigate("ContactForm")} >
         
         Send a comment?
        </Text>
         </Screen2>
         </View>
  )
}

const styles = StyleSheet.create({
  page: {
  flex: 1,
    backgroundColor: "#F8F4D7",
  },
  
  UserContainer:{
    top:74,
    left:120,
    position:'absolute',
  },

  card:{
    paddingTop:0,
    margin:-15,
    top:-30,
  },

  settings: {
   padding: 10,
    color: "#E0AA3E",
    fontSize: 15,
    fontWeight: "bold",
  },

  text: {
    paddingTop: 20,
    paddingBottom: 5,  
     marginVertical: 0,
    marginHorizontal: 45,
   width: "80%",
     alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  title:{
    top: 90,
    textAlign: "center",
    color: "#E0AA3E",
    fontSize: 18,
    fontWeight: "bold",
  }
});

export default Settings;
