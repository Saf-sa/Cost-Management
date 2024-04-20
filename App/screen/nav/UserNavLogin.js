import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "../../shared/components/uiApp/Icon";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('Storage successfully cleared!');
  } catch (e) {
    console.log('Failed to clear the async storage.');
  }
}

export function HomeNavLog({image }) {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  // const ContactLinking = () => {
  //   Linking.openURL("https://www.google.com");
  // };
  return (
    <SafeAreaView>
      <View style={styles.containerParent}>
        <View style={styles.container}>
          <Image style={styles.image} source={image} />
          <View style={styles.textsTitle}>
          
            
          </View>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          
          <Icon
            name="bars"
            size={Platform.select({ ios: 40, android: 36 })}
            bRadius={10}
            
          />
        </TouchableOpacity>
      </View>
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            marginBottom: 10,
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "rgba(0, 0, 0, 0.3)",



          }}
        >
          <View
            style={{
             
              marginTop: -10,
              width: 200,
              height: 410,
              borderRadius: 10,
              backgroundColor: "#faefd7",
              justifyContent: "center",
              
            }}
          >
            <TouchableOpacity
              style={{
                alignSelf: "center",
              }}

              onPressOut={() => {
                setModalVisible(false);
              }}
            >
              <Icon
                
                name={"bars"}
                iconColor={"red"}
                size={45}
                bRadius={7}
                styles={{
               
                alignSelf: "center",
                height: 45,
                justifyContent: "center",
               borderColor: "grey", 
            
               
              
                
                

                }}
              />
            </TouchableOpacity>
                 <TouchableOpacity onPress={() => { 
                  navigation.reset({
                  index: 0,
                  routes: [{ name: 'Dashboard' }],
                });
                navigation.navigate("AboutUs");
                setModalVisible(false);
              }}>
              <Text style={styles.navText}> About us</Text>

             </TouchableOpacity>
                 <TouchableOpacity onPress={() => { 
                  navigation.reset({
                  index: 0,
                  routes: [{ name: 'Dashboard' }],
                });
                navigation.navigate("Impressum");
                setModalVisible(false);
              }}>
                 <Text style={styles.navText}>Impressum</Text>
                  </TouchableOpacity>
        
       
                <TouchableOpacity onPress={() => { 
                  navigation.reset({
                  index: 0,
                  routes: [{ name: 'Dashboard' }],
                });
                navigation.navigate("ContactForm");
                setModalVisible(false);
              }}>
                 <Text style={styles.navText}>Contact</Text>
                  </TouchableOpacity>

                 <TouchableOpacity onPress={() => { 
                   clearStorage();
                  navigation.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                });
                setModalVisible(false);
              }}>
                <Text style={styles.navText}>Logout</Text>
              </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    containerParent: {
      ...Platform.select({
      ios: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
    android: {
    with: "100%",
    height: 40,
    top: 0,
    paddingHorizontal: -20,
    paddingVertical: -30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  }),
  },
  container: {
    ...Platform.select({
      ios: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
    android: {
    top: 20,
    
  },
  }),
  },
   image: {
    ...Platform.select({
      ios: {
    marginTop: 0,
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    marginRight: 10,
  },

    android: {
    marginTop: -30,
    width: 40,
    height: 40,
    borderRadius: 45 / 2,
    marginRight: 20,
  },
  }),
  },
  
  textsTitle: {
    
    justifyContent: "center",
    paddingLeft: 30,
  },
  navText:{
     fontSize: 16,
     color: "#E0AA3E",
    textAlign: "center",
    fontWeight: "normal",
    paddingVertical: 32,
    fontSize: 20,
    textAlign: "center",
  }

});


