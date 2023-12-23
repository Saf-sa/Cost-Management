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
      <Text style={styles.resultText}>{result}</Text>
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
    alignItems: 'flex-end',
   
  },
    inputContainer : {
    flex: 3,
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
  width: '25%',
  height: '25%',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 24,
  borderWidth:1,
  borderColor: 'lightGrey',
  borderRadius: 100,
  
},
ButtonText: {
  fontSize: 24,
  color: 'black',
  fontWeight: 'bold',
},

});
