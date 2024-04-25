import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'tracker.db' });

const UserController = {
  createUser: (userData) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO user (id, firstName, lastName, email, password, resetCode, resetCodeExpiry, expiresIn, created_at, updated_at    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [userData.id, userData.firstName, userData.lastName, userData.email, userData.password, userData.resetCode, userData.resetCodeExpiry, userData.expiresIn, userData.created_at, userData.updated_at],
          (_, { rowsAffected, insertId }) => {
            if (rowsAffected > 0) {
              resolve(insertId);
            } else {
              reject(new Error('Failed to create user'));
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  },

  // Autres fonctions CRUD pour les users...
};

export default UserController;
