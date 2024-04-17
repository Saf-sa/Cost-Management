import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';

const AppButton = ({ AppButtonText, icon, onPress }) => {

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        style={styles.buttonContainer}
        colors={['#f9f295', '#E0AA3E', '#F7EF8A', '#B88A44']}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 1, y: 3 }}>
      <View style={styles.icon}>
          <Icon style={styles.icon} name=/* {"dollar-sign"} */{icon}  />
          
        </View> 
      </LinearGradient>
  <View style={styles.CaText}>
   <Text style={styles.buttonTitle}>{AppButtonText}</Text>
      </View>
  
    </TouchableOpacity>
  
  );
};

export default AppButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  buttonContainer: {
    width: 60,
    height: 55,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',

  },
  CaText: {
    color: 'black',

  },  

  buttonTitle: {
    color: 'black',
    fontSize: 13,
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
