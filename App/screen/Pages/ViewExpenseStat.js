import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  DatePickerIOS,
  FlatList
} from "react-native";
import React, { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import AuthHeader from "../../shared/components/AuthHeader";
import CustomInputSingup from "../../shared/components/ui/CustomInputSignup";
import CustomButton from "../../shared/components/ui/CustomButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "../../shared/components/IncomExpenseComponent/Icon";
import AppText from "../../shared/components/uiApp/AppText";
import UserNav from "../nav/UserNav";
import Screen2 from "../../shared/components/Screen";
import moment from "moment";
import ShowLineChart from "../../shared/StatsView/LineChart";
import AsyncStorage from '@react-native-async-storage/async-storage';


import axios from "axios";
import { importMailer } from 'react-native-mail';
import ViewExpenses from './ViewExpenses';




const ViewExpenseStat = () => {
  return (
    <View>
      <ShowLineChart/>
    </View>
  )
}

export default ViewExpenseStat
