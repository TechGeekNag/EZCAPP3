import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";

import LoginScreen from "./screens/LoginScreen";
import DashBoardScreen from "./screens/DashBoardScreen";
import Notification from "./screens/Notification";
import InvoiceDetailScreen from "./screens/InvoiceDetailsScreen";
import InvoiceListScreen from "./screens/InvoiceListScreen";
import PoListScreen from "./screens/PoListScreen";
import PoDetailScreen from "./screens/PoDetailScreen";
import ForgotPasswordScreen from "./screens/ResetPasswordScreen.js";
import QCFListScreen from "./screens/QCFListScreen";
import QCFDetailsScreen from "./screens/QCFDetailsScreen";

import { Colors } from "./constants/styles";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import IconButton from "./components/ui/IconButton";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function POStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PoList" options={{ headerShown: false }}>
        {(props) => <PoListScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen name="Details" component={PoDetailScreen}></Stack.Screen>
    </Stack.Navigator>
  );
}
function QCFStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="QCFList" options={{ headerShown: false }}>
        {(props) => <QCFListScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="QCFDetails"
        component={QCFDetailsScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

function INVStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Invoice" options={{ headerShown: false }}>
        {(props) => <InvoiceListScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="Details"
        component={InvoiceDetailScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

const CustomDrawer = (props) => {
  return (
    <DrawerContentScrollView>
      <View>
        <View>
          <Image
            source={require("./assets/HBL_trans.png")}
            style={styles.drawerHeaderImg}
          />
        </View>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: true, //true will show component on the screen top
        headerStyle: { backgroundColor: Colors.loginButton },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  if (authCtx.userType == 3) {
    return (
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          headerStyle: { backgroundColor: Colors.hbl },
          headerTintColor: "white",
          contentStyle: { backgroundColor: Colors.primary100 },
        }}
        initialRouteName="POStack"
      >
        <Drawer.Screen
          name="DashBoard"
          component={DashBoardScreen}
          options={{
            drawerLabel: "DashBoard",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={18} />
            ),
            headerRight: ({ tintColor }) => (
              <IconButton
                icon="exit"
                color={tintColor}
                size={24}
                onPress={authCtx.logout}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="Purchase Order"
          component={POStack}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="document" color={color} size={18} />
            ),
            headerRight: ({ tintColor }) => (
              <IconButton
                icon="exit"
                color={tintColor}
                size={24}
                onPress={authCtx.logout}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="QCF"
          component={QCFStack}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="document" color={color} size={18} />
            ),
            headerRight: ({ tintColor }) => (
              <IconButton
                icon="exit"
                color={tintColor}
                size={24}
                onPress={authCtx.logout}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Invoices "
          component={INVStack}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="document" color={color} size={18} />
            ),
            headerRight: ({ tintColor }) => (
              <IconButton
                icon="exit"
                color={tintColor}
                size={24}
                onPress={authCtx.logout}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Notification"
          component={Notification}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="document" color={color} size={18} />
            ),
            headerRight: ({ tintColor }) => (
              <IconButton
                icon="exit"
                color={tintColor}
                size={24}
                onPress={authCtx.logout}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    );
  } else {
    return (
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          headerStyle: { backgroundColor: Colors.hbl },
          headerTintColor: "white",
          contentStyle: { backgroundColor: Colors.primary100 },
        }}
        initialRouteName="POStack"
      >
        <Drawer.Screen
          name="DashBoard"
          component={DashBoardScreen}
          options={{
            drawerLabel: "DashBoard For Internal Users",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={18} />
            ),
            headerRight: ({ tintColor }) => (
              <IconButton
                icon="exit"
                color={tintColor}
                size={24}
                onPress={authCtx.logout}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="Purchase Order"
          component={POStack}
          options={{
            drawerLabel: "Purchase Order",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="document" color={color} size={18} />
            ),
            headerRight: ({ tintColor }) => (
              <IconButton
                icon="exit"
                color={tintColor}
                size={24}
                onPress={authCtx.logout}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="QCF"
          component={QCFStack}
          options={{
            drawerLabel: "QCF",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="document" color={color} size={18} />
            ),
            headerRight: ({ tintColor }) => (
              <IconButton
                icon="exit"
                color={tintColor}
                size={24}
                onPress={authCtx.logout}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    );
  }
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <AppLoading />;
  }

  return <Navigation />;
}

const styles = StyleSheet.create({
  drawerHeaderImg: {
    width: 250,
    height: 100,
    margin: 10,
  },
});

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
