import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Toast,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import Icon from "../../shared/components/IncomExpenseComponent/Icon";
import AppText from "../../shared/components/uiApp/AppText";
import UserNav from "../nav/UserNav";
import Screen2 from "../../shared/components/Screen";
import ExpenseCat from "../AddIncomeExpense/Categories/ExpenseCategorie";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";



  function HomeDashbord() {
    const [balance, setBalance] = useState();
    const [totalIncome, setTotalIncome] = useState();
    const [totalExpense, setTotalExpense] = useState();
    const [username, setUsername] = useState();
    const [loading, setLoading] = useState(false);
    const [flatListItems, setFlatListItems] = useState([]);
    const navigation = useNavigation();

    //get Date Today default
    const dateToday = moment(new Date()).format("YYYYMMDD");
    const yesterday = moment().subtract(1, "days");
    const dateYesterday = moment(yesterday).format("YYYYMMDD");
    const [formErrors, setFormErrors] = useState({
      firstName: null,
      lastName: null,
    });

    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
    });

    //get Category when Clicked
    const [firstName, setFirstName] = useState("All");
    const [lasttName, setLasttName] = useState("All");
    const setSelectCategoryByName = (lastName) => {
      if (firstName === "All") {
        dispatch({ type: "all", payload: flatListItems });
      } else {
        let categoryName = flatListItems.filter((a) => a.category == firstName);
        //console.log(state.expenseList);
        if (categoryName == "") {
          dispatch({ type: "error" });
          Toast.show("No Record for " + firstName, Toast.SHORT);
        } else {
          dispatch({ type: firstName, payload: firstName });
        }
      }
    };

    //getDimension
    const { height, width } = useWindowDimensions();
    const [refreshing, setRefreshing] = useState(false);
    return (
      <Screen2>
        <UserNav
          image={require("../../assets/iconPerson.png")}
          title="Welcome Back = User"
          /* subtitle="Titanium" */
        />
        <LinearGradient
          style={styles.parentContainer}
          colors={["#f9f295", "#E0AA3E", "#F7EF8A", "#B88A44"]}
          start={{ x: 0.1, y: 0.1 }}
          end={{ x: 1, y: 3 }}
        >
          <View style={styles.balanceContainer}>
            <AppText style={{ color: "black", fontSize: 20, marginBottom: 5 }}>
              PREMIUM ACCOUNT ={" TITANIUM"}
            </AppText>

            <AppText style={{ color: "black", fontSize: 15 }}>BALANCE</AppText>

            <AppText style={{ color: "red", fontSize: 12 }}>3000</AppText>

            <AppText
              style={{
                color: "green",
                fontSize: 12,
              }}
            >
              3000
            </AppText>

            <AppText style={{ marginTop: 10 }}></AppText>
          </View>
          <View style={styles.parentIncomeContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AntDesign name="arrowup" color="#25F333" size={30 * 0.5} />
              </View>
              <View style={{ marginLeft: 10 }}>
                <AppText style={{ color: "black", fontSize: 12 }}>
                  Income
                </AppText>
                <AppText style={{ color: "green", fontSize: 12 }}>
                  TOTAL=
                </AppText>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AntDesign name="arrowdown" color="#FB5D5D" size={30 * 0.5} />
              </View>
              <View style={{ marginLeft: 10 }}>
                <AppText style={{ color: "black", fontSize: 12 }}>
                  Expenses
                </AppText>
                <AppText style={{ color: "red", fontSize: 12 }}>
                  TOTAL =
                </AppText>
              </View>
            </View>
          </View>
        </LinearGradient>
        <View>
          <AppText style={styles.dashboardTitle}>Dashboard</AppText>
        </View>
        <View style={styles.dashboard}>
          <TouchableOpacity onPress={() => navigation.push("MyIncomes")}>
            <Icon
              name="dollar-sign"
              size={60}
              backgroundColor="#E0AA3E"
              iconColor="black"
            />
            <Text style={{ fontSize: 15, paddingTop: 5 }}> Incomes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("ViewExpenses")}>
            <Icon
              name="shopping-cart"
              size={60}
              backgroundColor="#E0AA3E"
              iconColor="black"
            />
            <Text style={{ fontSize: 15, paddingTop: 5 }}>Expenses</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("Forecast")}>
            <Icon
              name="file-invoice-dollar"
              size={60}
              backgroundColor="#E0AA3E"
              iconColor="black"
            />
            <Text style={{ fontSize: 15, paddingTop: 5 }}>Forecast</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("Statistics")}>
            <Icon
              name="chart-line"
              size={60}
              backgroundColor="#E0AA3E"
              iconColor="black"
            />
            <Text style={{ fontSize: 15, paddingTop: 5 }}>Statistics</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("History")}>
            <Icon
              name="history"
              size={60}
              backgroundColor="#E0AA3E"
              iconColor="black"
            />
            <Text style={{ fontSize: 15, paddingTop: 5 }}> History</Text>
          </TouchableOpacity>
        </View>
        <View>
          <AppText style={styles.dashboardTitle}>Categories</AppText>
        </View>
        <View style={styles.dashboardCat}>
          <TouchableOpacity onPress={() => navigation.push("Clothes")}>
            <Icon
              name="tshirt"
              size={60}
              backgroundColor="#E0AA3E"
              iconColor="black"
            />

            <Text style={{ fontSize: 15, paddingTop: 5, marginBottom: 10 }}>
              Clothes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("Foods")}>
            <Icon
              name="utensils"
              size={60}
              backgroundColor="#E0AA3E"
              iconColor="black"
            />

            <Text style={{ fontSize: 15, paddingTop: 5, marginBottom: 10 }}>
              {" "}
              Foods
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("Transport")}>
            <Icon
              name="subway"
              size={60}
              backgroundColor="#E0AA3E"
              iconColor="black"
            />

            <Text style={{ fontSize: 15, paddingTop: 5, marginBottom: 10 }}>
              Transport
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("Studies")}>
            <Icon
              name="university"
              size={60}
              backgroundColor="#E0AA3E"
              iconColor="black"
            />

            <Text style={{ fontSize: 15, paddingTop: 5, marginBottom: 10 }}>
              {" "}
              Studies
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.push("MyInvoices")}>
            <Icon
              name="house-user"
              size={60}
              backgroundColor="#E0AA3E"
              iconColor="black"
            />

            <Text style={{ fontSize: 15, paddingTop: 5, marginBottom: 10 }}>
              {" "}
              Invoice
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.push("Taxes")}>
            <Icon
              name="cash-register"
              size={60}
              backgroundColor="#E0AA3E"
              iconColor="black"
            />

            <Text style={{ fontSize: 15, paddingTop: 5 }}> Taxes</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.push("Hobbies")}>
            <Icon
              styles={styles.icon}
              name="laugh-wink"
              size={60}
              backgroundColor="#E0AA3E"
              iconColor="black"
            />

            <Text style={{ fontSize: 15, paddingTop: 5 }}>Hobbies</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.push("Money")}>
            <Icon
              styles={styles.icon}
              name="hand-holding-usd"
              size={60}
              backgroundColor="#E0AA3E"
              iconColor="black"
            />

            <Text style={{ fontSize: 15, paddingTop: 5 }}> Money</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.push("Epargne")}>
            <Icon
              styles={styles.icon}
              name="search-dollar"
              size={60}
              backgroundColor="#E0AA3E"
              iconColor="black"
            />

            <Text style={{ fontSize: 15, paddingTop: 5 }}>Epargne</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.push("Holidays")}>
            <Icon
              styles={styles.icon}
              name="plane-departure"
              size={60}
              backgroundColor="#E0AA3E"
              iconColor="black"
            />

            <Text style={{ fontSize: 15, paddingTop: 5 }}>Holidays</Text>
          </TouchableOpacity>
        </View>

        <View>
          <AppText style={styles.dashboardTitle}>Toolkit</AppText>
        </View>

        <View style={styles.dashboard}>
          <TouchableOpacity onPress={() => navigation.push("Calculator")}>
            <Icon
              name="calculator"
              size={60}
              backgroundColor="#E0AA3E"
              iconColor="black"
            />
            <Text style={{ fontSize: 15, paddingTop: 5 }}>calculator</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("Agenda")}>
            <Icon
              name="calendar-alt"
              size={60}
              backgroundColor="#E0AA3E"
              iconColor="black"
            />
            <Text style={{ fontSize: 15, paddingTop: 5 }}> Agenda</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("Reminder")}>
            <Icon
              name="bell"
              size={60}
              backgroundColor="#E0AA3E"
              iconColor="black"
            />
            <Text style={{ fontSize: 15, paddingTop: 5 }}>Reminder</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("Download")}>
            <Icon
              name="download"
              size={60}
              backgroundColor="#E0AA3E"
              iconColor="black"
            />
            <Text style={{ fontSize: 15, paddingTop: 5 }}>Download</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("Accounts")}>
            <Icon
              name="user-cog"
              size={60}
              backgroundColor="#E0AA3E"
              iconColor="black"
            />
            <Text style={{ fontSize: 15, paddingTop: 5 }}>Settings</Text>
          </TouchableOpacity>
        </View>
      </Screen2>
    );
  }

const styles = StyleSheet.create({
  parentContainer: {
    flexDirection: "column",
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 5,
    shadowColor: "black",
    shadowOpacity: 0.05,
    shadowOffset: {
      width: 15,
      height: 15,
    },
    elevation: 8,
  },
  balanceContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    width: "100%",
  },
  parentIncomeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  containerRender: {
    height: 100,
    marginHorizontal: 10,
    width: 50,
  },
  LGStyle: {
    height: 60,
    width: 60,
    flexDirection: "row",
    borderRadius: 0 / 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    shadowColor: "#b3aba2",
    elevation: 5,
    backgroundColor: "black",
  },
  dashboard: {
    flexWrap: "wrap",
    color: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 5,
    alignItems: "center",
  },

  dashboardCat: {
    flexWrap: "wrap",
    color: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 5,
    alignItems: "center",
  },

  dashboardTitle: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
    justifyContent: "center",
    textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  textCategory: {
    color: "#9E9E9E",
    textAlignVertical: "center",
    alignSelf: "center",
    height: 35,
    fontSize: 12,
    fontSize: 15,
    paddingTop: 5,
    marginBottom: 10,
  },
  icon: {
    justifyContent: "center",
  },
});

export default HomeDashbord;
