import SQLite from 'react-native-sqlite-storage';

// Fonction pour initialiser la base de données et créer les tables
const initializeDatabase = () => {
  // Ouvrir la base de données
  const db = SQLite.openDatabase(
    { name: '../tracker.db' },
    () => {
      console.log('Base de données ouverte avec succès');
      // Créer les tables si elles n'existent pas déjà
      db.transaction(tx => {
        // Table pour les utilisateurs (users)
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstName TEXT NOT NULL,
            lastName TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL,
            resetCode TEXT DEFAULT NULL,
            resetCodeExpiry TEXT DEFAULT NULL,
            expiresIn INTEGER DEFAULT 3600,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            updated_at TEXT DEFAULT CURRENT_TIMESTAMP
          )`,
          [],
          () => console.log('Table users créée avec succès'),
          error => console.error('Erreur lors de la création de la table users :', error)
        );

        // Table pour les revenus (incomes)
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS incomes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            incomeOwner TEXT NOT NULL,
            date TEXT NOT NULL,
            categories TEXT NOT NULL,
            otherCategories TEXT,
            label TEXT NOT NULL,
            amount REAL NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            updated_at TEXT DEFAULT CURRENT_TIMESTAMP
          )`,
          [],
          () => console.log('Table incomes créée avec succès'),
          error => console.error('Erreur lors de la création de la table incomes :', error)
        );

        // Table pour les dépenses (expenses)
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            expenseOwner TEXT NOT NULL,
            date TEXT NOT NULL,
            categories TEXT NOT NULL,
            label TEXT NOT NULL,
            amount REAL NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            updated_at TEXT DEFAULT CURRENT_TIMESTAMP
          )`,
          [],
          () => console.log('Table expenses créée avec succès'),
          error => console.error('Erreur lors de la création de la table expenses :', error)
        );

        // Table pour l'agenda (agenda)
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS agenda (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            agendaOwner TEXT NOT NULL,
            date TEXT NOT NULL,
            name TEXT NOT NULL,
            place TEXT NOT NULL,
            duration TEXT NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            updated_at TEXT DEFAULT CURRENT_TIMESTAMP
          )`,
          [],
          () => console.log('Table agenda créée avec succès'),
          error => console.error('Erreur lors de la création de la table agenda :', error)
        );

        // Table pour les rappels (reminder)
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS reminder (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            reminderOwner TEXT NOT NULL,
            startDate TEXT NOT NULL,
            expireDate TEXT NOT NULL,
            contractName TEXT NOT NULL,
            label TEXT NOT NULL,
            email TEXT NOT NULL,
            renewal TEXT NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            updated_at TEXT DEFAULT CURRENT_TIMESTAMP
          )`,
          [],
          () => console.log('Table reminder créée avec succès'),
          error => console.error('Erreur lors de la création de la table reminder :', error)
        );
      });
    },
    error => console.error('Erreur lors de l\'ouverture de la base de données :', error)
  );
}

// Appeler la fonction d'initialisation de la base de données au chargement de l'application
initializeDatabase();
