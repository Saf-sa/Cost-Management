import React, { useState, useEffect } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Mailer from 'react-native-mail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from "expo-linear-gradient";
import AppText from "../../../shared/components/uiApp/AppText";
import {HomeNavLog} from "../../nav/UserNavLogin";
import Screen2 from "../../../shared/components/Screen";
import Card from "../../../shared/components/uiApp/Card"
import AppButton from "../../../shared/components/uiApp/AppSendButton"

import axios from "axios";

const ContactForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
 const navigation = useNavigation();

      useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@storage_Key');
        if (jsonValue != null) {
          const user = JSON.parse(jsonValue);
          setFirstName(user.firstName); // Update this line to use setFirstName
          setLastName(user.lastName); // Update this line to use setFirstName
          setEmail(user.email); // Update this line to use setFirstName
        }
      } catch (e) {
        console.error("Failed to fetch user data from storage");
      }
    };

    fetchUserData();
  }, []);


  const handleSendEmail = () => {
    Mailer.mail(
      {
        subject,
        recipients: ['contact@example.com'], // change with recipients  e-mail adress
        ccRecipients: [email],
        body,
        isHTML: true,
      },
      (error, event) => {
        if (error) {
          Alert.alert('Error', 'Unable to send e-mail. Please try again later.');
        }
      }
    );
  };

  return (
 
   <View style={styles.page}>
     <Screen2 >
     <View style={styles.nav}>
        <HomeNavLog 
          image={require("../../../assets/iconPerson.png")}
   
        />
         </View>

           <View style={styles.card}>
        <Card 
        cardText={"Send us a Email"}
        />
         </View> 
       
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Subject"
        value={subject}
        onChangeText={(text) => setSubject(text)}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Your message"
        multiline
        value={body}
        onChangeText={(text) => setBody(text)}
      />
     
    </View>
    {<View style={styles.contactButton}>
 
      <AppButton
      onPress={handleSendEmail} 
      sendButtonText={"Send Email"}

      />
</View>} 
      </Screen2>
      </View>
  );
};

const styles = StyleSheet.create({
   page: {
    flex: 1,
    backgroundColor: "#F8F4D7",
    
  },
nav:{
  top:20,
},

card:{
  top:-20,
 
margin:-15,
  
},


  container: {
    marginTop:40,
    padding: 10,
    
  },
  input: {
    height: 40,
    borderColor: "#E0AA3E",
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 30,
    padding: 10,
  },
   title:{
    top: 80,
    textAlign: "center",
    color: "#E0AA3E",
    fontSize: 20,
    fontWeight: "bold",
  },
  contactButton:{
    position: "absolute",
    alignSelf: "center",
    marginTop: 730,
  },
  
});

export default ContactForm;
