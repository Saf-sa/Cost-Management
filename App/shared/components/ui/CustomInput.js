import { View, Text, TextInput, StyleSheet} from 'react-native'
import React  from 'react'



const CustomInput = (props) => {
    const {label, placeholder, error, secure} = props;

    

  return (
    
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
        <TextInput style={styles.input} placeholder={ placeholder} secureTextEntry={secure}  />
        
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
        color: '#ff8080',

    },

    });