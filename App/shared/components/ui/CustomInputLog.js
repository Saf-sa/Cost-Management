import {
  View,
  Text, TextInput, StyleSheet, TouchableOpacity,} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

const CustomInputLog = (props) => {
  const {
    label,
    placeholder,
    error,
    secure,
    onChangeText,
    value,
    errorMessage,
    onIconPress,
  } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      <View style={styles.inputContainer}></View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={secure}
        onChangeText={onChangeText}
        value={value}
      />
      {label === "Password" && (
        <TouchableOpacity onPress={onIconPress}>
          <Icon name={secure ? "eye-slash" : "eye"} size={20} color="gray" />
        </TouchableOpacity>
      )}
      {errorMessage && <Text style={styles.errorMsg}>{errorMessage}</Text>}
    </View>
  );
};

export default CustomInputLog;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 0,
  },

  text: {
    color: "#0283a8",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  input: {
    color: "#000",
    marginBottom: 10,
    marginTop: 5,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#0283a8",
  },
  errorMsg: {
    color: "#ff8080",
  },
});
