import React, {useState} from "react";
import {Text, View, StyleSheet, Button, ScrollView,} from "react-native";
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
                   <DatePicker
                value={date}
                width={"80%"}
                fontSize={19}
                height={150}
                onChange={(date) => setDate(date)}
                format={"yyyy-mm-dd"}
            />
            
            <Text style={styles.title}> Contract Start Date</Text>
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
                value={expireDate}
                width={"80%"}
                fontSize={19}
                height={150}
                onChange={(expireDate) => setExpireDate(expireDate)}
                format={"yyyy-mm-dd"}
            />
                 <Text style={styles.title}> Contract expire Date</Text>
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

      
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "space-around",
    },
   date: {
    flex: 2,
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-around",
        width: "60%",
    },
   
});