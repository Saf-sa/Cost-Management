import React, { useState, useRef, useEffect } from "react";
import Toast from "react-native-toast-message";
import { View, Text, StyleSheet, Platform} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomInputLog from "../../shared/components/ui/CustomInputLog";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SendButton from '../../shared//components/uiApp/AppSendButton'
import Card from "../../shared/components/uiApp/Card";
import axios from "axios";




/* if (Platform.OS === 'ios') {
  console.log('Your device is running iOS');
} else if (Platform.OS === 'android') {
  console.log('Your device is running Android');
} */
 
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
        text1: "invalid email",
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
       /*  console.log(response.data); */

        // Store user data in AsyncStorage
     const user = {
      id: response.data._id, // replace with actual user id key
      token: response.data.token, // replace with actual user token key
      firstName: response.data.firstName, // replace with actual user firstName key
      lastName: response.data.lastName, // replace with actual user lastName key
      email: response.data.email, 
      expiresIn: response.data.expiresIn, // replace with actual user email key
      // replace with actual user email key
     /*  password: response.data.password, // replace with actual user password key */
};
     /* console.log("user stored in asyncSorage", user); */
        try {
          const jsonValue = JSON.stringify(user);
          await AsyncStorage.setItem("@storage_Key", jsonValue);
/*           console.log("Data successfully saved" + " User Token", user.token)  ; */
          Toast.show({
            type: "success",
            position: "bottom",
            text1: "Successfully logged",
            visibilityTime: 3000,
            autoHide: true,
          });

          setTimeout(() => {
            navigation.navigate("Dashboard"); // Navigation after 3 seconds
          }, 3000); // Délay 3 seconds to navigate to Dashboard
        } catch (e) {
          /* console.error("Failed to save the data to the storage"); */
          Toast.show({
            type: "error",
            position: "bottom",
            text1: "Failed to save user data. Please try again.",
            visibilityTime: 3000,
            autoHide: true,
          });
        }
      } else {
       /*  console.error("No response from server"); */
      }
    } catch (err) {
/*       console.log("testy passowrd", err.response ? err.response.data : err); */
    
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
      <Card style={styles.card}
      cardText={"Welcome Back !"}
      />
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
<View style={styles.loginButton}>
        <SendButton
          onPress={handleSubmit}
          style={styles.button}
          sendButtonText={"Login"}
        />

        <Text style={styles.login}>New to Expense Manager?</Text>

        <SendButton
          style={styles.button}
          sendButtonText={"Signup"}
          onPress={() => navigation.navigate("Signup")}
        />
      </View>
      </View>
      <Toast />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor:"#F8F4D7",
    
  },
  content: {
    flex: 2,
    padding: 30,
  },

  login: {
    ...Platform.select({
      ios: {
    marginTop: 50,
    marginBottom: 50,
    color: "#E0AA3E",
    fontSize: 15,
    fontWeight: "bold",
  },
   android: {
     marginTop: 10,
    marginBottom: 20,
    color: "#E0AA3E",
    fontSize: 15,
    fontWeight: "bold",

          },
    }),
  },

  forgetPass: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginTop: 10,
    marginBottom: 30,
    color: "#E0AA3E",
    fontSize: 15,
    fontWeight: "bold",
  },
  loginButton: {
    position: "absolute",
    alignSelf: "center",
    alignItems  : "center",
    marginTop: 300,
  },

});