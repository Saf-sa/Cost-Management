import { View, Text, TouchableOpacity, StyleSheet  } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";

const CustomButton = ({ buttonText, onPress }) => {
  return (
         
    <TouchableOpacity style={styles.container} onPress={onPress}>
    
      <Text style={styles.text}> {buttonText}</Text>
    
     </TouchableOpacity>
  );
 
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    width: "40%",
    backgroundColor: "#E0AA3E",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
});