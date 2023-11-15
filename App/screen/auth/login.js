import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const login = () => {
  return (
    <View style={styles.root}>

        {/* debut du header */}

      <View style={styles.header}>

        <Text style={styles.mainText}>COST MANAGER</Text>
        <Text style={styles.mainText}>Expense Tracker</Text>
        
      </View>

      { /*  fin du header */ }

          </View>

        
  )
}

export default login

const styles = StyleSheet.create({

    root: {
        flex: 1,  
    },
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

})

