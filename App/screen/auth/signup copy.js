import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AuthHeader from "../../shared/components/AuthHeader";
import CustomInputSingup from "../../shared/components/ui/CustomInputSignup";
import CustomButton from "../../shared/components/ui/CustomButton";
import axios from "axios";

// import the API_URL from the @env file
import { API_URL } from "../../.env";

// declare a variable to store the response from the server
const response = await axios.post(API_URL + "/signup", formData);

// check if the email is valid using a regular expression
const isValidEmail = (email) => {
  const re = /\S+@\S+\.\S+/; // Should contain @
  return re.test(email);
};

// check if the password is valid using a regular expression
const isValidPassword = (password) => {
  const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  // Should contain at least one number, one special character and minimum 8 characters
  return re.test(password);
};

// check if the first name is valid using a regular expression
const isValidFirstName = (FirstName) => {
  const re = /^[a-zA-Z]{3,}$/; // all letter and min 3
  return re.test(FirstName);
};

// check if the last name is valid using a regular expression
const isValidlastName = (lastName) => {
  const re = /^[a-zA-Z]{3,}$/; // all letter and min 3
  return re.test(lastName);
};
// check if the form is valid with all fields filled in correctly
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

// define a functional component to display the signup form

const Signup = () => {
  const navigation = useNavigation();

  const [formErrors, setFormErrors] = useState({
    FirstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null,
  });

  const [formData, setFormData] = useState({
    FirstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (value, type) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [type]: value,
    }));
  };

  // define a function to handle the form submission
  const handleSubmit = async () => {
    if (formIsValid(formData)) {
      try {
        const response = await axios.post({ API_URL }, formData);
        console.log(response.data);
        navigation.navigate("Login");
      } catch (error) {
        console.error(error);
      }
    } else {
      setFormErrors({
        FirstName: !isValidFirstName(formData.FirstName)
          ? "Invalid first name"
          : null,
        lastName: !isValidlastName(formData.lastName)
          ? "Invalid last name"
          : null,
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
      <AuthHeader subtext="Please Register" />
      <View style={styles.content}>
        <CustomInputSingup
          label="First Name"
          value={formData.FirstName}
          onChangeText={(value) => handleChange(value, "FirstName")}
          placeholder="Your First Name (min 3 letters) "
          secure={false}
          errorMessage={formErrors.FirstName}
        />

        <CustomInputSingup
          label="Confirm Password"
          value={formData.confirmPassword}
          onChangeText={(value) => handleChange(value, "confirmPassword")}
          placeholder="Comfirm your password"
          secure={!showPassword}
          errorMessage={formErrors.confirmPassword}
          onIconPress={() => setShowPassword(!showPassword)}
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
          placeholder="Comfirm your password"
          secure={!showPassword}
          errorMessage={formErrors.confirmPassword}
          onIconPress={() => setShowPassword(!showPassword)}
        />
        {/* input area  End*/}

        {/* Button Start */}

        <CustomButton
          onPress={handleSubmit}
          style={styles.button}
          buttonText={"Register"}
        />
        {/* Button End */}
      </View>
    </View>
  );
};

// export the component so it can be imported into other files
export default Signup;

// define your styles

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
}); // remove the extra closing bracket here