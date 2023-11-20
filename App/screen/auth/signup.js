import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AuthHeader from "../../shared/components/AuthHeader";
import CustomInput from "../../shared/components/ui/CustomInput";
import CustomButton from "../../shared/components/ui/CustomButton";

const Signup = () => {
  const navigation = useNavigation();

  const [placeholder, setPlaceholder] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <View style={styles.root}>
      <AuthHeader subtext="Please Register" />

      {/* Container Start */}

      {/* input area Start */}

      <View style={styles.content}>
        <CustomInput
          label="First Name"
          value={FirstName}
          onChangeText={(value) => handleChange(value, "FirstName")}
          placeholder="Your First Name"
          secure={false}
        />
        <CustomInput
          label="last Name"
          value={lastName}
          onChangeText={(value) => handleChange(value, "lastName")}
          placeholder="Your Last Name"
          secure={false}
        />
        <CustomInput
          label="Email"
          value={email}
          onChangeText={(value) => handleChange(value, "email")}
          placeholder="Your Email"
          secure={false}
        />
        <CustomInput
          label="Password"
          value={password}
          onChangeText={(value) => handleChange(value, "password")}
          placeholder="Your Password"
          secure={true}
        />

        <CustomInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={(value) => handleChange(value, "confirmPassword")}
          placeholder="Confirm Password"
          secure={true}
        />
        {/* input area  End*/}

        {/* Button Start */}
        <CustomButton
          style={styles.button}
          buttonText={"Register"}
          onPress={() => navigation.navigate("Login")}
        />

        {/* Button End */}
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 2,
    padding: 20,
  },
  button: {
    marginTop: 20,
  },
  register: {
    marginTop: 30,
    marginBottom: 10,
    color: "#0283a8",

    fontSize: 15,
    fontWeight: "bold",
  },
});
