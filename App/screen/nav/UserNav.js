import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  BackHandler,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Icon from "../../shared/components/IncomExpenseComponent/Icon";
import AppText from "../../shared/components/uiApp/AppText";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
function HomeNav({ title, subtitle, image }) {
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
            size={40}
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
             
              marginTop: -290,
              width: 200,
              height: 390,
              borderRadius: 10,
              backgroundColor: "rgba(255, 255, 255, 1)",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
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
                 <TouchableOpacity onPress={() => navigation.navigate("AboutUs")}>
              <Text style={styles.navText}> About us</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => null}>
              <TouchableOpacity onPress={() => navigation.navigate("Impressum")}>
                <Text style={styles.navText}>Impressum</Text>
              </TouchableOpacity>
            </TouchableOpacity>
       
               <TouchableOpacity onPress={() => null}>
              <TouchableOpacity onPress={() => navigation.navigate("ContactForm")}>
                <Text style={styles.navText}>Contact Us</Text>
              </TouchableOpacity>
        
            </TouchableOpacity>

               <TouchableOpacity onPress={() => null}>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.navText}>Logout</Text>
              </TouchableOpacity>
        
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  textsAbout: {

    paddingVertical: 13.5,
    fontSize: 20,
    textAlign: "center",
    
  },
  containerParent: {
    
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {

    flexDirection: "row",
  },
  image: {
    marginTop: 0,
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    marginRight: 10,
  },
  textsTitle: {
    
    justifyContent: "center",
    paddingLeft: 10,
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

export default HomeNav;
