import React, { useState, useRef, useEffect} from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
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

            </AppText>
            
          </View>
                       <Image style={styles.simCard} source={require('../../assets/sim-card.png')} />
          <View style={styles.parentIncomeContainer}>
              <View style={{ marginLeft:15,  marginTop:40 }}>
                <AppText style={{ color: "darkslateblue", fontSize: 15, }}>
                  4907 2024 1707 2778 1962
                </AppText>
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
    
        <View style={styles.resetButton}>
        <CustomButton style={styles.Button}
          onPress={handleSubmit}
          buttonText={"Submit"}
        />
        {/* Button End */}
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
  parentContainer: {
    width: "65%",
    height: 170,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    marginTop: 20,
    marginHorizontal: 75,
    
  },
    parentIncomeContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 7,
  },

  balanceContainer: {
    paddingVertical: 15,
  },
    simCard:{
    position: "relative",
    marginTop: -19,
    marginBottom: -15,
    marginLeft: -200,
    borderRadius: 6,
    width: 40,
    height:30,

  },
  content: {
    flex: 2,
    paddingHorizontal: 30,
    marginTop:80,
    paddingTop: 50,
    
  },
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
