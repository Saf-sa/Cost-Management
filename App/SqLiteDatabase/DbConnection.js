import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'expenses-incomes.sqlite' });

// Fonction pour initialiser la base de données
const initializeDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS "income-expense" (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        amount REAL
      )`,
      [],
      () => console.log('Structure de la base de données créée avec succès'),
      error => console.error('Erreur lors de la création de la structure de la base de données :', error)
    );
  });
};

// Appeler la fonction d'initialisation de la base de données au chargement de l'application
initializeDatabase();

export default db;
