import db from  '../../SqLiteDatabase/DbConnection';

const incomeController = {
  createIncome: (incomeData) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO incomes (_id, incomesOwner, date, categories, label, amount, createdAt, updatedAt, __v) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [incomeData._id, incomeData.incomesOwner, incomeData.date, incomeData.categories, incomeData.label, incomeData.amount, incomeData.createdAt, incomeData.updatedAt, incomeData.__v],
          (_, { rowsAffected, insertId }) => {
            if (rowsAffected > 0) {
              resolve(insertId);
            } else {
              reject(new Error('Failed to create income'));
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  },

  getAllIncomes: () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM incomes',
          [],
          (_, { rows }) => {
            resolve(rows._array);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  },

  updateIncome: (id, incomeData) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE incomes SET incomesOwner = ?, date = ?, categories = ?, label = ?, amount = ?, createdAt = ?, updatedAt = ?, __v = ? WHERE _id = ?',
          [incomeData.incomesOwner, incomeData.date, incomeData.categories, incomeData.label, incomeData.amount, incomeData.createdAt, incomeData.updatedAt, incomeData.__v, id],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              resolve();
            } else {
              reject(new Error('Failed to update income'));
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  },

  deleteIncome: (id) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM incomes WHERE _id = ?',
          [id],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              resolve();
            } else {
              reject(new Error('Failed to delete income'));
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
