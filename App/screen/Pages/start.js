
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthHeader from "../../shared/components/AuthHeader";




const Start = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            // here i call the logout function & 
            //navigate to login screen & remove the back button & refresh deleted fields
            navigation.replace("Login");
          }}
          title="Logout"
        />
      ),
    });
  }, [navigation]);
  return (
    <View>
      <Text>start</Text>
    </View>
  )
}

export default Start