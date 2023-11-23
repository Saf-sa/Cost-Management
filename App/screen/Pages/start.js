
import React, { useState, useEffect} from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthHeader from "../../shared/components/AuthHeader";

const Start = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            // Ici, vous pouvez effectuer des actions de déconnexion,  effacer les informations d'authentification de l'utilisateur...
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