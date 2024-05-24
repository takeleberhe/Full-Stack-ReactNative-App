import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerTitle: "GoogleMap" }}
      ></Stack.Screen>
    </Stack>
  );
};

export default _layout;
