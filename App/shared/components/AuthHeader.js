 import { View, Text, StyleSheet } from 'react-native'
 import { LinearGradient } from "expo-linear-gradient";
 import React from 'react'
 
 const AuthHeader = ({ subtext,}) => {
   return (
     <LinearGradient
       style={styles.header}
      
       colors={["#0283a8", "#F7EF8A", "#0000FF", "#0283a8"]}
       start={{ x: 0.5, y: 0.6 }}
       end={{ x: 3, y: 2 }}
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
      /*   backgroundColor: '#0283a8', */
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
    },

    mainText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',

       
    },

    subtext: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginTop: 30,
       
    },



 })