 import { View, Text, StyleSheet } from 'react-native'
 import { LinearGradient } from "expo-linear-gradient";
 import React from 'react'
 
 const AuthHeader = ({ subtext,}) => {
   return (
     <LinearGradient
       style={styles.header}
       colors={["#f9f295", "#E0AA3E", "#F7EF8A", "#B88A44"]}
       start={{ x: 0.1, y: 0.1 }}
       end={{ x: 1, y: 3 }}
     >
       <View style={styles.header}>
         <Text style={styles.mainText}>EXPENSE MANAGER</Text>
         <Text style={styles.subtext}>{subtext}</Text>
       </View>
     </LinearGradient>
   );
 };
 
 export default AuthHeader

 const styles = StyleSheet.create({
   header: {
     flex: 0.5,
     /*   backgroundColor: '#E0AA3E', */
     alignItems: "center",
     justifyContent: "center",
     borderRadius: 7,
   },

   mainText: {
     fontSize: 30,
     fontWeight: "bold",
     color: "#fff",
     textAlign: "center",
   },

   subtext: {
     fontSize: 15,
     fontWeight: "bold",
     color: "#fff",
     textAlign: "center",
     marginTop: 30,
   },
 });