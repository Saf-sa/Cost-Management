import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView , onPress } from 'react-native'
import { useState } from 'react';
import { StatusBar } from 'react-native'; 

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
}

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar style="auto" />

    <View style={styles.resultContainer}>
      <Text style={styles.resultText}></Text>
    </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.InputText} 
        value={input} 
        onChangeText={setInput}
        keyboardType='numeric'
        />

       <View style={styles.buttonContainer}>

        {["7", "8", "9", "/","4","5","6","*","1", "2", "3", "-", "0", "C", "=", "+"].map(
          (item,index) => (
         
         <TouchableOpacity style={styles.button}
          key={index}
          onPress={() => onButtonPress(item)}
          >
            <Text style={styles.ButtonText}>{item}</Text>
          
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
  container : {
    flex: 1,
  },

  resultContainer : {
    flex: 2,
    justifyContent: 'center',
    aloignItems: 'flex-end',
   
  },
   

});
