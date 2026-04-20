import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import CameraScreen from "../screens/CameraScreen";
import EditorScreen from "../screens/EditorScreen";
import GuideScreen from "../screens/GuideScreen";
import HistoryScreen from "../screens/HistoryScreen";
import LoginScreen from "../screens/LoginScreen";
import RegulationsScreen from "../screens/RegulationsScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
    return ( <
        Tab.Navigator screenOptions = {
            ({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === "Scanner") iconName = "camera";
                    else if (route.name === "Historique") iconName = "time";
                    else if (route.name === "Guide") iconName = "book";
                    else if (route.name === "Règlement") iconName = "document-text";
                    return <Ionicons name = { iconName }
                    size = { size }
                    color = { color }
                    />;
                },
                tabBarActiveTintColor: "#FF6600",
                tabBarInactiveTintColor: "gray",
                headerStyle: { backgroundColor: "#FF6600" },
                headerTintColor: "#fff",
            })
        } >
        <
        Tab.Screen name = "Scanner"
        component = { CameraScreen }
        />{" "} <
        Tab.Screen name = "Historique"
        component = { HistoryScreen }
        />{" "} <
        Tab.Screen name = "Guide"
        component = { GuideScreen }
        />{" "} <
        Tab.Screen name = "Règlement"
        component = { RegulationsScreen }
        />{" "} < /
        Tab.Navigator >
    );
}

export default function AppNavigator() {
    return ( <
        NavigationContainer >
        <
        Stack.Navigator screenOptions = {
            { headerShown: false }
        } >
        <
        Stack.Screen name = "Login"
        component = { LoginScreen }
        />{" "} <
        Stack.Screen name = "Main"
        component = { MainTabs }
        />{" "} <
        Stack.Screen name = "Editor"
        component = { EditorScreen }
        options = {
            {
                headerShown: true,
                title: "Éditeur DXF",
                headerT
                intColor: "#FF6600",
            }
        }
        />{" "} < /
        Stack.Navigator > { " " } <
        /NavigationContainer>
    );
}