import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const link = (main, sub, onPress) => {
  return (
    <TouchableOpacity>
      <Text>{main}</Text>
      <Text>{sub}</Text>
    </TouchableOpacity>
  );
}

export default link