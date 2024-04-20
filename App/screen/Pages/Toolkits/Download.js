import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Toast,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppButton from "../../../shared/components/uiApp/AppButton";
import useButtonConfig from "../../../shared/components/uiApp/ButtonCategories";
import Card from "../../../shared/components/uiApp/Card";
import Screen2 from "../../../shared/components/Screen";
import { HomeNavLog } from "../../../screen/nav/UserNavLogin";

function Download({ route }) {
  const { category = "all" } = route.params;
  const navigation = useNavigation();
  const buttonConfigGlobal = useButtonConfig(navigation, "global");
  const buttonConfigIncome = useButtonConfig(navigation, "income");
  const buttonConfigExpense = useButtonConfig(navigation, "expense");
  const buttonConfigToolkit = useButtonConfig(navigation, "toolkit");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@storage_Key");
        if (jsonValue != null) {
          const user = JSON.parse(jsonValue);
          setFirstName(user.firstName); // Update this line to use setFirstName
        }
      } catch (e) {
        console.error("Failed to fetch user data from storage");
      }
    };

    fetchUserData();
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
    <Screen2 style={styles.page}>
      <View style={styles.userNav}>
        <HomeNavLog image={require("../../../assets/iconPerson.png")} />
      </View>
      <View style={styles.card}>
        <Card cardText={"Let's save your files"} />
      </View>
      <ScrollView>
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

          <Text style={styles.sectionTitle}>Toolkit</Text>
          <View style={styles.buttonContainer}>
            {renderButtons(buttonConfigToolkit)}
          </View>
        </View>
      </ScrollView>
    </Screen2>
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
    marginLeft: 15,
    marginRight: 5,
  },
  card: {
    flex: 2,
    top: -90,
    height: 180,
  },
  categoryContainer: {
    padding: 30,
  },
  sectionTitle: {
    top:55,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    color:"brown",
    paddingBottom:1,

  },
  buttonContainer: {
    top:55,
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
