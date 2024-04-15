import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../shared/components/ui/CustomButton";
import HomeNav from "../nav/UserNav";
import Screen2 from "../../shared/components/Screen";
import { useGetIncomes } from '../../shared/components/IncomExpenseComponent/GetIncome';

const ViewIncomes = ({route}) => {
  const { category= 'all' } = route.params;
  const incomes = useGetIncomes(category);
  const navigation = useNavigation();

  useEffect(() => {
    // Call the function to get data from useGetIncomes
  }, []);

  const calculateTotalIncomes = incomes.reduce((total, income) => total + Number(income.amount), 0);

  let index = 1;

  return (
     <ScrollView style={styles.page}
     keyboardDismissMode="on-drag"
      onscroll={(evt) =>  (index++)}
      onScrollBeginDrag={(evt) => (index++)}
      >
       <View >  
<Screen2 >
        <HomeNav 
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
      
    {incomes.map((income, index) => (
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
    width: "100%",
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

export default ViewIncomes;
