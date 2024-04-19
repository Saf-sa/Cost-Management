import { useMemo } from 'react';

export default function useButtonConfig(navigation, buttonType) {
  const globalButtons = [
  { 
    AppButtonText: "Income", 
    icon: "dollar-sign", 
    onPress: () => navigation.push("ViewIncomes") 
  },
  { 
    AppButtonText: "Expense", 
    icon: "shopping-cart", 
    onPress: () => navigation.push("ViewExpenses") 
  },
  { 
    AppButtonText: "Forecast", 
    icon: "file-invoice-dollar", 
    onPress: () => navigation.push("Forecast") 
  },
  { 
    AppButtonText: "Statistics", 
    icon: "chart-line", 
    onPress: () => navigation.push("ViewGlobalStat") 
  },
  { 
    AppButtonText: "History", 
    icon: "history", 
    onPress: () => navigation.push("History") 
  },
    ];
   const expenseButtons = [
  { 
    AppButtonText: "Clothes", 
    icon: "tshirt", 
    onPress: () => navigation.navigate("ViewExpenses", { category: 'clothe' }) 
  },
  { 
    AppButtonText: "Food", 
    icon: "utensils", 
    onPress: () => navigation.navigate("ViewExpenses", { category: 'food' }) 
  },
  { 
    AppButtonText: "Transport", 
    icon: "subway", 
    onPress: () => navigation.navigate("ViewExpenses", { category: 'Transport' }) 
  },
  { 
    AppButtonText: "Studie", 
    icon: "university", 
    onPress: () => navigation.navigate("ViewExpenses", { category: 'Studie' }) 
  },
  { 
    AppButtonText: "Holiday", 
    icon: "plane-departure", 
    onPress: () => navigation.navigate("ViewExpenses", { category: 'holiday' }) 
  },
  { 
    AppButtonText: "Tax", 
    icon: "cash-register", 
    onPress: () => navigation.navigate("ViewExpenses", { category: 'tax' }) 
  },
  { 
    AppButtonText: "Hobbie", 
    icon: "laugh-wink", 
    onPress: () => navigation.navigate("ViewExpenses", { category: 'hobbie' }) 
  },
  { 
    AppButtonText: "Money", 
    icon: "hand-holding-usd", 
    onPress: () => navigation.navigate("ViewExpenses", { category: 'money' }) 
  },
  { 
    AppButtonText: "Epargne", 
    icon: "search-dollar", 
    onPress: () => navigation.navigate("ViewExpenses", { category: 'epargne' }) 
  },
  { 
    AppButtonText: "Other", 
    icon: "newspaper", 
    onPress: () => navigation.navigate("ViewExpenses", { category: 'other' }) 
  },
  ];
   const incomeButtons = [
  { 
    AppButtonText: "Salary", 
    icon: "dollar-sign", 
    onPress: () => navigation.navigate("ViewIncomes", { category: 'Salary' }) 
  },
  { 
    AppButtonText: "Bonus", 
    icon: "trophy", 
    onPress: () => navigation.navigate("ViewIncomes", { category: 'Bonus' }) 
  },
  { 
    AppButtonText: "Loan", 
    icon: "search-dollar", 
    onPress: () => navigation.navigate("ViewIncomes", { category: 'Loan' }) 
  },
  { 
    AppButtonText: "Sales", 
    icon: "university", 
    onPress: () => navigation.navigate("ViewIncomes", { category: 'Sales' }) 
  },
  { 
    AppButtonText: "Gift", 
    icon: "gift", 
    onPress: () => navigation.navigate("ViewIncomes", { category: 'Gift' }) 
  },
  { 
    AppButtonText: "Rent", 
    icon: "home", 
    onPress: () => navigation.navigate("ViewIncomes", { category: 'Rent' }) 
  },
  { 
    AppButtonText: "Allowance", 
    icon: "laugh-wink", 
    onPress: () => navigation.navigate("ViewIncomes", { category: 'Allowance' }) 
  },
  { 
    AppButtonText: "Refund", 
    icon: "hand-holding-usd", 
    onPress: () => navigation.navigate("ViewIncomes", { category: 'Refund' }) 
  },
  { 
    AppButtonText: "Stocks", 
    icon: "search-dollar", 
    onPress: () => navigation.navigate("ViewIncomes", { category: 'Stocks' }) 
  },
  { 
    AppButtonText: "OtherIncome", 
    icon: "newspaper", 
    onPress: () => navigation.navigate("ViewIncomes", { category: 'Other' }) 
  },
    ];
     const toolkitButtons = [
  { 
    AppButtonText: "Agenda", 
    icon: "calendar-alt", 
    onPress: () => navigation.push("Agenda") 
  },
  { 
    AppButtonText: "Reminder", 
    icon: "bell", 
    onPress: () => navigation.push("Reminder") 
  },
  { 
    AppButtonText: "Calculator", 
    icon: "calculator", 
    onPress: () => navigation.push("Calculator") 
  },
  { 
    AppButtonText: "Download", 
    icon: "download", 
    onPress: () => navigation.push("Download") 
  },
  { 
    AppButtonText: "Settings", 
    icon: "user-cog", 
    onPress: () => navigation.push("Settings") 
  }
];

 let buttonConfig;
  switch (buttonType) {
    case 'global':
      buttonConfig = globalButtons;
      break;
    case 'income':
      buttonConfig = incomeButtons;
      break;
    case 'expense':
      buttonConfig = expenseButtons;
      break;
    case 'toolkit':
      buttonConfig = toolkitButtons;
      break;
    default:
      buttonConfig = [];

 }
  return buttonConfig;
}
