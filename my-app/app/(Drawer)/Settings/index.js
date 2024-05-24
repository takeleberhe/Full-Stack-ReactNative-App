import React from "react";
import { View, Text, Button } from "react-native";
import { Link } from "expo-router";

const settings = () => {
  return (
    <View>
      <Text>Settings!</Text>
      <Link href={"/(tabs)/home/"} asChild>
        <Button title="GoBack" />
      </Link>
    </View>
  );
};

export default settings;
