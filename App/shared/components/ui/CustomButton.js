import { View, Text, TouchableOpacity, StyleSheet  } from 'react-native'
import React from 'react'

const CustomButton = () => {
  return (
    <TouchableOpacity style={styles.container}>
    
    <Text style={styles.text}> Login</Text> 


    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  container: {
    width: '40%',
    backgroundColor: '#0283a8',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
    text: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    } 

})