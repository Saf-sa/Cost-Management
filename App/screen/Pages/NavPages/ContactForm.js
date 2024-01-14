import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import Mailer from 'react-native-mail';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Icon from "../../../shared/components/IncomExpenseComponent/Icon"
import AppText from "../../../shared/components/uiApp/AppText";
import UserNav from "../../nav/UserNav";
import Screen2 from "../../../shared/components/Screen";


import axios from "axios";

const ContactForm = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    // Récupérer l'e-mail depuis le local storage au chargement de l'application
    retrieveEmail();
  }, []);

  const retrieveEmail = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('user_email');
      if (storedEmail !== null) {
        setEmail(storedEmail);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'e-mail depuis le local storage', error);
    }
  };

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

     <Screen2>
        <Text style={styles.title}>Update your Settings</Text> 
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
            <AppText style= {{ flexDirection: 'row' }}>
                     <View>
                <Text style={{ fontSize: 36, color:'blue', lineHeight: 35 }}>€</Text>
                </View>
                 <View>
                <Text style={{ fontSize: 45, color:'dodgerblue', lineHeight:45}}>X</Text>
                </View>
                 <View>
                <Text style={{ fontSize: 22, color:'midnightblue', lineHeight: 21 }}>penses Manager</Text>
                
                </View>
                
                <View>
              
                </View>

            </AppText>
            
            
            <AppText></AppText>
            
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
      <Button title="Submit" onPress={handleSendEmail} />
    </View>
      </Screen2>
  );
};

const styles = StyleSheet.create({

  parentContainer: {
    flexDirection: "column",
    borderRadius: 10,
    marginHorizontal: 50,
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
  balanceContainer: {
  
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    width: "100%",
    
  },

  container: {
    marginTop:150,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
});

export default ContactForm;
