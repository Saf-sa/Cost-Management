import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AuthHeader from "../../shared/components/AuthHeader";
import CustomInputSingup from "../../shared/components/ui/CustomInputSignup";
import CustomButton from "../../shared/components/ui/CustomButton";
/*  import { REACT_APP_BE_URL } from "../../.env"; */
import  axios  from 'axios';

/* test("should return 200 if user is logged in", async () => { */


const isValidEmail = (email) => {
  const re = /\S+@\S+\.\S+/; // Should contain @
  return re.test(email);
};

const isValidPassword = (password) => {
  const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  // Should contain at least one number, one special character and minimum 8 characters
  return re.test(password);
};
// should at least 3 letter
const isValidfirstName = (firstName) => {
  const re = /^[a-zA-Z]{3,}$/; // all letter and min 3
  return re.test(firstName);
};
// should at least 3 letter
const isValidlastName = (lastName) => {
  const re = /^[a-zA-Z]{3,}$/; // all letter and min 3
  return re.test(lastName);
};
// check all value is not empty
const formIsValid = (DataObj) => {
  return (
    Object.values(DataObj).every((value) => value.trim().length > 0) && // check all value is not empty
    isValidEmail(DataObj.email) &&
    isValidPassword(DataObj.password) &&
    isValidfirstName(DataObj.firstName) &&
    isValidlastName(DataObj.lastName) &&
    DataObj.password === DataObj.confirmPassword
  );
};
//
const Signup = () => {
   
  const [password, setPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState(""); 
  const [email, setEmail] = useState("");
  const navigation = useNavigation(); 
  const [formErrors, setFormErrors] = useState({ 
  
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null,
  });

  const [formData, setFormData] = useState({
    firstName: "",
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

const handleSubmit = async (e) => {
  e.preventDefault();

  // update formData with form values
  setFormData({
    firstNameirstName: firstName,
    lastName:lastName ,
    email:email,
    password: password,
    confirmPassword:confirmPassword,
  });

  try {
    const response = await axios.post(
      `http://localhost:5555/api/user/register`,
      formData
    );
    console.log(response.data);
  } catch (err) {
    console.log(err.message);
  }

  if (formIsValid(formData)) {
    console.warn("Successfully registered");
    navigation.navigate("Login");
  } else {
    setFormErrors({
      firstName: !isValidfirstName(formData.firstName)
        ? "Invalid first name"
        : null,
      lastName: !isValidlastName(formData.lastName)
        ? "Invalid last name"
        : null,
      email: !isValidEmail(formData.email) ? "Invalid email" : null,
      password: !isValidPassword(formData.password) ? "Invalid password" : null,
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
          value={formData.firstName}
          onChangeText={(value) => handleChange(value, "firstName")}
          placeholder="Your First Name (min 3 letters) "
          secure={false}
          errorMessage={formErrors.firstName}
        />
        <CustomInputSingup
          label="last Name"
          value={formData.lastName}
          onChangeText={(value) => handleChange(value, "lastName")}
          placeholder="Your Laste Name (min 3 letters) "
          secure={false}
          errorMessage={formErrors.firstName}
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
          errorMessage={formErrors.password}
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