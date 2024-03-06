import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView} from 'react-native'
import { useState } from 'react';
import { StatusBar } from 'react-native'; 
import { LinearGradient } from "expo-linear-gradient";
import AppText from "../../../shared/components/uiApp/AppText";


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
        case "C":
        return "#E0AA3E";

      default:
        return "#E0CE3E";
    }
  };

  return (

   
   
    <SafeAreaView style={styles.container}>
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
                
            </AppText>
            
          </View>

        </LinearGradient>
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

        {["C", "+/-", "%", "/","7", "8", "9", "*","4","5","6","-","1", "2", "3", "+", ".", "0", "<", "="].map(
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
    balanceContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 250,
   marginTop : -60,

  },

    parentContainer: {
    flexDirection: "column",
    borderRadius: 10,
    marginHorizontal: 50,
    marginVertical: 40,
    marginBottom: -50,
  },

  container : {
    flex: 1,
     backgroundColor: "#F8F4D7",
  },

resultContainer : {
    flex: 1,
   
    alignItems: 'center',
   
  },
inputContainer : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 170,
    marginTop: -100,
    
  },

buttonContainer : {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
resultText : {
    color: 'green',
    fontSize: 40,

    
  },

InputText:{
    fontSize: 30,
    marginBottom: 10,
 
},

button: {
  width: '22%',
  height: '28%',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 6,
  fontSize: 24,
  borderWidth:0.2,
  borderColor: 'lightGrey',
  borderRadius: 10,
},

ButtonText: {
  fontSize: 30,
  fontWeight: 'bold',
},

});
