 import { View, Text, StyleSheet } from 'react-native'
 import React from 'react'
 
 const AuthHeader = ({ subtext,}) => {
   return (
     <View style={styles.header}>
       <Text style={styles.mainText}>EXPENSE MANAGER</Text>
       <Text style={styles.subtext}>{subtext}</Text>
   
     </View>
   );
 };
 
 export default AuthHeader

 const styles = StyleSheet.create({

    header: {
        flex: 0.5,
        backgroundColor: '#0283a8',
        alignItems: 'center',
        justifyContent: 'center',
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