import React from "react";
import {useRouter } from "expo-router";
import { AuthContextProvider } from "../../Context/AuthContext/AuthContext";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

const CustomDrawerContent = (props) => {
  const router = useRouter();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        icon={(color, size) => (
          <Ionicons name="home" size={size} color={color} />
        )}
        label={"Home"}
        onPress={() => router.push("/(tabs)/home/")}
      />
      {/* drawer apage2 */}
      <DrawerItem
        icon={(color, size) => (
          <Ionicons name="person" size={size} color={color} />
        )}
        label={"inbox"}
        onPress={() => router.push("/inbox")}
      />
      {/* Drawer page3 */}
      <DrawerItem
        icon={(color, size) => (
          <Ionicons name="home" size={size} color={color} />
        )}
        label={"signout"}
        onPress={() => router.push("/signout")}
      />
      {/* camera */}
      <DrawerItem
        icon={(color, size) => (
          <Ionicons name="camera-sharp" size={size} color={color} />
        )}
        label={"Camera"}
        onPress={() => router.push("/Camera/")}
      />
      {/* Date time picker */}

      <DrawerItem
        icon={(color, size) => (
          <Ionicons name="camera-sharp" size={size} color={color} />
        )}
        label={"DatePicker"}
        onPress={() => router.push("/DatePicker/")}
      />
      {/* Google Map integration */}
      <DrawerItem
        icon={(color, size) => (
          <Ionicons name="camera-sharp" size={size} color={color} />
        )}
        label={"Map"}
        onPress={() => router.push("/Map/")}
      />
    </DrawerContentScrollView>
  );
};
const Rootlayout = () => {
  return (
    <AuthContextProvider>
      <Drawer
        screenOptions={{ headerShown: false }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      ></Drawer>
    </AuthContextProvider>
  );
};

export default Rootlayout;
