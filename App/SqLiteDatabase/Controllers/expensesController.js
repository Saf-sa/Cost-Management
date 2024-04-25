import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'tracker.db' });

const expenseController = {
  createExpense: (expenseData) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO expense (expenseOwner, date, categories, label, amount, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [expenseData.expenseOwner, expenseData.date, expenseData.categories, expenseData.label, expenseData.amount, expenseData.created_at, expenseData.updated_at],
          (_, { rowsAffected, insertId }) => {
            if (rowsAffected > 0) {
              resolve(insertId);
            } else {
              reject(new Error('Failed to create expense'));
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  },

  // Autres fonctions CRUD pour les dépenses...
};

export default expenseController;
