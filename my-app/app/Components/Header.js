import React from "react";
import { View, SafeAreaView, StyleSheet, Platform } from "react-native";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View className="pt-55 items-center justify-center">
        <SearchBar />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? 45 : 0,
  },
  text: {
    color: "green",
    textAlign: "center",
  },
});
export default Header;
