import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'expenses-incomes.sqlite' });

const AgendaController = {
  createAgenda: (agendaData) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO agenda (agendaOwner, date, name, place, duration) VALUES (?, ?, ?, ?, ?)',
          [agendaData.agendaOwner, agendaData.date, agendaData.name, agendaData.place, agendaData.duration],
          (_, { rowsAffected, insertId }) => {
            if (rowsAffected > 0) {
              resolve(insertId);
            } else {
              reject(new Error('Failed to create agenda'));
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  },

  // Autres fonctions CRUD pour les agendas...
};

export default AgendaController;
