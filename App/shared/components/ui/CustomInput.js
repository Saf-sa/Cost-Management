import { View, Text, TextInput, StyleSheet} from 'react-native'
import React from 'react'

const CustomInput = () => {
  return (
    <View style={StyleSheet.container}>
      <Text style={styles.text}>Email</Text>
        <TextInput style={styles.input}  placeholder='Your Email' />
        <Text style={styles.errorMsg}>Error</Text>
        <Text style={styles.text}>Password</Text>
        <TextInput  style={styles.input} placeholder='Your Password' />
        <Text style={styles.errorMsg}>Error</Text>
    </View>
  )
}

export default CustomInput

const styles = StyleSheet.create({ 

    container: {
        width: '100%',
        marginBottom: 0,

},

    text: {
        color: '#0283a8',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,


    },

    input: {
        marginBottom: 10,
        marginTop: 5,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1, 
        borderColor: '#0283a8',
    },
    errorMsg:{
        color: '	#BEBEBE',
        margintop: 10,
        marginBottom: 20,
        fontWeight: 'bold',


    },
    });