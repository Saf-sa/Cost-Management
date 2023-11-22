import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthHeader from "../../shared/components/AuthHeader";
import CustomInputLog from "../../shared/components/ui/CustomInputLog";
import CustomButton from "../../shared/components/ui/CustomButton";


const isValidEmail = (email) => {
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

  const [formErrors, setFormErrors] = useState({
   
    email: null,
  });

  const [formData, setFormData] = useState({
    email: "",
   
  });



  const handleChange = (value, type) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [type]: value,
    }));
  };

  const handleSubmit = () => {
    if (formIsValid(formData)) {
      console.warn("Please Check your email");
    } else {
      setFormErrors({
        email: !isValidEmail(formData.email) ? "Invalid email" : null,
      
      });
      console.warn("Invalid Form");
    }
  };

  return (
    <View style={styles.root}>
      <AuthHeader subtext="Please enter your email to reset your Password" />

      <View style={styles.content}>
        <CustomInputLog
          label="Email"
          value={formData.email}
          onChangeText={(value) => handleChange(value, "email")}
          placeholder="Your Email"
          secure={false}
          errorMessage={formErrors.password}
        />

        <CustomButton
          style={styles.button}
          buttonText={"Reset Password"}
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </View>
  );
};

export default Reset; ;

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

  forgetPass: {
    flexDirection: "row",
    alignSelf: "flex-end",
    marginTop: 0,
    marginBottom: 10,
    color: "#0283a8",
    fontSize: 15,
    fontWeight: "bold",
  },
});
