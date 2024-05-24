import React, { useContext } from "react";
import { TextInput, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import AuthContext from "../../Context/AuthContext/AuthContext";

const SearchBar = () => {
  const { searchDispatch } = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="blue" />
      <TextInput
        placeholder="search..."
        clearButtonMode="alaways"
        style={styles.inputText}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(text) => {
          searchDispatch({
            type: "FILTER_PRODUCT",
            payload: text,
          });
        }}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    boarderColor: "black",
    backgroundColor: "gray",
    boarderWidth: 1,
    borderRadius: 5,
    height: 40,
    width: "100%",
    marginBottom: 50,
  },
});
export default SearchBar;
