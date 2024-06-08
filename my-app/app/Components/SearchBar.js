import React, { useContext } from "react";
import { TextInput, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import AuthContext from "../../Context/AuthContext/AuthContext";

const SearchBar = () => {
  const { searchDispatch } = useContext(AuthContext);
  return (
    <SafeAreaView className="flex-1 rounded-5xl p-5 mb-10 w-full h-9 ">
      <StatusBar style="light" backgroundColor="blue" />
      <TextInput
        className="text-1xl p-2 h-20 w-full rounded-md bg-slate-200 mb-5"
        placeholder="search..."
        clearButtonMode="alaways"
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
