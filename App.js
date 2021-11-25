import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

// State Management
import { Provider } from "react-redux";
import { store } from "./Redux/store";

// Screens
import HomeScreen from "./Screens/Welcome";
import SignupScreen from "./Screens/Signup";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <PaperProvider>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  headerShown: true,
                  title: "Welcome",
                  headerTitleAlign: "center",
                  headerStyle: {
                    backgroundColor: "orangered",
                  },
                }}
              />

              <Stack.Screen
                name="SignUp"
                component={SignupScreen}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </PaperProvider>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
