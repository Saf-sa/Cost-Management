import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Image} from 'react-native'
import { useState } from 'react';
import { StatusBar } from 'react-native'; 
import { LinearGradient } from "expo-linear-gradient";
import Card from '../../../shared/components/uiApp/Card';
import AppText from "../../../shared/components/uiApp/AppText";

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

      <View style={styles.root}>
             <Card
      result= {result}
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
           
    </SafeAreaView>
  );
};

export default Calculator;

const styles = StyleSheet.create({
   parentContainer: {
      ...Platform.select({
      ios: {
    width: "75%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    borderWidth:0.2,
    borderColor: 'brown',
    marginTop: 30,
    marginHorizontal: 55,
    marginVertical: 0,
    shadowOffset: {
      width: 0.8,
      height: 2,},
  },
     android: {
    width: "80%",
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    borderWidth:0.2,
    borderColor: 'brown',
    top: 10,
    marginBottom: 100,
    marginHorizontal: 35,
    marginVertical: 0,
    shadowOffset: {
      width: 0.8,
      height: 2,},
      },
    }),
  },
  
   balanceContainer: {
...Platform.select({
      ios: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 17,
    width: "80%",
      },

  android: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 0,
    width: "80%",
  
     },
    }),
  },
  
 simCard:{
    ...Platform.select({
      ios: {
    position: "relative",
    marginTop: -25,
    marginBottom:-20,
    borderRadius: 6,
    marginLeft: -100,
    width: 40,
    height:30,

  }, 
    android: {
    position: "relative",
    marginTop: -30,
    marginBottom:-10,
    borderRadius: 6,
    marginLeft: -90,
    width: 35,
    height:25,
    },
    }),
  },
  container : {
    flex: 1,
     backgroundColor: "#F8F4D7",
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
android: {
  width: '21%',
  height: '20%',
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
