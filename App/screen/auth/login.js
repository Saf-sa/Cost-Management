import React, { useState, useRef, useEffect } from "react";
import Toast from "react-native-toast-message";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthHeader from "../../shared/components/AuthHeader";
import CustomInputLog from "../../shared/components/ui/CustomInputLog";
import CustomButton from "../../shared/components/ui/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    Object.values(DataObj).every((value) => value.trim().length > 0) && // check all value is not empty
    isValidEmail(DataObj.email) &&
    isValidPassword(DataObj.password)
  );
};

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({
    email: null,
    password: null,
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
        !isValidEmail(formData.email) ? "Invalid email" : null
      );
    }
    if (!formIsValid(formData)) {
      updateError(
        "password",
        !isValidPassword(formData.password) ? "Invalid password" : null
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
        text1: "Please fill all the fields",
        visibilityTime: 3000,
        autoHide: true,
      });
      return updateError(
        "email",
        !isValidEmail(formData.email) ? "Invalid email " : null,
        updateError(
          "password",
          !isValidPassword(formData.password) ? "Invalid password " : null
        )
      );
    }

    try {
      const response = await axios.post(
        `http://localhost:5555/api/users/login`,
        formData
      );

      if (response) {
        console.log(response.data);

        // Store user data in AsyncStorage
     const user = {
 id: response.data._id, // replace with actual user id key
  token: response.data.token, // replace with actual user token key
  firstName: response.data.firstName, // replace with actual user firstName key
  lastName: response.data.lastName, // replace with actual user lastName key
};
     console.log("user stored in asyncSorage", user);
        try {
          const jsonValue = JSON.stringify(user);
          await AsyncStorage.setItem("@storage_Key", jsonValue);
          console.log("Data successfully saved" + " User Token", user.token)  ;
          Toast.show({
            type: "success",
            position: "bottom",
            text1: "Successfully logged",
            visibilityTime: 3000,
            autoHide: true,
          });

          setTimeout(() => {
            navigation.navigate("Dashboard"); // Navigation après 3 secondes
          }, 3000); // Délai de 3000 millisecondes (3 secondes)
        } catch (e) {
          console.error("Failed to save the data to the storage");
          Toast.show({
            type: "error",
            position: "bottom",
            text1: "Failed to save user data. Please try again.",
            visibilityTime: 3000,
            autoHide: true,
          });
        }
      } else {
        console.error("No response from server");
      }
    } catch (err) {
      console.log("testy passowrd", err.response ? err.response.data : err);
    
      Toast.show({
        type: "error",
        position: "bottom",
        text1: err.response ? err.response.data.message : "Error",
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
          colors={["#f9f295", "#E0AA3E", "#F7EF8A", "#B88A44"]}
          start={{ x: 0.1, y: 0.1 }}
          end={{ x: 1, y: 3 }}
          buttonText={"Login"}
        />

        <Text style={styles.login}>New to Expense Manager?</Text>

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
    marginTop: 10,
  },
  login: {
    flexDirection: "row",
    marginTop: -100,
    marginBottom: 40,
    color: "#E0AA3E",
    fontSize: 15,
    fontWeight: "bold",
  },
  forgetPass: {
    flexDirection: "row",
    alignSelf: "flex-end",
    marginTop: 10,
    marginBottom: 40,
    color: "#E0AA3E",
    fontSize: 15,
    fontWeight: "bold",
  },
});
