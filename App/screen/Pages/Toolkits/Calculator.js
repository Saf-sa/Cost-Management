import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView , onPress } from 'react-native'
import { useState } from 'react';
import { StatusBar } from 'react-native'; 
import AuthHeader from "../../../shared/components/AuthHeader";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

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
    setResult(""); 
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
        return "#E0AA3E";
      case "C":
        return "#B88A44";
      default:
        return "#F7EF8A";
    }
  };

  return (

   
   
    <SafeAreaView style={styles.container}>
      <AuthHeader subtext="Calculator" />
      <StatusBar style="auto" />
       

    <View style={styles.resultContainer}>
      
      <Text style={styles.resultText  }>{result}</Text>
    </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.ButtonText} 
        
        value={input} 
        onChangeText={setInput}
        keyboardType='numeric'
        />


       <View style={styles.buttonContainer}>

        {["7", "8", "9", "/","4","5","6","*","1", "2", "3", "-", "0", "C", "=", "+"].map(
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
           
    
    </SafeAreaView>
  );
};

export default Calculator;

const styles = StyleSheet.create({

  header :{
    flex: 2,
    justifyContent: 'center',

  },

  container : {
    flex: 1,
  },

  resultContainer : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
   
  },
    inputContainer : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    
  
    
  },
  buttonContainer : {
    flex: 7,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  resultText : {
    color: 'green',
    fontSize: 50,
    justifyContent: 'center',
    marginRight: 30,
    
   
  },

  InputText:{
  fontSize: 30,
  marginBottom: 20,
 
  
  

},
button: {
  width: '22%',
  height: '22%',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 6,
  fontSize: 24,
  borderWidth:0.2,
  borderColor: 'lightGrey',
  borderRadius: 20
  ,
  
},
ButtonText: {
  fontSize: 30,
  fontWeight: 'bold',
},

});
