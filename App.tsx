import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";

import ManageExpense from "./screens/ManageExpense";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
import { RootNavParamList } from "./type-utilities/type";
import { GlobalStyles } from "./constants/styles";
import IconButton from "./components/UI/IconButton";
import { store } from "./store/store";

const Stack = createNativeStackNavigator<RootNavParamList>();
const BottomTabs = createBottomTabNavigator<RootNavParamList>();

const ExpenseOverview = () => (
  <BottomTabs.Navigator
    screenOptions={({ navigation }) => ({
      headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      headerTintColor: "white",
      tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="add"
          size={24}
          color={tintColor}
          onPress={() => {
            navigation.navigate("ManageExpense");
          }}
        />
      ),
    })}
  >
    <BottomTabs.Screen
      name="RecentExpenses"
      component={RecentExpenses}
      options={{
        title: "Recent Expenses",
        tabBarLabel: "Recent",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="hourglass" color={color} size={size} />
        ),
      }}
    />
    <BottomTabs.Screen
      name="AllExpenses"
      component={AllExpenses}
      options={{
        title: "All Expenses",
        tabBarLabel: "All Expenses",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="calendar" color={color} size={size} />
        ),
      }}
    />
  </BottomTabs.Navigator>
);

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name="ExpenseOverview"
              component={ExpenseOverview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              options={{
                presentation: "modal",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}
