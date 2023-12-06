import React, { useState, useRef, useEffect } from "react";
import Toast from "react-native-toast-message";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthHeader from "../../shared/components/AuthHeader";
import CustomInputLog from "../../shared/components/ui/CustomInputLog";
import CustomButton from "../../shared/components/ui/CustomButton";
import axios from "axios";

// comment this line because solution not found if using .env file
// go to ligne 84
//import { API_URL, API_TOKEN } from "@env";
/*  import { REACT_APP_BE_URL } from "../../.env";  */

const isValidEmail = (email) => {
  // Should contain @
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const isValidPassword = (password) => {
  // Should contain at least one number, one special character and minimum 8 characters

  const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  return re.test(password);
};
// check all value is not empty
const formIsValid = (DataObj) => {
  return (
    Object.values(DataObj).every((value) => value.trim() !== "") &&
    isValidEmail(DataObj.email) &&
    isValidPassword(DataObj.password)
  );
};

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null,
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const timeoutIdRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  const handleChange = (value, type) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [type]: value,
    }));
  };

  const updateError = (type, errorMessage) => {
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      [type]: errorMessage,
    }));

    if (errorMessage) {
      timeoutIdRef.current = setTimeout(() => {
        setFormErrors((prevFormErrors) => ({
          ...prevFormErrors,
          [type]: null,
        }));
      }, 3000); // 3000 milliseconds = 3 seconds
    }
  };
  const isValidForm = () => {
    if (!formIsValid(formData)) {
      updateError(
        "email",
        !isValidEmail(formData.email) ? "Invalid email coucou  " : null
      );
    }
     if (!formIsValid(formData.password)) {
       updateError(
         "password",
         !isValidEmail(formData.password) ? "Invalid password coucou  " : null
       );
     }
      
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // update formData with form values
    setFormData({
      email: email,
      password: password,
    });

    if (!formIsValid(formData)) {
       Toast.show({
         type: "error",
         position: "bottom",
         text1: "Please review your credentials",
         visibilityTime: 3000,
         autoHide: true,
       });
    return updateError(
      "email",
      !isValidEmail(formData.email)
        ? "Invalid email "
        : null,
    updateError(
      "password",
      !isValidPassword(formData.password)
        ? "Invalid password "
        : null
    )
        
    );
   
    }
    
    try {
      const response = await axios.post(
        `http://localhost:5555/api/user/login`,
        formData
      );
      console.log(response.data);
            Toast.show({
              type: "success",
              position: "bottom",
              text1: "Successfully logged",
              visibilityTime: 3000,
              autoHide: true,
            });
      setTimeout(() => {
        navigation.navigate("Start"); // Navigation après 3 secondes
      }, 3000); // Délai de 3000 millisecondes (3 secondes)

      
      /*  for debogue console.warn("Successfully logged"); */
    } catch (err) {
      console.log(err.response.data.message);
      Toast.show({
        type: "error",
        position: "bottom",
        text1: err.response.data.message,
        visibilityTime: 3000,
        autoHide: true,
      });
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
        <CustomInputLog
          label="Password"
          value={formData.password}
          onChangeText={(value) => handleChange(value, "password")}
          placeholder="Your Password"
          secure={!showPassword}
          errorMessage={formErrors.password}
          onIconPress={() => setShowPassword(!showPassword)}
        />
        <Text
          style={styles.forgetPass}
          onPress={() => navigation.navigate("Reset")}
        >
          Forget Your Password?
        </Text>

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
      <Toast />
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
  forgetPass: {
    flexDirection: "row",
    alignSelf: "flex-end",
    marginTop: 20,
    marginBottom: 10,
    color: "#0283a8",
    fontSize: 15,
    fontWeight: "bold",
  },
});
