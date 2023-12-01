import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AuthHeader from "../../shared/components/AuthHeader";
import CustomInputSingup from "../../shared/components/ui/CustomInputSignup";
import CustomButton from "../../shared/components/ui/CustomButton";
/*  import { REACT_APP_BE_URL } from "../../.env"; */
import  axios  from 'axios';


// comment this line because solution not found if using .env file
// go to ligne 84
//import { API_URL, API_TOKEN } from "@env";
/*  import { REACT_APP_BE_URL } from "../../.env";  */

const isValidPassword = (password) => {
  const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  // Should contain at least one number, one special character and minimum 8 characters
  return re.test(password);
};

// check all value is not empty
const formIsValid = (DataObj) => {
  return (
    Object.values(DataObj).every((value) => value.trim().length > 0) && // check all value is not empty
    isValidPassword(DataObj.password) &&
    DataObj.password === DataObj.confirmPassword
  );
};
//
const Signup = () => {
   
  const [password, setPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation(); 
  const [formErrors, setFormErrors] = useState({ 
  
    password: null,
    confirmPassword: null,
  });

  const [formData, setFormData] = useState({
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
    password: password,
    confirmPassword:confirmPassword,
  });

  if (!formIsValid(formData)) {
    setFormErrors({
      password: !isValidPassword(formData.password) ? "Invalid password" : null,
      confirmPassword:
        formData.password !== formData.confirmPassword
          ? "Passwords do not match"
          : null,
    });
    console.warn("Invalid Form");
  }
  try {
    const response = await axios.post(
      `http://localhost:5555/api/user/reset`,
      formData
    );
    console.log(response.data);
    console.warn("Successfully reset password");
    navigation.navigate("resetPassword");
  } catch (err) {
    console.log(err.message);
    console.warn('Password reset failed')
  }

};
  return (
    <View style={styles.root}>
      <AuthHeader subtext="Please Reset Your Password" />
      <View style={styles.content}>
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
          buttonText={"Reset Password"}
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