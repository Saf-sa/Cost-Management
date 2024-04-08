import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getIncomes } from './GetIncomes';

const ViewIncomesNew = ({route}) => {
  const [storedIncomes, setStoredIncomes] = useState([]);
  const navigation = useNavigation();
  const {category} = route.params;

  useEffect(() => {
    getIncomes(category, setStoredIncomes);
  }, []);

  const calculateTotalIncomes = storedIncomes.reduce((total, income) => total + Number(income.amount), 0);


};

let index = 1;// index for scrollview

  return (// Display data from AsyncStorage
     <ScrollView style={styles.page}
     keyboardDismissMode="on-drag"// to dismiss the keyboard when the user drags the scroll view
      onscroll={(evt) =>  (index++)}// to get the index of the scrollview
      onScrollBeginDrag={(evt) => (index++)}// to get the index of the scrollview
      >
       <View >  
<Screen2 >
           {/* Button Start */}
      
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
      
    {storedIncomes.map((income, index) => (// Display data from AsyncStorage in a FlatList
      /* console.log('storedIncomes ', storedIncomes), */
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
