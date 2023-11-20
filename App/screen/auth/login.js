import { View, Text, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import AuthHeader from '../../shared/components/AuthHeader'
import CustomInput from '../../shared/components/ui/CustomInput'
import CustomButton from "../../shared/components/ui/CustomButton";

const login = () => {

  const [email, setEmail] = useState("");
   const [placeholder,setPlaceholder] = useState("");
  const [password, setPassword] = useState("");
  
  return (
    <View style={styles.root}>
      <AuthHeader subtext="Please Login" subtext2="Or" subtext3="Register" />

      {/* Container Start */}

      {/* input area Start */}

      <View style={styles.content}>
        <CustomInput
          label="Email"
          value={email}
          onChangeText={(value) => handleChange(value, "email")}
          placeholder="Your Email"
          secure={false}
        />
        <CustomInput
          label="Password"
          value={password}
          onChangeText={(value) => handleChange(value, "password")}
          placeholder="Your Password"
          secure={true}
        />
        {/* input area  End*/}
        {/* Button Start */}
        <CustomButton style={styles.button} buttonText={"Login"} />

        <Text style={styles.register}>New to Expense Manager?</Text>

        <CustomButton style={styles.button} buttonText={"Sign up Now"} />
        {/* Button End */}
      </View>
    </View>
  );
};

export default login;

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
  }
})

