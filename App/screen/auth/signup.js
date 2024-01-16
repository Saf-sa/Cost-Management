import { View, Text, StyleSheet } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import Toast from "react-native-toast-message";
import { useNavigation, ScrollView, } from "@react-navigation/native";
import AuthHeader from "../../shared/components/AuthHeader";
import CustomInputSingup from "../../shared/components/ui/CustomInputSignup";
import CustomButton from "../../shared/components/ui/CustomButton";
import { LinearGradient } from "expo-linear-gradient";
import AppText from "../../shared/components/uiApp/AppText";

/*  import { REACT_APP_BE_URL } from "../../.env"; */
import axios from "axios";

// comment this line because solution not found if using .env file
// go to ligne 84
//import { API_URL, API_TOKEN } from "@env";
/*  import { REACT_APP_BE_URL } from "../../.env";  */

const isValidEmail = (email) => {
  const re = /\S+@\S+\.\S+/; // Should contain @
  return re.test(email);
};

const isValidPassword = (password) => {
  const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  // Should contain at least one number, one special character and minimum 8 characters
  return re.test(password);
};

const isValidConfirmPassword = (password, confirmPassword) => {
  return password === confirmPassword;
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
// check all value is valid
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
    if (!formIsValid(formData.firstName)) {
      updateError(
        "firstName",
        !isValidfirstName(formData.firstName)
          ? "First Name should 3 char min"
          : null
      );
    }
    if (!formIsValid(formData.lastName)) {
      updateError(
        "lastName",
        !isValidlastName(formData.lastName)
          ? "Last Name should 3 char min"
          : null
      );
    }
    if (!formIsValid(formData)) {
      updateError(
        "email",
        !isValidEmail(formData.email) ? "Invalid email" : null
      );
    }
    if (!formIsValid(formData.password)) {
      updateError(
        "Password",
        !isValidConfirmPassword(formData.password, formData.Password)
          ? "Passwords do not match"
          : null
      );
    }
    if (!formIsValid(formData.confirmPassword)) {
      updateError(
        "confirmPassword",
        !isValidConfirmPassword(formData.password, formData.confirmPassword)
          ? "Passwords do not match"
          : null
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // update formData with form values
    setFormData({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    });

    if (!formIsValid(email, password, confirmPassword, firstName, lastName)) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Please review your credentials",
        visibilityTime: 3000,
        autoHide: true,
      });

      updateError(
        "firstName",
        !isValidEmail(formData.firstName)
          ? "First Name should be at least 3 characters "
          : null
      );
      updateError(
        "lastName",
        !isValidEmail(formData.lastName)
          ? "Last Name should be at least 3 characters"
          : null
      );
      updateError(
        "email",
        !isValidEmail(formData.email) ? "Invalid email" : null
      );
      updateError(
        "password",
        !isValidPassword(formData.password)
          ? "Password should be at least 8 characters with 1 uppercase letter, 1 number, and 1 special character"
          : null
      );
      updateError(
        "confirmPassword",
        !isValidConfirmPassword(formData.confirmPassword, formData.password)
          ? "Passwords do not match"
          : null
      );
    }

    try {
      const response = await axios.post(
        `http://localhost:5555/api/users/register`,
        formData
      );
      console.log(response.data.message);
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Registrai failed",
        visibilityTime: 3000,
        autoHide: true,
      });
      setTimeout(() => {
        navigation.navigate("Login");
      }, 3000);
    } catch (err) {
      console.log("Test signup", err.response.data.message);
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
     {/*  <AuthHeader subtext="Please Signup" /> */}
    <LinearGradient
          style={styles.parentContainer}
          colors={["#f9f295", "#E0AA3E", "#F7EF8A", "#B88A44"]}
          start={{ x: 0.1, y: 0.1 }}
          end={{ x: 1, y: 3 }}
        >
          <View style={styles.balanceContainer}>
            <AppText style= {{ flexDirection: 'row' }}>
                     <View>
                <Text style={{ fontSize: 38, color:'blue', lineHeight: 35 }}>€</Text>
                </View>
                 <View>
                <Text style={{ fontSize: 44, color:'dodgerblue', lineHeight:42}}>X</Text>
                </View>
                 <View>
                <Text style={{ fontSize: 23, color:'midnightblue', lineHeight: 21 }}>penses Manager</Text>
                
                </View>
                <View>
              
                </View>

            </AppText>
            
            
            <AppText></AppText>
          </View>
          <View style={styles.parentIncomeContainer}>
            <View
              style={{
                color: "black",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
             
              <View style={{ marginLeft:0, marginTop:40 }}>
                <AppText style={{ color: "darkslateblue", fontSize: 15, }}>
                  4907 2024 1707 2778 1962
                </AppText>
               

                
              </View>
              
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
            
              <View style={{ marginLeft: 0 }}>
             
                
              </View>
            </View>
          </View>



          
        </LinearGradient>
     
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
          errorMessage={formErrors.confirmPassword}
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
      <Toast />
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  parentContainer: {

    width: "65%",
    height: 170,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 0,
    flexDirection: "column",
    borderRadius: 7,
    marginTop: 40,
    marginBottom: 60,
    marginHorizontal: 72,
    marginVertical: -20,
    backgroundColor: '#fff',
    shadowColor: "grey",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: {
      width: 0.8,
      height: 2,
    },
    elevation: 8,
  },
    parentIncomeContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 3,
    paddingBottom:0,
 
  },

  balanceContainer: {
    
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    width: "80%",

  },
  button: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginTop: 10,
    
  },
  login: {
    flexDirection: "row",
    marginTop: -50,
    marginBottom: 50,
    color: "#E0AA3E",
    fontSize: 15,
    fontWeight: "bold",
  },
  forgetPass: {
    flexDirection: "row",
    alignSelf: "flex-end",
    marginTop: 10,
    marginBottom: 30,
    color: "#E0AA3E",
    fontSize: 15,
    fontWeight: "bold",
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
