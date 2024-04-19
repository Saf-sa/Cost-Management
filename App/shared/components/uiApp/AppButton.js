import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';

const AppButton = ({ AppButtonText, icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        style={styles.buttonContainer}
        colors={['#f9f295', '#E0AA3E', '#F7EF8A', '#B88A44']}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 1, y: 3 }}
      >
        <View style={styles.iconContainer}>
          <Icon style={styles.icon} name={icon} />
        </View>
      </LinearGradient>
      <View style={styles.textContainer}>
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
    width: 66,
    height: 65,
    borderRadius: 6,
    borderWidth: 0.2,
    borderColor: 'brown',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginTop: 5,
  },
  buttonTitle: {
    color: 'black',
    fontSize: 13,
  },
  iconContainer: {
    color: 'black',
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon:{
    fontSize: 25,
  }
});
