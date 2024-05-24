import React, { useContext } from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import ProductList from "../../../Components/ProductList";
import AuthContext from "../../../../Context/AuthContext/AuthContext";
import SearchBar from "../../../Components/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";

const Homepage = () => {
  const {
    state: { product },
    searchstate: { searchQuery },
  } = useContext(AuthContext);

  /* filter products */
  const transformedproduct = () => {
    let filteredProducts = product;
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((prod) => {
        return prod.name.toLowerCase().includes(searchQuery);
      });
    }
    return filteredProducts;
  };

  return (
    <View className="flex-1 items-center">
      {/* custom Search component */}
      <Stack.Screen
        options={{
          header: () => <SearchBar />,
        }}
      ></Stack.Screen>
      {/* product list custom component */}
      <ProductList data={transformedproduct} />
    </View>
  );
};

export default Homepage;
