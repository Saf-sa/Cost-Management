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
  return (
    <Screen2>
        <Text style={styles.title}>Update your Settings {/* {firstName} */} </Text> 
        <UserNav 
          image={require("../../../assets/iconPerson.png")}
   
         
        />
         </Screen2>
  )
}

const styles = StyleSheet.create({

    title:{
    top: 90,
    textAlign: "center",
    color: "#E0AA3E",
    fontSize: 20,
    fontWeight: "bold",
  }

  });

export default Settings