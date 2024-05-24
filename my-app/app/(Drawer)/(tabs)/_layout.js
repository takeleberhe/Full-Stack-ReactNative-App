import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { DrawerToggleButton } from "@react-navigation/drawer";

const Tabslayout = () => {
  return (
    <Tabs screenOptions={{ headerLeft: () => <DrawerToggleButton /> }}>
      <Tabs.Screen
        name="home"
        classname="flex-1 justify-center items-center bg-red-600"
        options={{
          tabBarlabel: "Home",
          tabBarIcon: () => <Ionicons name="home" size={24} color="blue" />,
        }}
      />
      {/* profile  */}
      <Tabs.Screen
        name="profile"
        classname="flex-1 justify-center items-center bg-red-600"
        options={{
          tabBarlabel: "Profile",
          tabBarIcon: () => <Ionicons name="person" size={24} color="blue" />,
        }}
      />
      {/* notifications tab */}
      <Tabs.Screen
        name="notifications"
        classname="flex-1 justify-center items-center bg-red-600"
        options={{
          tabBarlabel: "Notifications",
          tabBarIcon: () => (
            <Ionicons name="notifications" size={24} color="black" />
          ),
        }}
      />
      {/* cart page */}
      <Tabs.Screen
        name="cart"
        options={{
          tabBarlabel: "cart",
          tabBarIcon: () => <Ionicons name="cart" size={24} color="blue" />,
        }}
      />
      {/* bottom tab3 */}
      <Tabs.Screen
        name="productDetail"
        options={{
          tabBarlabel: "inbox",
          tabBarIcon: () => (
            <MaterialIcons name="message" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
};

export default Tabslayout;
