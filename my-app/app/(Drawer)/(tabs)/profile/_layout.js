import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="index"
        options={{ headerTitle: "Home" }}
      ></Stack.Screen>
      <Stack.Screen
        name="login"
        options={{ headerTitle: "Login" }}
      ></Stack.Screen>
      <Stack.Screen
        name="register"
        options={{ headerTitle: "Register" }}
      ></Stack.Screen>
    </Stack>
  );
};

export default _layout;
