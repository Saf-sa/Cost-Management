import React from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";

function Screen({ children, style }) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={style}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

    screen: {
     ...Platform.select({
      ios: {
    padding: 20,
    marginTop: -55,
    marginLeft: 15,
    marginRight: 15,
    flex: 1,
  },
  
  android: {
    padding: 20,
    marginTop: -45,
    marginLeft: 5,
    marginRight: 5,
    flex: 1,
   },
    }),
  
  },

});

export default Screen;
