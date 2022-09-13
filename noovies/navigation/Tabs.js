import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Search from "../screens/Search";
import Tv from "../screens/Tv";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();
const Tabs = () => {
  const isDark = useColorScheme() === "dark";
  console.log(colorScheme);
  return (
    <Tab.Navigator
      initialRouteName="Search"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? "black" : "white",
        },
        headerStyle: {
          backgroundColor: isDark ? "black" : "white",
        },
        headerTitleStyle: {
          color: isDark ? "white" : "black",
        },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ focued, color, size }) => {
            return <Ionicons name="film" size={size} color={color} />;
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Tv"
        component={Tv}
        options={{
          tabBarBadge: 6,
          tabBarIcon: ({ focued, color, size }) => {
            return <Ionicons name="tv" size={size} color={color} />;
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focued, color, size }) => {
            return <Ionicons name="search" size={size} color={color} />;
          },
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default Tabs;
