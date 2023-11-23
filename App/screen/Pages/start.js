
import React, { useState, useEffect} from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthHeader from "../../shared/components/AuthHeader";


const isValidEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

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