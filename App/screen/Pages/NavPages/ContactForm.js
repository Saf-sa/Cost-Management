import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import Mailer from 'react-native-mail';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  );
};

const styles = StyleSheet.create({
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
