
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Toast,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppButton from "../../../shared/components/uiApp/AppButton";
import useButtonConfig from "../../../shared/components/uiApp/ButtonDownload";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeNavLog } from "../../../screen/nav/UserNavLogin";
import Card from "../../../shared/components/uiApp/Card";

function Download({ route }) {
  const { category = "all" } = route.params;
  const navigation = useNavigation();
  const buttonConfigGlobal = useButtonConfig(navigation, "global");
  const buttonConfigIncome = useButtonConfig(navigation, "income");
  const buttonConfigExpense = useButtonConfig(navigation, "expense");
  const buttonConfigToolkit = useButtonConfig(navigation, "toolkit");

  useEffect(() => {
    // Call the function to get data from useGetIncomes
  }, []);

  const [firstName, setFirstName] = useState("");

  const renderButtons = (buttonConfig) => {
    return buttonConfig.map((button, index) => (
      <AppButton
        key={index}
        AppButtonText={button.AppButtonText}
        icon={button.icon}
        onPress={button.onPress}
        style={index % 5 !== 4 ? styles.buttonWithMargin : null}
      />
    ));
  };

  return (
    <SafeAreaView style={styles.page}>

      <View style={styles.userNav}>
        <HomeNavLog image={require("../../../assets/iconPerson.png")} />
      </View>
      <View style={styles.card}>
        <Card cardText={"Let's save your files"} />
      </View>
      <View>
        <View style={styles.categoryContainer}>
          <Text style={styles.sectionTitle}>Global</Text>
          <View style={styles.buttonContainer}>
            {renderButtons(buttonConfigGlobal)}
          </View>

          <Text style={styles.sectionTitle}>Income</Text>
          <View style={styles.buttonContainer}>
            {renderButtons(buttonConfigIncome)}
          </View>

          <Text style={styles.sectionTitle}>Expense</Text>
          <View style={styles.buttonContainer}>
            {renderButtons(buttonConfigExpense)}
          </View>

          
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: "100%",
    left: -10,
    backgroundColor: "#F8F4D7",
  },
  userNav: {
    top:-110,
    marginLeft: 15,
    marginRight: 5,
  },
  card: {
    flex: 2,
    top: -160,
    height: 170,
    left:5,
  },
  categoryContainer: {
    padding: 18,
    left:5,
  },
  sectionTitle: {
    top:-6,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    color:"brown",
    paddingBottom:1,

  },
  buttonContainer: {
    top:-5,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonWithMargin: {
    marginHorizontal: 5,
  },
});

export default Download;
