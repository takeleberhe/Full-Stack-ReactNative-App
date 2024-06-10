import React, { useContext } from "react";
import { TextInput, StatusBar, SafeAreaView } from "react-native";
import AuthContext from "../../Context/AuthContext/AuthContext";

const SearchBar = () => {
  const { searchDispatch } = useContext(AuthContext);
  return (
    <SafeAreaView className="justify-center items-center rounded-s-md
     pt-5 min-w-[400px] w-full border-lime-50 mb-6">
      <StatusBar style="light" backgroundColor="blue" />
      <TextInput
        className="bg-transparent w-[400px] font-serif text-2xl p-4
         bg-slate-200 rounded-md outline-none
           ml-1 text-white bg-gray-200
         "
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
