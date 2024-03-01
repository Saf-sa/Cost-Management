import {
  Text,
  View,
  StyleSheet,
  Toast,
  useWindowDimensions,
  TouchableOpacity,
   ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import ShowLineChart from "../../shared/StatsView/LineChartIncome";





  const ViewExpenseStat= () => {

  return (
    <View>
      <ShowLineChart/>

    
    </View>

   

  )
};

export default ViewExpenseStat;
