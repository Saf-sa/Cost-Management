/* import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/FontAwesome";


const CustomFormDate = (props) => {
  const { label, children } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      <View style={styles.inputContainer}>{children}</View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 0,
  },

  text: {
    color: "#E0AA3E",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#E0AA3E",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },

  input: {
    color: "#000",
    flex: 1,
  },

  errorMsg: {
    color: "#ff8080",
  },
});


export default CustomFormDate;
 */