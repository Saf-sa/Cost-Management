import { View, Text, TouchableOpacity, StyleSheet  } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import { icon } from '@fortawesome/fontawesome-svg-core';

const CustomIcon = ({ onPress, iconName }) => {
  return (
         
    
    <TouchableOpacity style={styles.container} onPress={onPress}>
       <LinearGradient
       style={styles.button}
       colors={["#f9f295", "#E0AA3E", "#F7EF8A", "#B88A44"]}
       start={{ x: 0.1, y: 0.1 }}
       end={{ x: 1, y: 3 }}
     >
        <Ionicons name={iconName} size={40} color="black" />
      {/* <Text style={styles.text}> {buttonText}</Text> */}
    </LinearGradient>
     </TouchableOpacity>   
     
  );
 
};

export default CustomIcon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "50%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: 60,
    width: 60,
  
  
  },
});