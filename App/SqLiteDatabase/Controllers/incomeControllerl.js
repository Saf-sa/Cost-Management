import db from './DbConnection.js';

const incomeController = {
  createIncome: (incomeData) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO "income-expense" (name, amount) VALUES (?, ?)',
          [incomeData.name, incomeData.amount],
          (_, { rowsAffected, insertId }) => {
            if (rowsAffected > 0) {
              resolve(insertId);
            } else {
              reject(new Error('Failed to create income-expense'));
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  },

  getAllIncomeExpenses: () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM "income-expenses.sqlite"',
          [],
          (_, { rows }) => {
            resolve(rows.raw());
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  },

  updateIncomeExpense: (id, name, amount) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE "income-expense" SET name = ?, amount = ? WHERE id = ?',
          [name, amount, id],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              resolve();
            } else {
              reject(new Error('Failed to update income-expense'));
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  },

  deleteIncomeExpense: (id) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM "income-expense" WHERE id = ?',
          [id],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              resolve();
            } else {
              reject(new Error('Failed to delete income-expense'));
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  }
};

export default incomeController;
