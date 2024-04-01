import {
  Text,
  View,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ShowPieChartExpense from "../../shared/StatsView/PieChartExpense";
import ShowPieChartIncome from "../../shared/StatsView/PieChartIncome";


   
  const ViewGlobalStat= () => {
 const navigation = useNavigation();
  return (
    <View style={styles.container} >
    <View >
      <Text style={styles.TitleExpense}>Expenses</Text>
      <ShowPieChartExpense/>

      <View >
      <Text style={styles.TitleIncome}>Icomes</Text>
      <ShowPieChartIncome/>
   
    
    </View>
    
    </View>
   
     
   
   
     <View >
    </View>
</View>

   

  )
};

const styles = StyleSheet.create({
    container: {
   flex: 1,
    backgroundColor: "#F8F4D7",
  },
    dashboard: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 19,
    marginLeft: 9,
    marginTop: -30,

    alignItems: "center",
  },
TitleExpense: {
    color: "#E0AA3E",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 50,
  
  },

  TitleIncome: {
    color: "#3ABD0D",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 300,
    marginBottom: 20,
  },
    



});

export default ViewGlobalStat;
