import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import AppButton from '../../shared/components/uiApp/AppButton';
import SendButton from '../../shared/components/uiApp/AppSendButton';
import Card from '../../shared/components/uiApp/Card';
import AppText from '../../shared/components/uiApp/AppText';
import * as SQLite from "expo-sqlite";

const Forecast = () => {
  const [loading, setLoading] = useState(true);
  const [incomes, setIncomes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const db = SQLite.openDatabase('./tracker.db');
    console.log('DB connected', db);
    db.transaction(tx => {
    tx.executeSql(
  `CREATE TABLE IF NOT EXISTS incomes (
     _id TEXT PRIMARY KEY,
     incomesOwner TEXT,
     date TEXT,
     categories TEXT,
     label TEXT,
     amount INT,
     createdAt TEXT,
     updatedAt TEXT,
     __v INTEGER
   );`,
  [],
        () => {
          console.log('Table "incomes" créée ou existante');
          tx.executeSql(
            `SELECT * FROM incomes`,
            [],
            (_, { rows: { _array } }) => {
              console.log('Données récupérées de la table "incomes":', _array);
              setIncomes(_array);
              setLoading(false);
            },
            error => {
              console.error('Erreur lors de la récupération des entrées :', error);
              setError('Erreur lors de la récupération des entrées');
              setLoading(false);
            }
          );
        },
        error => {
          console.error('Erreur lors de la création de la table :', error);
          setError('Erreur lors de la création de la table');
          setLoading(false);
        }
      );
    });
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View>
      <AppButton
        AppButtonText="Incomes"
        icon="dollar-sign"
        onPress={() => console.log('incomes')}
      /> 
      <SendButton 
        sendButtonText={"submit"}
      /> 
      {incomes.length > 0 ? (
        <FlatList
          data={incomes}
          renderItem={({ item }) => (
            <Card cardText={`Date: ${item.date}, Categories: ${item.categories}, Label: ${item.label}, Amount: ${item.amount}`} />
          )}
          keyExtractor={item => item._id.toString()}
        />
      ) : (
        <Text>No incomes found</Text>
      )}
    </View>
  );
}

export default Forecast;
