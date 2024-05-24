import { Link, useRouter } from "expo-router";
import React from "react";
import { View, Text, Button } from "react-native";

const message = () => {
  const router = useRouter();
  return (
    <View>
      <Text>Hello Ladies and Gentil Men welcome to message page</Text>
      <Link href={"/(tabs)/home/profile"}>Go to profile</Link>
      <Link href={"/(tabs)/home"} asChild>
        <Button title="Go to Home page!" />
      </Link>
    </View>
  );
};

export default message;
