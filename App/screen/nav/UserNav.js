import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  BackHandler,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../shared/utils/colors";
import Icon from "../../shared/components/IncomExpenseComponent/Icon";
import AppText from "../../shared/components/uiApp/AppText";
import { useNavigation } from "@react-navigation/native";

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
            <AppText style={styles.titleStyle}>{title}</AppText>
            <AppText style={styles.subtitleStyle}>{subtitle}</AppText>
          </View>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon
            name="bars"
            size={40}
            backgroundColor="white"
            iconColor="gray"
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
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
        >
          <View
            style={{
              width: 200,
              height: 400,
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
                backgroundColor={colors.primarySecondPair}
                iconColor={colors.white}
                size={45}
                bRadius={2}
                styles={{
                  marginVertical: 10,
                  alignSelf: "center",
                  borderColor: "transparent",
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => null}>
              <TouchableOpacity onPress={() => navigation.navigate("AboutUs")}>
                <AppText style={styles.textsAbout}>Policies</AppText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("AboutUs")}>
                <AppText style={styles.textsAbout}>Terms of use </AppText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("AboutUs")}>
                <AppText style={styles.textsAbout}>Code of conduct </AppText>
              </TouchableOpacity>
              <AppText style={styles.textsAbout}>Privacy</AppText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("AboutUs")}>
              <AppText style={styles.textsAbout}> About us</AppText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => BackHandler.exitApp()}>
              <AppText style={[styles.textsAbout, { color: "blue" }]}>
                Contact
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  textsAbout: {
    
    paddingVertical: 15,
    fontSize: 20,
    color: colors.dark,
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
    width: 50,
    height: 50,
    borderRadius: 45 / 2,
    marginRight: 10,
  },
  textsTitle: {
    justifyContent: "center",
    paddingLeft: 10,
  },
  titleStyle: {
    fontSize: 15,
    color: colors.dark,
  },
  subtitleStyle: {
    fontSize: 20,
    color: colors.dark,
   
  },
});

export default HomeNav;