import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import AppButton from '../../shared/components/uiApp/AppButton'
import SendButton from '../../shared/components/uiApp/AppSendButton' 
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";;


const Forecast = () => {
    const GlobalCategories = [
    { name: 'Income', icon: 'dollar-sign' },
    { name: 'Expense', icon: 'shopping-cart' },
    { name: 'Forecast', icon: 'file-invoice-dollar' },
    { name: 'Statistics', icon: 'chart-line' },
    { name: 'History', icon: 'history' },
  ];
  const ExpenseCategories = [
    { name: 'clothe', icon: 'tshirt' },
    { name: 'food', icon: 'utensils' },
    { name: 'Transport', icon: 'subway' },
    { name: 'studie', icon: 'university' },
    { name: 'holiday', icon: 'plane-departure' },
    { name: 'tax', icon: 'cash-register' },
    { name: 'hobbie', icon: 'laugh-wink' },
    { name: 'money', icon: 'hand-holding-usd' },
    { name: 'epargne', icon: 'search-dollar' },
    { name: 'other', icon: 'newspaper' },
  ];

  const IncomeCategories = [
    { name: 'salary', icon: 'dollar-sign' },
    { name: 'bonus', icon: 'trophy' },
    { name: 'loan', icon: 'search-dollar' },
    { name: 'sales', icon: 'store' },
    { name: 'gift', icon: 'gift' },
    { name: 'rent', icon: 'home' },
    { name: 'allowance', icon: 'laugh-wink' },
    { name: 'refund', icon: 'hand-holding-usd' }, 
    { name: 'stocks', icon: 'search-dollar' },
    { name: 'other', icon: 'newspaper' },
  ];
  const Toolkits = [
    { name: 'agenda', icon: 'calendar-alt' },
    { name: 'reminder', icon: 'bell' },
    { name: 'calculator', icon: 'calculator' },
    { name: 'download', icon: 'download' },
    { name: 'Settings', icon: 'user-cog' },
   
  ];
  return (
    <View style>
       <AppButton
        AppButtonText="Income"
        icon="dollar-sign"
        onPress={() => console.log('income')}
       /> 
  <SendButton /> 
    </View>
  )
}

export default Forecast

