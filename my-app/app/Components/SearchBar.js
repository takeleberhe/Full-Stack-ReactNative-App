import React, { useContext } from "react";
import { TextInput, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import AuthContext from "../../Context/AuthContext/AuthContext";

const SearchBar = () => {
  const { searchDispatch } = useContext(AuthContext);
  return (
    <SafeAreaView className="flex-1 rounded-5xl p-5 w-full h-9 ">
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
export default SearchBar;
