import React, { useState, useRef, useEffect} from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import CustomInputLog from "../../shared/components/ui/CustomInputLog";
import SendButton from '../../shared//components/uiApp/AppSendButton'
import Card from "../../shared/components/uiApp/Card";

/*  import { REACT_APP_BE_URL } from "../../.env"; */
import axios from "axios";

const isValidEmail = (email) => {
  // Should contain @
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};
// check all value is not empty
const formIsValid = (DataObj) => {
  return (
    Object.values(DataObj).every((value) => value.trim().length > 0) && // check all value is not empty
    isValidEmail(DataObj.email)
  );
};

const ResetLogin = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [formErrors, setFormErrors] = useState({
    email: null,
  });

  const [formData, setFormData] = useState({
    email: "",
  });

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // update formData with form values
    setFormData({
      email: email,
    });

    if (!formIsValid(formData)) {
          Toast.show({
            type: "error",
            position: "bottom",
            text1: "Please review your credentials",
            visibilityTime: 2000,
            autoHide: true,
          }); 
      return updateError(
        "email",
        !isValidEmail(formData.email) ? "Invalid email" : null
      );

    }
    try {
         const response = await axios.post(
        `http://localhost:5555/api/users/reset`,
        formData
      );
/*       console.log(response.data); */
         Toast.show({
           type: "success",
           position: "bottom",
           text1: "Check your email to reset your password",
           visibilityTime: 3000,
           autoHide: true,
         });
      setTimeout(() => {
        navigation.navigate("ResetPassword"); // Navigation après 3 secondes
      }, 3000); // Délai de 3000 millisecondes (3 secondes)
    
    
    } catch (err) {
/*       console.log('Test signup',err.response.data); */
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
      <View style={styles.card}>
          <Card
      cardText={"Please reset your password !"}
      />
 </View>
      <View style={styles.content}>
        <CustomInputLog
          label="Email"
          value={formData.email}
          onChangeText={(value) => handleChange(value, "email")}
          placeholder="Your Email"
          secure={false}
          errorMessage={formErrors.email}
          
        />
    
        <View style={styles.resetButton}>
        <SendButton style={styles.Button}
          onPress={handleSubmit}
          sendButtonText={"Submit"}
        />

      </View>
        <Text style={styles.textEmail}>
        You'll recieve a code per email to reset your password
        </Text>
       
      </View>
      
    <Toast/>
     
    </View>
    
  );
};

export default ResetLogin;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor:"#F8F4D7",
  },

  content: {
    flex: 2,
    paddingHorizontal: 30,
    marginTop:70,
    paddingTop: 50,
    
  },
  card:{
    paddingTop:5,

  }
,
  textEmail: {
    textAlign: "center",
    marginTop: 40,
    color: "#E0AA3E",
    fontSize: 14,
    fontWeight: "bold",
  },

    resetButton: {
    position: "absolute",
    alignSelf: "center",
    alignItems  : "center",
    marginTop: 300,
  },
 
});
