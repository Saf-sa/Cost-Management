import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'tracker.db' });

const reminderController = {
  createReminder: (reminderData) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO reminder (reminderOwner, startDate, expireDate, contractName, label, email, renewal, created_at, updated_at ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [reminderData.reminderOwner, reminderData.startDate, reminderData.expireDate, reminderData.contractName, reminderData.label, reminderData.email, reminderData.renewal, reminderData.created_at, reminderData.updated_at],
          (_, { rowsAffected, insertId }) => {
            if (rowsAffected > 0) {
              resolve(insertId);
            } else {
              reject(new Error('Failed to create reminder'));
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  },

  // Autres fonctions CRUD pour les reminders...
};

export default reminderController;
