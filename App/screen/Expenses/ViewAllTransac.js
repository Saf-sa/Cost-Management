import React, { useState, useEffect, useReducer } from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import Screen from "../../shared/components/Screen";
import colors from "../../shared/utils/colors";
import ListTransaction from "../../shared/components/uiApp/ListTransactions";
import Icon from "../../shared/components/IncomExpenseComponent/Icon";
import AppText from "../../shared/components/uiApp/AppText";

import { useNavigation } from "@react-navigation/native";
import moment from "moment";


function ViewAllTransac(props) {
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation();

  function handleBackButtonClick() {
    navigation.push("HomeNav");
    return true;
  }

  return (
    <Screen>
      <View style={{ height: height - 45, marginTop: 25 }}>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.push("HomeNav");
            }}
          >
            <Icon
              size={50}
              name="chevron-left"
              backgroundColor="transparent"
              styles={{ borderWidth: 0 }}
              iconColor={colors.dark}
            />
          </TouchableOpacity>
          <AppText
            style={{
              fontSize: 20,
              marginVertical: 20,
            }}
          >
            All Transactions coucou
          </AppText>
        </View>
       
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ViewAllTransac;
