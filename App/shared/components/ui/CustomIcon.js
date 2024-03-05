import { TouchableOpacity, StyleSheet  } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

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
    borderRadius: 0,
    height: 63,
    width: 63,
  
  
  },
});