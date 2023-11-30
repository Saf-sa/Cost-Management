import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthHeader from "../../shared/components/AuthHeader";
import CustomInputLog from "../../shared/components/ui/CustomInputLog";
import CustomButton from "../../shared/components/ui/CustomButton";
import axios from "axios";

const isValidEmail = (email) => {
  // Should contain @
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const formIsValid = (DataObj) => {
  return (
    Object.values(DataObj).every((value) => value.trim() !== "") &&
    isValidEmail(DataObj.email)
  );
};

const Reset = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [formErrors, setFormErrors] = useState({
    email: null,
  });

  const [formData, setFormData] = useState({
    email: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (value, type) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [type]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // update formData with form values
    setFormData({
      email: email,
    });

    if (!formIsValid(formData)) {
          setFormErrors({
            email: !isValidEmail(formData.email) ? "Invalid email" 
            : null,
          });
          console.warn("Email does not exist");
        }
        try{
           const response = await axios.post(
           `http://localhost:5555/api/user/reset`,
            formData
  );
      console.log(response.data);
      console.warn("Check your email to reset your password");
      navigation.navigate("Login");
    } 
      catch (err) {
      console.log(err.message);
      console.warn("Reset Password failed");
    }
  };

  return (
    <View style={styles.root}>
      <AuthHeader subtext="Please Login" />

      <View style={styles.content}>
        <CustomInputLog
          label="Email"
          value={formData.email}
          onChangeText={(value) => handleChange(value, "email")}
          placeholder="Your Email"
          secure={false}
          errorMessage={formErrors.email}
        />

        <CustomButton
          onPress={handleSubmit}
          style={styles.button}
          buttonText={"Reset password"}
        />
      </View>
    </View>
  );
};

export default Reset;

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
