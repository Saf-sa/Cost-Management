import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";;
import { icon } from '@fortawesome/fontawesome-svg-core';


function Icon({
  name,
  styles,
  size = 60,

  bRadius = 10,
  iconColor = "black",
}) {
  return (
        <LinearGradient
     
       colors={["#f9f295", "#E0AA3E", "#F7EF8A", "#B88A44"]}
       start={{ x: 0.1, y: 0.1 }}
       end={{ x: 1, y: 3 }}


     >
    <View
    
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / bRadius,
          justifyContent: "center",
          alignItems: "center",
          borderColor: "gray",
          borderWidth: 1,
        },
        styles,
      ]}
    >
      <FontAwesome5Icon name={name} color={iconColor} size={size * 0.4} />
    </View>
     </LinearGradient>
  );
}

export default Icon;
