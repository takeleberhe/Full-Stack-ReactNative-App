import React from "react";
import { View, Text, Button } from "react-native";
import { Link } from "expo-router";

const index = () => {
  return (
    <View>
      <Link href={"/profile/login"} asChild>
        <Button title="go to login" />
      </Link>
    </View>
  );
};

export default index;
