import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AuthHeader from "../../shared/components/AuthHeader";
import CustomInput from "../../shared/components/ui/CustomInput";
import CustomButton from "../../shared/components/ui/CustomButton";

const isValidEmail = (email) => {
  const re = /\S+@\S+\.\S+/; // Should contain @
  return re.test(email);
};

const isValidPassword = (password) => {
  const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
 // Should contain at least one number, one special character and minimum 8 characters
  return re.test(password);
};

const isValidFirstName = (FirstName) => {
  const re = /^[a-zA-Z]{3,}$/; // all letter and min 3
  return re.test(FirstName);
};

const isValidlastName = (lastName) => {
  const re = /^[a-zA-Z]{3,}$/; // all letter and min 3
  return re.test(lastName);
};
const formIsValid = (DataObj) => {
  return (
    Object.values(DataObj).every((value) => value.trim().length > 0) && // check all value is not empty
    isValidEmail(DataObj.email) &&
    isValidPassword(DataObj.password) &&
    isValidFirstName(DataObj.FirstName) &&
    isValidlastName(DataObj.lastName) &&
    DataObj.password === DataObj.confirmPassword
  );
};

const Signup = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [FirstName, setFirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setEmail] = useState("");
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    FirstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (value, type) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [type]: value,
    }));
  };


  const handleSubmit = () => {
    if (formIsValid(formData)) {
      console.warn("Form is valid");
    } else {
      console.warn("Invalid Form");
    }
  };



  return (
    <View style={styles.root}>
      <AuthHeader subtext="Please Register" />
      <View style={styles.content}>
        <CustomInput
          label="First Name"
          value={formData.FirstName}
          onChangeText={(value) => handleChange(value, "FirstName")}
          placeholder="Your First Name"
          secure={false}
        />
        <CustomInput
          label="last Name"
          value={formData.lastName}
          onChangeText={(value) => handleChange(value, "lastName")}
          placeholder="Your Last Name"
          secure={false}
        />
        <CustomInput
          label="Email"
          value={formData.email}
          onChangeText={(value) => handleChange(value, "email")}
          placeholder="Your Email"
          secure={false}
        />
        <CustomInput
          label="Password"
          value={formData.password}
          onChangeText={(value) => handleChange(value, "password")}
          placeholder="Your Password"
          secure={true}
        />
        <CustomInput
          label="Confirm Password"
          value={formData.confirmPassword}
          onChangeText={(value) => handleChange(value, "confirmPassword")}
          placeholder="Confirm Password"
          secure={true}
        />
      
        <CustomButton
          onPress={handleSubmit}  
          style={styles.button}
          buttonText={"Register"}

        />
        {/* input area  End*/}

        {/* Button Start */}

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
