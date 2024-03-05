import { View, Text, StyleSheet } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useNavigation, } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import CustomInputSingup from "../../shared/components/ui/CustomInputSignup";
import CustomButton from "../../shared/components/ui/CustomButton";
import { LinearGradient } from "expo-linear-gradient";
import AppText from "../../shared/components/uiApp/AppText";
import axios from "axios";

const isValidEmail = (email) => {
  // Should contain @
  const re = /\S+@\S+\.\S+/;
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

const formIsValid = (DataObj) => {
  return (
    Object.values(DataObj).every((value) => value.trim().length > 0) &&
    isValidEmail(DataObj.code) &&
    isValidEmail(DataObj.email) &&
    isValidPassword(DataObj.password) &&
    DataObj.password === DataObj.confirmPassword
  );
};

const ResetPassword = () => {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();
  const [formErrors, setFormErrors] = useState({
    email: null,
    code: null,
    password: null,
    confirmPassword: null,
  });

  const [formData, setFormData] = useState({
    code: "",
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
      "code",
      !isValidfirstName(formData.firstName)
        ? "code is invalid"
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
      code: code,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    });

    if (!formIsValid(code, email, password, confirmPassword)) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Please review your credentials",
        visibilityTime: 3000,
        autoHide: true,
      });
      
       updateError(
        "email",
        !isValidEmail(formData.email) ? "Invalid email" : null
      );
     updateError(
        "password",
        !isValidPassword(formData.password)
          ? "Password = min 8 char with 1 cap , 1 number,1 special char"
          : null
      );
       updateError(
        "confirmPassword",
        !isValidConfirmPassword(formData.password, formData.confirmPassword)
          ? "Passwords do not match"
          : null
      );
      /* for debogue console.warn("Invalid Form"); */
    }
    try {
         const response = await axios.post(
        "http://localhost:5555/api/user/password",
        formData
         );
         /* console.log(response.data); */
         Toast.show({
           type: "success",
           position: "bottom",
           text1: "password reset successfully",
           visibilityTime: 3000,
           autoHide: true,
         });
    setTimeout(() => {
        navigation.navigate("Login");
      }, 3000); 
  
    } catch (err) {
    /*   console.log(err.response.data.message); */
      /* for debug console.warn("Password reset failed"); */
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
    {/*   <AuthHeader subtext="Please Reset Your Password" /> */}
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

            </AppText>
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
            </View>
          </View>

        </LinearGradient>
      <View style={styles.content}>
        <CustomInputSingup
          label="Code"
          value={formData.code}
          onChangeText={(value) => handleChange(value, "code")}
          placeholder=" Code received by email "
          secure={false}
          errorMessage={formErrors.code}
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
          placeholder="Confirm your password"
          secure={!showPassword}
          errorMessage={formErrors.confirmPassword}
          onIconPress={() => setShowPassword(!showPassword)}
        />

        <CustomButton
          onPress={handleSubmit}
          style={styles.button}
          buttonText={"Reset Password"}
        />
      </View>
      <Toast />
    </View>
  );
};
export default ResetPassword;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor:"#F8F4D7",
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
    marginHorizontal: 75,

  },
    parentIncomeContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 5,
  },

  balanceContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    width: "80%",

  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    marginTop:80,
    marginBottom: 90,
  },
});
