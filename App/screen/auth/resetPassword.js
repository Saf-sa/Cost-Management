import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AuthHeader from "../../shared/components/AuthHeader";
import CustomInputSingup from "../../shared/components/ui/CustomInputSignup";
import CustomButton from "../../shared/components/ui/CustomButton";
import axios from "axios";

const isValidEmail = (email) => {
  // Should contain @
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const isValidPassword = (password) => {
  const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  return re.test(password);
};

const formIsValid = (DataObj) => {
  return (
    Object.values(DataObj).every((value) => value.trim().length > 0) &&
    isValidPassword(DataObj.password) &&
    DataObj.password === DataObj.confirmPassword
  );
};

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    code: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({
    code: "",
    email: "",
    password: null,
    confirmPassword: null,
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigation = useNavigation();

  const handleChange = (value, type) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [type]: value,
    }));
  };

  const handleSubmit = async () => {
    setErrorMessage(null);
    if (!formIsValid(formData)) {
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
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5555/api/users/reset",
          {
            code: formData.code, // Include the code in the request
            password: formData.password,
            confirmPassword: formData.confirmPassword,
          }
        );
        console.log("Server response:", response.data);
        navigation.navigate("resetPassword");
      } catch (err) {
        console.log("Request error:", err.message);
        console.warn("Password reset failed");
      }
    }
  };

  return (
    <View style={styles.root}>
      <AuthHeader subtext="Please Reset Your Password" />
      <View style={styles.content}>
        <CustomInputSingup
          label="Code"
          value={formData.code}
          onChangeText={(value) => handleChange(value, "code")}
          placeholder=" Code received by email "
          secure={false}
          errorMessage={formErrors.code}
        />
        <CustomInputSingup
          label="Email"
          value={formData.email}
          onChangeText={(value) => handleChange(value, "email")}
          placeholder="Your Email"
          secure={false}
          errorMessage={formErrors.email}
        />
        <CustomInputSingup
          label="Password"
          value={formData.password}
          onChangeText={(value) => handleChange(value, "password")}
          placeholder=" min 8 with 1 capital char, 1 number,1 special char "
          secure={!showPassword}
          errorMessage={formErrors.password}
          onIconPress={() => setShowPassword(!showPassword)}
        />
        <CustomInputSingup
          label="Confirm Password"
          value={formData.confirmPassword}
          onChangeText={(value) => handleChange(value, "confirmPassword")}
          placeholder="Confirm your password"
          secure={!showPassword}
          errorMessage={formErrors.confirmPassword}
          onIconPress={() => setShowPassword(!showPassword)}
        />
        {/* Display the error message if it exists */}
        {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}
        {/* input area  End*/}
        {/* Button Start */}
        <CustomButton
          onPress={handleSubmit}
          style={styles.button}
          buttonText={"Reset Password"}
        />
        {/* Button End */}
      </View>
    </View>
  );
};

export default ResetPassword;

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
});
