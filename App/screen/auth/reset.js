import React, { useState, useRef, useEffect, TouchableOpacity } from "react";
import { View, Text, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation , ScrollView,} from "@react-navigation/native";
import AuthHeader from "../../shared/components/AuthHeader";
import CustomInputLog from "../../shared/components/ui/CustomInputLog";
import CustomButton from "../../shared/components/ui/CustomButton";
import { LinearGradient } from "expo-linear-gradient";
import AppText from "../../shared/components/uiApp/AppText";
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
            visibilityTime: 3000,
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
      console.log(response.data);
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
      console.log('Test signup',err.response.data);
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
     {/*  <AuthHeader subtext="Please Reset your Password" /> */}
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
        <CustomInputLog
          label="Email"
          value={formData.email}
          onChangeText={(value) => handleChange(value, "email")}
          placeholder="Your Email"
          secure={false}
          errorMessage={formErrors.email}
          
        />
      <AppText></AppText>
          {/* Button Start */}
        <CustomButton style={styles.Button}
          onPress={handleSubmit}
          buttonText={"Reset"}
        />
        {/* Button End */}
        <Text style={styles.textEmail}>
          We'll send you an email to reset your password
        </Text>
       
       
      </View>
      

      
    <Toast/>
     
    </View>
    
  );
};

export default ResetLogin;

const styles = StyleSheet.create({
  root: {
    flex: 2,
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
  content: {
    flex: 1,
    paddingHorizontal: 30,
    marginTop:90,
    paddingTop: 20,
    marginBottom: 300,
    
  },
  textEmail: {
    
    color: "#000",
    textAlign: "center",
    marginTop: 40,
    color: "#E0AA3E",
    fontSize: 16,
    fontWeight: "bold",
  },


 
});
