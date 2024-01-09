import React, { useCallback, useEffect, useState } from "react";

import { View, StyleSheet, Text } from "react-native";

function AppText({ style, children }) {
  return <Text style={[styles.Appstyle, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  Appstyle: {
    fontSize: 16,
     color: "#E0AA3E",
    textAlign: "center",
    fontWeight: "normal",
    paddingVertical: 0,
    
  },
});

export default AppText;
