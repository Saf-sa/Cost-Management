import { View, Text, TouchableOpacity, StyleSheet  } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";

const CustomButton = ({ buttonText, onPress }) => {
  return (
         
    
    <TouchableOpacity style={styles.container} onPress={onPress}>
       <LinearGradient
       style={styles.button}
       colors={["#f9f295", "#E0AA3E", "#F7EF8A", "#B88A44"]}
       start={{ x: 0.1, y: 0.1 }}
       end={{ x: 1, y: 3 }}
     >
      <Text style={styles.text}> {buttonText}</Text>
    </LinearGradient>
     </TouchableOpacity>   
     
  );
 
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "50%",
    

  },
  button: {
    justifyContent: "center", 
    width: "100%",
    height: "25%",
    borderRadius: 8,
    alignItems: "center",



  },

  text: {
    color: "grey",
    fontSize: 15,
    fontWeight: "bold",
  },
});