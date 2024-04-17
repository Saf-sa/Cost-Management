import {
  Text,
  View,
  StyleSheet,
  Toast,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
 import { LinearGradient } from "expo-linear-gradient";
 import React from 'react'
 
 const AppButton = ({ catText, cat ,icon, nav}) => {
   return (
     <LinearGradient
       style={styles.button}
       colors={["#f9f295", "#E0AA3E", "#F7EF8A", "#B88A44"]}
       start={{ x: 0.1, y: 0.1 }}
       end={{ x: 1, y: 3 }}
     >
       <View style={styles.AppButton}>
        <View style={styles.button}>
         <TouchableOpacity onPress={() => navigation.push("ViewIncomes")}>
           <View style={styles.icon}>
              <Image source={icon} style={styles.icon} 
                size={Platform.select({ ios: 66, android: 58 })}
              />
              </View>
                 </TouchableOpacity>
              <View>
              <Text style={styles.textCat}> Income</Text>
        
            </View>

            </View>
            
           
         
       </View>
     </LinearGradient>
   );
 };
 
 export default AppButton

 const styles = StyleSheet.create({
  button: {
    width: 70,
    height: 70,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
   
  },
  AppButton: {
    
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  
  },

    textCat:{
      ...Platform.select({
      ios: {
     position: "relative",
    fontSize: 17,
    paddingTop: 40,
    textAlign:"center",

  
  },
    android: {
    marginBottom: 10,
    fontSize: 20, 
    paddingTop: 1,
    paddingBottom: 1,
    textAlign:"center"
  
    },
    }),
  },
   mainText: {
     fontSize: 30,
     fontWeight: "bold",
     color: "#fff",
     textAlign: "center",
   },

   subtext: {
     fontSize: 20,
     fontWeight: "bold",
     color: "#fff",
     textAlign: "center",
     marginTop: 30,
   },
 });