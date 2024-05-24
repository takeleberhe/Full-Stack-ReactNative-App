import { Stack } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: true}}>
      <Stack.Screen name="index"   options={{headerTitle:"Home"}}/>
      <Stack.Screen name="profile"  options={{headerTitle:"profile"}} />
      <Stack.Screen name="message"  options={{headerTitle:"message"}}/>
    </Stack>
  );
};

export default _layout;
