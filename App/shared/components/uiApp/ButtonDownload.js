import { useMemo } from 'react';

export default function useButtonConfig(navigation, buttonType = 'global' ) {
  const globalButtons = [
  { 
    AppButtonText: "Income", 
    icon: "dollar-sign", 
    onPress: () => navigation.push("SelectDownload") 
  },
  { 
    AppButtonText: "Expense", 
    icon: "shopping-cart", 
    onPress: () => navigation.push("SelectDownload") 
  },
  { 
    AppButtonText: "Forecast", 
    icon: "file-invoice-dollar", 
    onPress: () => navigation.push("SelectDownload") 
  },
  { 
    AppButtonText: "Statistics", 
    icon: "chart-line", 
    onPress: () => navigation.push("SelectDownload") 
  },
  { 
    AppButtonText: "History", 
    icon: "history", 
    onPress: () => navigation.push("SelectDownload") 
  },
    ];
   const expenseButtons = [
  { 
    AppButtonText: "Clothes", 
    icon: "tshirt", 
    onPress: () => navigation.navigate("SelectDownload", { category: 'clothe' }) 
  },
  { 
    AppButtonText: "Food", 
    icon: "utensils", 
    onPress: () => navigation.navigate("SelectDownload", { category: 'food' }) 
  },
  { 
    AppButtonText: "Transport", 
    icon: "subway", 
    onPress: () => navigation.navigate("SelectDownload", { category: 'Transport' }) 
  },
  { 
    AppButtonText: "Studie", 
    icon: "university", 
    onPress: () => navigation.navigate("SelectDownload", { category: 'Studie' }) 
  },
  { 
    AppButtonText: "Holiday", 
    icon: "plane-departure", 
    onPress: () => navigation.navigate("SelectDownload", { category: 'holiday' }) 
  },
  { 
    AppButtonText: "Tax", 
    icon: "cash-register", 
    onPress: () => navigation.navigate("SelectDownload", { category: 'tax' }) 
  },
  { 
    AppButtonText: "Hobbie", 
    icon: "laugh-wink", 
    onPress: () => navigation.navigate("SelectDownload", { category: 'hobbie' }) 
  },
  { 
    AppButtonText: "Money", 
    icon: "hand-holding-usd", 
    onPress: () => navigation.navigate("SelectDownload", { category: 'money' }) 
  },
  { 
    AppButtonText: "Epargne", 
    icon: "search-dollar", 
    onPress: () => navigation.navigate("SelectDownload", { category: 'epargne' }) 
  },
  { 
    AppButtonText: "Other", 
    icon: "newspaper", 
    onPress: () => navigation.navigate("SelectDownload", { category: 'other' }) 
  },
  ];
   const incomeButtons = [
  { 
    AppButtonText: "Salary", 
    icon: "dollar-sign", 
    onPress: () => navigation.navigate("SelectDownload", { category: 'Salary' }) 
  },
  { 
    AppButtonText: "Bonus", 
    icon: "trophy", 
    onPress: () => navigation.navigate("SelectDownload", { category: 'Bonus' }) 
  },
  { 
    AppButtonText: "Loan", 
    icon: "search-dollar", 
    onPress: () => navigation.navigate("SelectDownload", { category: 'Loan' }) 
  },
  { 
    AppButtonText: "Sales", 
    icon: "university", 
    onPress: () => navigation.navigate("SelectDownload", { category: 'Sales' }) 
  },
  { 
    AppButtonText: "Gift", 
    icon: "gift", 
    onPress: () => navigation.navigate("SelectDownload", { category: 'Gift' }) 
  },
  { 
    AppButtonText: "Rent", 
    icon: "home", 
    onPress: () => navigation.navigate("SelectDownload", { category: 'Rent' }) 
  },
  { 
    AppButtonText: "Allowance", 
    icon: "laugh-wink", 
    onPress: () => navigation.navigate("SelectDownload", { category: 'Allowance' }) 
  },
  { 
    AppButtonText: "Refund", 
    icon: "hand-holding-usd", 
    onPress: () => navigation.navigate("SelectDownload", { category: 'Refund' }) 
  },
  { 
    AppButtonText: "Stocks", 
    icon: "search-dollar", 
    onPress: () => navigation.navigate("SelectDownload", { category: 'Stocks' }) 
  },
  { 
    AppButtonText: "Other", 
    icon: "newspaper", 
    onPress: () => navigation.navigate("SelectDownload", { category: 'Other' }) 
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
