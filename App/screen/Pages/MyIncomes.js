import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Toast,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";


import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import Screen2 from "../../shared/components/Screen";
import UserNav from "../nav/UserNav";
import History from './History';


const MyIncomes = () => {
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    fetch("http://your-api-url/incomes")
      .then((response) => response.json())
      .then((data) => setIncomes(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Screen2>
      <UserNav
        image={require("../../assets/iconPerson.png")}
        title="MY Incomes"
      />
      <LinearGradient
        style={styles.parentContainer}
        colors={["#f9f295", "#E0AA3E", "#F7EF8A", "#B88A44"]}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 1, y: 3 }}
      ></LinearGradient>

      <View>
        <Text>History of my Incomes</Text>
      </View>

      <FlatList
        data={incomes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.date}</Text>
            <Text>{item.label}</Text>
            <Text>{item.amount}</Text>
          </View>
        )}
      />
    </Screen2>
  );
};



const styles = StyleSheet.create({
  parentContainer: {
    flexDirection: "column",
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 5,
    shadowColor: "black",
    shadowOpacity: 0.05,
    shadowOffset: {
      width: 15,
      height: 15,
    },
    elevation: 8,
  },
    itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
});


export default MyIncomes;