import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import AppButton from '../../shared/components/uiApp/AppButton';
import SendButton from '../../shared/components/uiApp/AppSendButton';
import Card from '../../shared/components/uiApp/Card';
import AppText from '../../shared/components/uiApp/AppText';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";


const Forecast = () => {
    const GlobalCategories = [
    {AppButtonText:'Income', name: 'Income', icon: 'dollar-sign' },
    {AppButtonText:'Expense', name: 'Expense', icon: 'shopping-cart' },
    {AppButtonText:'Forecast', name: 'Forecast', icon: 'file-invoice-dollar' },
    {AppButtonText:'Statistics', name: 'Statistics', icon: 'chart-line' },
    {AppButtonText:'History', name: 'History', icon: 'history' },
  ];
  const ExpenseCategories = [
    {AppButtonText: 'Clothe', name: 'clothe', icon: 'tshirt' },
    {AppButtonText: 'Food', name: 'food', icon: 'utensils' },
    {AppButtonText: 'Transport', name: 'Transport', icon: 'subway' },
    {AppButtonText: 'Studie', name: 'studie', icon: 'university' },
    {AppButtonText: 'Holiday', name: 'holiday', icon: 'plane-departure' },
    {AppButtonText: 'Tax', name: 'tax', icon: 'cash-register' },
    {AppButtonText: 'Hobbie', name: 'hobbie', icon: 'laugh-wink' },
    {AppButtonText: 'Money', name: 'money', icon: 'hand-holding-usd' },
    {AppButtonText: 'Epargne', name: 'epargne', icon: 'search-dollar' },
    {AppButtonText: 'Other', name: 'other', icon: 'newspaper' },
  ];

  const IncomeCategories = [
    {AppButtonText: 'Salary', name: 'salary', icon: 'dollar-sign' },
    {AppButtonText: 'Bonus', name: 'bonus', icon: 'trophy' },
    {AppButtonText: 'Loan', name: 'loan', icon: 'search-dollar' },
    {AppButtonText: 'Sales', name: 'sales', icon: 'store' },
    {AppButtonText: 'Gift', name: 'gift', icon: 'gift' },
    {AppButtonText: 'Rent', name: 'rent', icon: 'home' },
    {AppButtonText: 'Allowance', name: 'allowance', icon: 'laugh-wink' },
    {AppButtonText: 'Refund', name: 'refund', icon: 'hand-holding-usd' }, 
    {AppButtonText: 'Stocks', name: 'stocks', icon: 'search-dollar' },
    {AppButtonText: 'Other', name: 'other', icon: 'newspaper' },
  ];
  const Toolkits = [
    {AppButtonText: 'Agenda', name: 'agenda', icon: 'calendar-alt' },
    {AppButtonText: 'Reminder', name: 'reminder', icon: 'bell' },
    {AppButtonText: 'Calculator', name: 'calculator', icon: 'calculator' },
    {AppButtonText: 'Download', name: 'download', icon: 'download' },
    {AppButtonText: 'Settings', name: 'Settings', icon: 'user-cog' },
   
  ];
  return (
    <View style>
       <AppButton
        AppButtonText="Income"
        icon="dollar-sign"
        onPress={() => console.log('income')}
       /> 
  <SendButton /> 
   <View>
      <Card
      cardText={"tesjhsdajshdkjahdsdhg"}
      />
    </View>
    </View>

   
  )
}

export default Forecast

