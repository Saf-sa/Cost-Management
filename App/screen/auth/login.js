import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import AuthHeader from '../../shared/components/AuthHeader'

const login = () => {
  return (
    <View style={styles.root}>
       <AuthHeader subtext="Please Login"/>  
       
    {/* Container Start */}
    <View style={styles.content}></View>


     {/* Container End */}

          </View>
  )
};

export default login;

const styles = StyleSheet.create({

    root: {
        flex: 1,  
    },
    content: {
        flex: 2.7,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    
    },

})

