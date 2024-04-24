import { View, Text,StyleSheet, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import AppText from './AppText';



const Card = ({cardText, result, balance, incomes, expenses, firstName, lastName, email }) => {
  return (
    <View>
      <LinearGradient
          style={styles.parentContainer}
          colors={["#f9f295", "#E0AA3E", "#F7EF8A", "#B88A44"]}
          start={{ x: 0.1, y: 0.1 }}
          end={{ x: 1, y: 3 }}
        >
          <View style={styles.balanceContainer}>
            <View>
            <AppText style= {{ flexDirection: 'row' }}>
                <View>
                <Text style={{ fontSize: 36, color:'blue', lineHeight: 34, paddingBottom:4 }}>€</Text>
                </View>
                 <View>
                <Text style={{ fontSize: 45, color:'dodgerblue', lineHeight:50}}>X</Text>
                </View>
                 <View>
                <Text style={{ fontSize: 22, color:'blue', lineHeight: 51, paddingBottom:2 }}>penses Manager</Text>
                
                </View>
            </AppText>
                    </View>    

              <View style={styles.sim} >
                 <Image style={styles.simCard} source={require('../../../assets/sim-card.png')} />
                </View>
           <View>
             <Text style={styles.text}>{cardText}{result} </Text>
             

           </View>
              
          </View>
         
           <View>
                <AppText  style={styles.CardNumber}>  
                  4907 2024 1707 2778 1962
                </AppText>
              </View>

        </LinearGradient>
    </View>
  )
}

export default Card


const styles = StyleSheet.create({
   parentContainer: {
      ...Platform.select({
      ios: {
    position:'fixed',
    width: "70%",
    height: 185,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    borderWidth:0.3,
    borderColor: 'brown',
    marginTop:20,
    marginHorizontal: 65,
    marginVertical: 10,
    shadowOffset: {
      width: 0.8,
      height: 2,},
  },
     android: {
    width: "80%",
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    top: 10,
    marginBottom: 100,
    marginHorizontal: 35,
    marginVertical: 0,
    shadowOffset: {
      width: 0.8,
      height: 2,},
      },
    }),
  },
  
   balanceContainer: {
...Platform.select({
      ios: {
    position: "relative",
    top: -20,
    marginBottom: -50,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 17,
    width: "80%",
      },

  android: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 0,
    width: "80%",
  
     },
    }),
  },
  text:{
    marginBottom:30,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
     color:'brown'  
  },
  sim:{
    top:45,
    left:-115,
  },
 simCard:{
    ...Platform.select({
      ios: {
    marginTop: -50,
    marginBottom: 60,
    borderRadius: 6,
   
    width: 40,
    height:30,

  }, 
    android: {
    
    marginTop: -30,
    marginBottom:-10,
    borderRadius: 6,
    marginLeft: -90,
    width: 35,
    height:25,
    },
    }),
  },
  CardNumber: {
     ...Platform.select({
      ios: {
    position: "relative",
    fontSize: 15,
    marginTop: 15,
    marginBottom:0,
    left: -45,
    color: "darkslateblue",
  },
   android: {
    fontSize: 15,
     marginTop: 10,
    left: -50,
    color: "darkslateblue",
   },
  }),
  },  
  });