import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';

const SendButton = ({ sendButtonText, onPress }) => {

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        style={styles.buttonContainer}
        colors={['#f9f295', '#E0AA3E', '#F7EF8A', '#B88A44']}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 1, y: 3 }}>
         <View style={styles.CaText}>
   <Text style={styles.buttonText}>{sendButtonText}</Text>
      </View>
      </LinearGradient>
 
  
    </TouchableOpacity>
  
  );
};

export default SendButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  buttonContainer: {
    width: 140,
    height: 50,
     borderWidth:0.5,
  borderColor: 'lightGrey',
    borderRadius: 6,
    borderColor: "grey",
    justifyContent: 'center',
    alignItems: 'center',

  },
  buttonText: {
    color: 'grey',
    fontWeight: 'bold',

  },  

  buttonTitle: {
    color: 'black',
    fontSize: 16,
     alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    color: 'black',
    fontSize: 35,
    textAlign: 'center',
    justifyContent: 'center',
  },
});
