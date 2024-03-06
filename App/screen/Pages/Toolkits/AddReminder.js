import React, {useState} from "react";
import {Text, View, StyleSheet} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DatePicker from "@dietime/react-native-date-picker";
import CustomInputSingup from "../../../shared/components/ui/CustomInputSignup";
import CustomButton from "../../../shared/components/ui/CustomButton";

export default function AddReminder() {
    const [date, setDate] = useState();
    const [expireDate, setExpireDate] = useState(false);
    const [selectedEmail, setSelectedEmail] = useState("");
    const [contractName, setContractName] = useState('');
    const [selectedLabel, setSelectedLabel] = useState('');
    const navigation = useNavigation();



    return (
        
         <View style={styles.container}>
            <Text style={styles.titleStart}> Contract Start Date</Text>


      <View style={styles.date}>
                
                {
                    [
                        {title: "Day", value: date ? date.getDate() : "?"},
                        {title: "Month", value: date ? date.getMonth() + 1 : "?"},
                        {title: "Year", value: date ? date.getFullYear() : "?"},
                    ]
                    .map((el, index) => {
                        return (
                            <View style={styles.datePart} key={index}>

                                <Text style={styles.title}>{el.title}</Text>
                                <Text style={styles.digit}>{el.value}</Text>

                                 </View>
                                 
   
                        )
                    })
                }
                
            </View>
            
                   <DatePicker
                value={date}
                width={"80%"}
                fontSize={19}
                height={160}
                onChange={(date) => setDate(date)}
                format={"yyyy-mm-dd"}
            />
     <Text style={styles.titleExpire}> Contract expire Date</Text>

      <View style={styles.expireDate}>
                
                {
                    [
                        {title: "Day", value: expireDate ? expireDate.getDate() : "?"},
                        {title: "Month", value: expireDate ? expireDate.getMonth() + 1 : "?"},
                        {title: "Year", value: expireDate ? expireDate.getFullYear() : "?"},
                    ]
                    .map((el, index) => {
                        return (
                            <View style={styles.datePart} key={index}>

                                <Text style={styles.title}>{el.title}</Text>
                                <Text style={styles.digit}>{el.value}</Text>

                                 </View>
   
                        )
                    })
                }
            </View>
         
         
          <DatePicker
                value={expireDate}
                width={"80%"}
                fontSize={19}
                height={150}
                onChange={(expireDate) => setExpireDate(expireDate)}
                format={"yyyy-mm-dd"}
            />
                 
              
<View style={styles.contract}>
      <CustomInputSingup
        onChangeText={setContractName}
        value={contractName}
        placeholder="Enter the Name of your Contract"

        style={styles.input}
      />
  

             <CustomInputSingup
        onChangeText={setSelectedLabel}
        value={selectedLabel}
        placeholder="Enter a description of your Contract"

        style={styles.input}
      />
             <CustomInputSingup
        onChangeText={setSelectedEmail}
        value={selectedEmail}
        placeholder="Enter email of your Contract"

        style={styles.input}
      />
</View>
       
   <View style={styles.content}>
        <CustomButton
          style={styles.button}
          buttonText={"Add a Reminder "
          
          }
          onPress={() => navigation.navigate("Reminder")}
        />
         
</View>
 
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: 0,
        alignItems: "center",
       backgroundColor: "#F8F4D7",
        
    },

    date: {
        flex: 10,
        marginTop: 0,
        flexDirection: "row",
        justifyContent: "space-around",
        width: "80%",
        marginBottom: -10,
    },
  
    expireDate: {
        flex: 8,
         marginTop: 0,
        flexDirection: "row",
        justifyContent: "space-around",
        width: "60%",
    },

    datePart: {
        width: 100,
        alignItems: "center",
    },
    content: {
        flex: 20,
        marginTop: 70,
        alignItems: "center",
        justifyContent: "center",
    },


titleStart: {
     marginTop: 10,
        fontSize: 25,
        fontWeight: "100",
        marginBottom: 10,
    },
    titleExpire: {
        marginTop: 10,
        fontSize: 25,
        fontWeight: "100",
        marginBottom: 20,
        
    },
    digit: {
        fontSize: 24,
    },
    contract: {
        flex: 1,
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 30,
       
    },

  
});