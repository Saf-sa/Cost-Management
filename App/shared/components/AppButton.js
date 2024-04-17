import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';

const AppButton = ({ buttonText, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        style={styles.buttonContainer}
        colors={['#f9f295', '#E0AA3E', '#F7EF8A', '#B88A44']}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 1, y: 3 }}>
        <View style={styles.button}>
          <Icon name="dollar-sign" size={60} color="black" />
          
        </View>
        
      </LinearGradient>
      <View style={styles.CaText}>
      <Text style={styles.buttonText}>{buttonText}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  buttonContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
