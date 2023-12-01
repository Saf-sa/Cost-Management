import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AuthHeader from "../../shared/components/AuthHeader";
import CustomInputSingup from "../../shared/components/ui/CustomInputSignup";
import CustomButton from "../../shared/components/ui/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

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
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();
  const [token, setToken] = useState(null);
  const [formErrors, setFormErrors] = useState({
    code: "",
    password: null,
    confirmPassword: null,
  });

  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        console.log("Token from AsyncStorage:", storedToken); // add to verifie if token is stored
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
       
      }
    };

    getToken();
    console.log("Token from useEffect:", token);
  }, []);

   const saveTokenToStorage = async (token) => {
      
     try {
       await AsyncStorage.setItem("token", token);
       console.log("Token saved to AsyncStorage:", token);
       console.log("Token from saveTokenToStorage:", saveTokenToStorage);
     } catch (error) {
       console.error("Error saving token to AsyncStorage:", error);
     }
   };


  const [formData, setFormData] = useState({
    code: "",
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

  const handleSubmit = async () => {
    if (!formIsValid(formData)) {
      setFormErrors({
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
      if (token) {
        console.log("Token before sending request:", token);
        try {
          const response = await axios.post(
            "http://localhost:5555/api/users/resetPassword",
            formData,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          console.log("Server response:", response.data);
          const tokenFromServer = response.data.token;
          console.log("Token received from server:", tokenFromServer); // Log du token reçu du serveur

          // Stocker le token reçu dans AsyncStorage
          await AsyncStorage.setItem("token", tokenFromServer);

          navigation.navigate("resetPassword");
        } catch (err) {
          console.log("Request error:", err.message);
          console.warn("Password reset failed");
        }
      } else {
        console.warn("No token found");
      }
    }
  };

  
  return (
    <View style={styles.root}>
      <AuthHeader subtext="Please Reset Your Password" />
      <View style={styles.content}>
        <CustomInputSingup
          label="Code"
          value={formData.code} // change this line
          onChangeText={(value) => handleChange(value, "code")}
          placeholder=" Code received by email "
          secure={false}
          errorMessage={formErrors.code}
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
