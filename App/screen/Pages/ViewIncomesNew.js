import {
  View,
  Text,
  StyleSheet, 
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../shared/components/ui/CustomButton";
import UserNav from "../nav/UserNav";
import Screen2 from "../../shared/components/Screen";

import { getIncomes } from '../../shared/components/IncomExpenseComponent/GetIncome';

const ViewIncomesNew = ({route}) => {
  const [storedIncomes, setStoredIncomes] = useState([]);
  const navigation = useNavigation();
  const {category} = route.params;

  useEffect(() => {
    getIncomes(category, setStoredIncomes);
  }, [category]);

  const calculateTotalIncomes = storedIncomes.reduce((total, income) => total + Number(income.amount), 0);

  return (
     <ScrollView style={styles.page}
     keyboardDismissMode="on-drag"
      onScroll={(evt) =>  {/* handle scroll event */}}
      onScrollBeginDrag={(evt) => {/* handle scroll begin drag event */}}
      >
       <View >  
<Screen2 >
        <UserNav 
          image={require("../../assets/iconPerson.png")}
    /> 
     <View style={styles.viewIncomesButton}>
        <CustomButton
          onPress={() => navigation.navigate("MyIncomes")}
          style={styles.button}
          buttonText={"Add Income"}
      />
        </View>
       
        <Text style={styles.textAmount}>Total Incomes = + {calculateTotalIncomes} € </Text>
      
    {storedIncomes.map((income, index) => (
      <View key={index} style={styles.incomeContainer}>
        <View style={styles.row}>
          <Text>Date : {income.date && !isNaN(Date.parse(income.date)) ? new Date(income.date).toISOString().split('T')[0] : 'Invalid date'}</Text>
          <Text>Categories : {income.categories.join(', ')}</Text>
        </View>
        <View style={styles.row}>
          <Text>Label : {income.label}</Text>
          <Text style={{ color: "green"}}>Amount = + {income.amount}</Text>
        </View>
      </View>
    ))}
    </Screen2>
     </View>
  </ScrollView>
  );
};
const styles = StyleSheet.create({
    page: {
    flex: 1,
backgroundColor: "#F8F4D7",
  },
  incomeContainer: {
    marginTop: 20,
    width: "96%",
    borderWidth: 1,
    borderColor: "#E0AA3E",
    borderRadius: 10,
    padding: 12,

    
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },

    textButton:{
      color: "#E0AA3E",
      fontWeight: "bold",
      fontSize: 15,
      textAlign: "center",
    },
      textAmount:{
      color: "green",
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center",
      top: -70,
    },
      viewIncomesButton: {
    position: "absolute",
    alignSelf: "center",
    alignItems  : "center",
    marginTop: 110,
  },
});

export default ViewIncomesNew;
