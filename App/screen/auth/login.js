import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthHeader from "../../shared/components/AuthHeader";
import CustomInput from "../../shared/components/ui/CustomInput";
import CustomButton from "../../shared/components/ui/CustomButton";

const Login = () => {

  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (value, type) => {
    switch (type) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.root}>
      <AuthHeader subtext="Please Login"/>

      <View style={styles.content}>
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

        <CustomButton style={styles.button} buttonText={"Login"} />

        <Text style={styles.register}>New to Expense Manager?</Text>

        <CustomButton
          style={styles.button}
          buttonText={"Sign up Now"}
          onPress={() => navigation.navigate("Signup")} 
        />
      </View>
    </View>
  );
};

export default Login;


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
    marginTop: 40,
    marginBottom: 10,
    color: "#0283a8",
    fontSize: 15,
    fontWeight: "bold",
  },
});
