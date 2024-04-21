import { useMemo } from 'react';

export default function useButtonConfig(navigation, buttonType = 'global' ) {
  const globalButtons = [
  { 
    AppButtonText: "Income", 
    icon: "dollar-sign", 
    onPress: () => navigation.push("SelectDownloadIncome") 
  },
  { 
    AppButtonText: "Expense", 
    icon: "shopping-cart", 
    onPress: () => navigation.push("SelectDownloadExpense") 
  },
  { 
    AppButtonText: "Forecast", 
    icon: "file-invoice-dollar", 
    onPress: () => navigation.push("SelectDownload") 
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
    onPress: () => navigation.navigate("SelectDownloadExpense", { category: 'clothe' }) 
  },
  { 
    AppButtonText: "Food", 
    icon: "utensils", 
    onPress: () => navigation.navigate("SelectDownloadExpense", { category: 'food' }) 
  },
  { 
    AppButtonText: "Transport", 
    icon: "subway", 
    onPress: () => navigation.navigate("SelectDownloadExpense", { category: 'Transport' }) 
  },
  { 
    AppButtonText: "Studie", 
    icon: "university", 
    onPress: () => navigation.navigate("SelectDownloadExpense", { category: 'Studie' }) 
  },
  { 
    AppButtonText: "Holiday", 
    icon: "plane-departure", 
    onPress: () => navigation.navigate("SelectDownloadExpense", { category: 'holiday' }) 
  },
  { 
    AppButtonText: "Tax", 
    icon: "cash-register", 
    onPress: () => navigation.navigate("SelectDownloadExpense", { category: 'tax' }) 
  },
  { 
    AppButtonText: "Hobbie", 
    icon: "laugh-wink", 
    onPress: () => navigation.navigate("SelectDownloadExpense", { category: 'hobbie' }) 
  },
  { 
    AppButtonText: "Money", 
    icon: "hand-holding-usd", 
    onPress: () => navigation.navigate("SelectDownloadExpense", { category: 'money' }) 
  },
  { 
    AppButtonText: "Epargne", 
    icon: "search-dollar", 
    onPress: () => navigation.navigate("SelectDownloadExpense", { category: 'epargne' }) 
  },
  { 
    AppButtonText: "Other", 
    icon: "newspaper", 
    onPress: () => navigation.navigate("SelectDownloadExpense", { category: 'other' }) 
  },
  ];
   const incomeButtons = [
  { 
    AppButtonText: "Salary", 
    icon: "dollar-sign", 
    onPress: () => navigation.navigate("SelectDownloadIncome", { category: 'Salary' }) 
  },
  { 
    AppButtonText: "Bonus", 
    icon: "trophy", 
    onPress: () => navigation.navigate("SelectDownloadIncome", { category: 'Bonus' }) 
  },
  { 
    AppButtonText: "Loan", 
    icon: "search-dollar", 
    onPress: () => navigation.navigate("SelectDownloadIncome", { category: 'Loan' }) 
  },
  { 
    AppButtonText: "Sales", 
    icon: "university", 
    onPress: () => navigation.navigate("SelectDownloadIncome", { category: 'Sales' }) 
  },
  { 
    AppButtonText: "Gift", 
    icon: "gift", 
    onPress: () => navigation.navigate("SelectDownloadIncome", { category: 'Gift' }) 
  },
  { 
    AppButtonText: "Rent", 
    icon: "home", 
    onPress: () => navigation.navigate("SelectDownloadIncome", { category: 'Rent' }) 
  },
  { 
    AppButtonText: "Allowance", 
    icon: "laugh-wink", 
    onPress: () => navigation.navigate("SelectDownloadIncome", { category: 'Allowance' }) 
  },
  { 
    AppButtonText: "Refund", 
    icon: "hand-holding-usd", 
    onPress: () => navigation.navigate("SelectDownloadIncome", { category: 'Refund' }) 
  },
  { 
    AppButtonText: "Stocks", 
    icon: "search-dollar", 
    onPress: () => navigation.navigate("SelectDownloadIncome", { category: 'Stocks' }) 
  },
  { 
    AppButtonText: "Other", 
    icon: "newspaper", 
    onPress: () => navigation.navigate("SelectDownloadIncome", { category: 'Other' }) 
  },
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

 }
  return buttonConfig;
}
