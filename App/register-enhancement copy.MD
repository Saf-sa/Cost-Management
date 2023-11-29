To Do for a better code for signup.js

1- Gestion des erreurs d'API : Actuellement, vous imprimez simplement l'erreur dans la console si la requête API échoue. Il serait préférable d'informer l'utilisateur en cas d'échec de la requête API. Vous pouvez ajouter un état pour stocker l'erreur d'API et l'afficher à l'utilisateur si nécessaire.

2- Duplication du composant CustomInputSignup pour le mot de passe : Vous avez deux fois le composant CustomInputSignup pour le mot de passe de confirmation. Vous devriez supprimer l'un d'eux.

3- Séparation des préoccupations : Vos fonctions de validation (isValidEmail, isValidPassword, isValidFirstName, isValidLastName) pourraient être déplacées dans un fichier séparé (par exemple, validation.js). Cela rendrait votre composant Signup plus propre et plus facile à lire.

4- Utilisation de constantes pour les messages d'erreur : Au lieu d'écrire directement les messages d'erreur dans votre code, vous pouvez les définir comme constantes dans un fichier séparé. Cela rendra votre code plus propre et plus facile à gérer, surtout si vous prévoyez de supporter plusieurs langues à l'avenir.

5- Masquer l'URL de l'API : Il est préférable de ne pas exposer directement l'URL de l'API dans votre code. Vous pouvez utiliser un fichier de configuration ou des variables d'environnement pour stocker l'URL de l'API.

6- Utilisation de trim lors de la validation : Lorsque vous validez les champs du formulaire, il serait préférable d'utiliser trim pour supprimer les espaces inutiles avant et après les valeurs. Cela peut éviter des erreurs de validation inattendues dues à des espaces supplémentaires.


save signup :


import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AuthHeader from "../../shared/components/AuthHeader";
import CustomInputSingup from "../../shared/components/ui/CustomInputSignup";
import CustomButton from "../../shared/components/ui/CustomButton";
import axios from "axios";


// import the API_URL from the @env file
import { API_URL } from "@env";

// declare a variable to store the response from the server
const response = await axios.post(API_URL + "/signup", formData);

// check if the email is valid using a regular expression
const isValidEmail = (email) => {
  const re = /\S+@\S+\.\S+/; // Should contain @
  return re.test(email);
};

// check if the password is valid using a regular expression
const isValidPassword = (password) => {
  const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  // Should contain at least one number, one special character and minimum 8 characters
  return re.test(password);
};

// check if the first name is valid using a regular expression
const isValidFirstName = (FirstName) => {
  const re = /^[a-zA-Z]{3,}$/; // all letter and min 3
  return re.test(FirstName);
};

// check if the last name is valid using a regular expression
const isValidlastName = (lastName) => {
  const re = /^[a-zA-Z]{3,}$/; // all letter and min 3
  return re.test(lastName);
};
// check if the form is valid with all fields filled in correctly
const formIsValid = (DataObj) => {
  return (
    Object.values(DataObj).every((value) => value.trim().length > 0) && // check all value is not empty
    isValidEmail(DataObj.email) &&
    isValidPassword(DataObj.password) &&
    isValidFirstName(DataObj.FirstName) &&
    isValidlastName(DataObj.lastName) &&
    DataObj.password === DataObj.confirmPassword
  );
};

// define a functional component to display the signup form
const Signup = () => {

  // use the useNavigation hook to get access to the navigation object
  const navigation = useNavigation();
}
  // define state variables for the form errors, form data and show password
  const [formErrors, setFormErrors] = useState({
    FirstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null,
  });

  // define state variables for the form data and show password
  const [formData, setFormData] = useState({
    FirstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // define state variable for the show password
  const [showPassword, setShowPassword] = useState(false);

  // define a function to handle the form data
  const handleChange = (value, type) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [type]: value,
    }));
  };


  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  // define a function to handle the form submission
  const handleSubmit = async () => {

    // check if the form is valid
// define a function to handle the form submission
// define a function to handle the form submission
const handleSubmit = async () => {
  if (formIsValid(formData)) {
    try {
      const response = await axios.post("http://your-api-url/signup", formData);
      if (isMounted) {
        console.log(response.data);
        navigation.navigate("Login");
      }
    } catch (error) {
      if (isMounted) {
        console.error(error);
      }
    }
  } else {
    // set the form errors if the form is invalid
    if (isMounted) {
      setFormErrors({
        FirstName: !isValidFirstName(formData.FirstName)
          ? "Invalid first name"
          : null,
        lastName: !isValidlastName(formData.lastName)
          ? "Invalid last name"
          : null,
        email: !isValidEmail(formData.email) ? "Invalid email" : null,
        password: !isValidPassword(formData.password)
          ? "Invalid password"
          : null,
        confirmPassword:
          formData.password !== formData.confirmPassword
            ? "Passwords do not match"
            : null,
      });
      console.warn("Invalid Form");
    }
  }
};
  // return the JSX code to display the form
  return (
    <View style={styles.root}>
      <AuthHeader subtext="Please Register" />
      <View style={styles.content}>
        <CustomInputSingup
          label="First Name"
          value={formData.FirstName}
          onChangeText={(value) => handleChange(value, "FirstName")}
          placeholder="Your First Name (min 3 letters) "
          secure={false}
          errorMessage={formErrors.FirstName}
        />
      
        <CustomInputSingup
          label="Confirm Password"
          value={formData.confirmPassword}
          onChangeText={(value) => handleChange(value, "confirmPassword")}
          placeholder="Comfirm your password"
          secure={!showPassword}
          errorMessage={formErrors.confirmPassword}
          onIconPress={() => setShowPassword(!showPassword)}
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
          onIconPress={() => setShowPassword(!showPassword)}
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
    </View>
  );
};

// export the component so it can be imported into other files
export default Signup;

// define your styles

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
    marginTop: 30,
    marginBottom: 10,
    color: "#0283a8",
    fontSize: 15,
    fontWeight: "bold",
  },
}); // remove the extra closing bracket here