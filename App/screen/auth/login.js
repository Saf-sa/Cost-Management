import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthHeader from "../../shared/components/AuthHeader";
import CustomInput from "../../shared/components/ui/CustomInput";
import CustomButton from "../../shared/components/ui/CustomButton";

const isValidEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const isValidPassword = (password) => {
  const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  return re.test(password);
};

const formIsValid = (DataObj) => {
  return (
    Object.values(DataObj).every((value) => value.trim() !== "") &&
    isValidEmail(DataObj.email) &&
    isValidPassword(DataObj.password)
  );
};

const Login = () => {
  const navigation = useNavigation();

  const [formErrors, setFormErrors] = useState({
    FirstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null,
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  


  const handleChange = (value, type) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [type]: value,
    }));
  };

  const handleSubmit = () => {
    if (formIsValid(formData)) {
      console.warn("Successfully logged");
    } else {
      setFormErrors({
        email: !isValidEmail(formData.email) ? "Invalid email" : null,
        password: !isValidPassword(formData.password)
          ? "Invalid password"
          : null,
        confirmPassword:
          formData.password !== formData.confirmPassword
            ? "Passwords do not match"
            : null,
      });
      console.warn("Invalid Form");
    }
  };

  return (
    <View style={styles.root}>
      <AuthHeader subtext="Please Login" />

      <View style={styles.content}>
        <CustomInput
          label="Email"
          value={formData.email}
          onChangeText={(value) => handleChange(value, "email")}
          placeholder="Your Email"
          secure={false}
          errorMessage={formErrors.password}
        />
        <CustomInput
          label="Password"
          value={formData.password}
          onChangeText={(value) => handleChange(value, "password")}
          placeholder="Your Password"
          secure={true}
          errorMessage={formErrors.password}
        />

        <CustomButton
          onPress={handleSubmit}
          style={styles.button}
          buttonText={"Login"}
        />

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
