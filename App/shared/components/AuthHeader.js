 import { View, Text, StyleSheet } from 'react-native'
 import React from 'react'
 
 const AuthHeader = ({ subtext, subtext2, subtext3 }) => {
   return (
     <View style={styles.header}>
       <Text style={styles.mainText}>EXPENSE MANAGER</Text>
       <Text style={styles.subtext}>{subtext}</Text>
       <Text style={styles.subtext}>{subtext2}</Text>
       <Text style={styles.subtext}>{subtext3}</Text>
     </View>
   );
 };
 
 export default AuthHeader

 const styles = StyleSheet.create({

    header: {
        flex: 1,
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