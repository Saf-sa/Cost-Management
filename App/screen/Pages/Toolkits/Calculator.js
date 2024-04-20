import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Image} from 'react-native'
import { useState } from 'react';
import { StatusBar } from 'react-native'; 
import { LinearGradient } from "expo-linear-gradient";
import Card from '../../../shared/components/uiApp/Card';
import AppText from "../../../shared/components/uiApp/AppText";
import ResetLogin from '../../auth/reset';
import Screen2 from "../../../shared/components/Screen";
import {HomeNavLog} from "../../../screen/nav/UserNavLogin";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("0");


const onButtonPress =(value) => { 
  if (value === "=") {
    try{
      setResult(eval(input))
    }
    catch (error){
      setResult("error")
    }
  }
  else if (value === "C") {
    setInput("");
    setResult("0"); 
  }
    else if (value === "<x") {
    setInput(input.slice(0, -1));
  }
else {
  setInput(input + value);
}
};
  const getButtonTextColor = (value) => {
    switch (value) {
      case "/":
      case "*":
      return "blue";
      
      case "+":
      case "=":
        return "green";
      case "C":
        case "-":
        case "<x":
        return "red";
      default:
        return "black";
    }
  };
    const getButtonBackgroundColor = (value) => {
    switch (value) {
      case "/":
      case "*":
      case "-":
      case "+":
      case "=":
        case "C":
        return "#E0AA3E";

      default:
        return "#E0CE3E";
    }
  };
  

  return (

   
   
    <SafeAreaView style={styles.container}>
           <HomeNavLog style={styles.userNav}
          image={require("../../../assets/iconPerson.png")}
        />
    
 <View style={styles.page}>
      
      <View style={styles.root}>
             <Card  
      cardText={ " = "}      
      result = {result }
      
      />
  
        </View>
      <StatusBar style="auto" />
       

    <View style={styles.resultContainer}>
      
    </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.ButtonText} 
        
        value={input} 
        onChangeText={setInput}
        keyboardType='numeric'
        
        />


       <View style={styles.buttonContainer}>

        {["C", "+/-", "%", "/","7", "8", "9", "*","4","5","6","-","1", "2", "3", "+", ".", "0", "<x", "="].map(
          (item,index) => (
 
         <TouchableOpacity style={[styles.button, { backgroundColor: getButtonBackgroundColor(item) }]}
          key={index}
          onPress={() => onButtonPress(item)}
          >
            <Text style={[styles.ButtonText, { color: getButtonTextColor(item) }]}>{item}</Text>
          
          </TouchableOpacity>
        
        ) 
        )}
        
        </View>
         </View>
           </View>
    </SafeAreaView>
  );
};

export default Calculator;

const styles = StyleSheet.create({
   page: {
    width: "100%",
    flex: 1,
    backgroundColor: "#F8F4D7",
    top:-30,
  },
  root:{
    fontSize:30,
    /* backgroundColor: "#F8F4D7", */
  },
  container : {
    flex: 1,
    backgroundColor: "#F8F4D7",
   
     marginTop:-50,
     marginLeft:5,
     marginRight:5,
   
  },
      header: { 
      ...Platform.select({
      ios: {
    justifyContent: "center",
  },
 android: {
    justifyContent: "center",

        },
    }),
  },
userNav:{
 
},

resultContainer : {
    flex: 1,
    marginBottom: 50,
    alignItems: 'center',
   
  },
inputContainer : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 170,
    marginTop: -100,
    
  },

  CardNumber: {
     ...Platform.select({
      ios: {
    fontSize: 15,
    marginTop: 140,
    marginRight: -10,
    left: -50,
    color: "darkslateblue",
  },
   android: {
    fontSize: 15,
     marginTop: 140,
    marginRight: -10,
    left: -50,
    color: "darkslateblue",
   },
  }),
  },  


  buttonContainer : {
     ...Platform.select({
      ios: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  android: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  }),
  },  

resultText : {
    color: 'green',
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 20,

  },

InputText:{
    fontSize: 30,
    marginBottom: 10,
 
},


button: {
     ...Platform.select({
      ios: {

  width: '20%',
  height: '34%',
  alignItems: 'center',
  justifyContent: 'center',
  left:15,
  margin: 6,
  padding:5,
  fontSize: 24,
  borderWidth:0.2,
  borderColor: 'lightGrey',
  borderRadius: 10,
},
android: {
  width: '25%',
  height: '25%',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 7,
  marginTop: 9,
  fontSize: 24,
  borderWidth:0.2,
  borderColor: 'lightGrey',
  borderRadius: 10,
 },
  }),
  },


ButtonText: {
  fontSize: 30,
  fontWeight: 'bold',
},

});
