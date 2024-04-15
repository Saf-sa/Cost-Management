import React, { useState, useEffect } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Mailer from 'react-native-mail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from "expo-linear-gradient";
import AppText from "../../../shared/components/uiApp/AppText";
import UserNav from "../../nav/UserNav";
import Screen2 from "../../../shared/components/Screen";
import CustomButton from "../../../shared/components/ui/CustomButton";


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
        <Text style={styles.title}>Send us a Email</Text> 
        <UserNav 
          image={require("../../../assets/iconPerson.png")}
   
        />
          <LinearGradient
          style={styles.parentContainer}
          colors={["#f9f295", "#E0AA3E", "#F7EF8A", "#B88A44"]}
          start={{ x: 0.1, y: 0.1 }}
          end={{ x: 1, y: 3 }}
        >
          <View style={styles.balanceContainer}>
            
            <AppText style= {{ flexDirection: 'row', paddingTop:20 }}>
                     <View>
                <Text style={{ fontSize: 36, color:'blue', lineHeight: 35 }}>€</Text>
                </View>
                 <View>
                <Text style={{ fontSize: 45, color:'dodgerblue', lineHeight:45}}>X</Text>
                </View>
                 <View>
                <Text style={{ fontSize: 22, color:'midnightblue', lineHeight: 21 }}>penses Manager</Text>
              
                </View>

            </AppText>
           <Image style={styles.simCard} source={require('../../../assets/sim-card.png')} />

            <AppText style={{ color: "darkslateblue", fontSize: 15, paddingTop:40, marginLeft:-90, }}>
                  4907 2024 1707 2778 1962
                </AppText>

          </View>
        </LinearGradient>
       
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
      <CustomButton
        onPress={handleSendEmail} 
        style={styles.button}
        buttonText={"Send Email"}
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

  parentContainer: {
    flexDirection: "column",
    borderRadius: 10,
    marginHorizontal: 50,
    marginVertical: 0,
  },

  balanceContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
    simCard:{
    position: "relative",
    marginTop: -20,
    marginBottom: 0,
    borderRadius: 6,
    marginRight: 220,
    width: 40,
    height:30,

  },

  container: {
    marginTop:60,
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
