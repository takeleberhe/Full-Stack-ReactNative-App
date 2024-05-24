import React from "react";
import { Text, SafeAreaView, Button } from "react-native";
import { Link } from "expo-router";

const profile = () => {
  return (
    <SafeAreaView>
      <Text>Welcomeprofile</Text>
      <Link href={"(tabs)/home/message"} asChild>
        <Button title="Go to message" />
      </Link>
      <Link href={"(tabs)/home"} asChild>
        <Button title="Go to Home " />
      </Link>
    </SafeAreaView>
  );
};

export default profile;
